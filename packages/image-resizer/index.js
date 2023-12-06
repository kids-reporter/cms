import { config } from './configs.js'
import { logWithSlack, errorHandling } from './utils.js'
import { Storage } from '@google-cloud/storage'
import sharp from 'sharp'
import { join, basename, extname } from 'path'
import { tmpdir } from 'os'
import { promises as fs } from 'fs'
import express from 'express'

const storage =
  config.gcs.projectId && config.gcs.keyFilename
    ? new Storage({
        projectId: config.gcs.projectId,
        keyFilename: config.gcs.keyFilename,
      })
    : new Storage()

const app = express()

app.use(express.json())
app.post('/', async (req, res) => {
  const event = req.body
  await resizeImage(event)
  res.status(200).send('ack')
})

const port = config.port
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const resizeImage = async (event) => {
  try {
    // Extract bucket and file name from protoPayload.resourceName
    const resourceName = event?.protoPayload?.resourceName
    if (!resourceName || typeof resourceName !== 'string') {
      console.warn(`Invalid resourceName: ${resourceName}`)
      return
    }
    const bucket = resourceName.split('/')[3]
    const name = resourceName.split('/').slice(5).join('/')

    logWithSlack(
      `Processing file ${name} in bucket ${bucket} (ID: ${event?.insertId}))`
    )

    const file = storage.bucket(bucket).file(name)

    // Check if the file exists in GCS
    const [exists] = await file.exists()
    if (!exists) {
      console.warn(`File ${name} does not exist in bucket ${bucket}`)
      return
    }
    // Skip unsupported file types, sharp only accepts jpeg, png, gif, webp
    const [metadata] = await file.getMetadata()
    const contentType = metadata.contentType || 'undefined'
    if (
      !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
        contentType
      )
    ) {
      console.warn(`Unsupported file: ${name} (${contentType})`)
      return
    }

    const toWebp = ['image/jpeg', 'image/png', 'image/gif'].includes(
      contentType
    )
    const animated = ['image/gif', 'image/webp'].includes(contentType)

    const tempFilePath = join(
      tmpdir(),
      `tempImage-${basename(
        name,
        extname(name)
      )}-${Date.now()}-${generateRandomString()}`
    )
    console.log(`Downloading to temp file: ${tempFilePath}`)
    await file.download({ destination: tempFilePath })

    // Resize the image and upload to the target folder
    const sizes = config.targetSizes
    const uploadPromises = sizes.map((size) => {
      const newFileName = toWebp
        ? `${basename(name, extname(name))}-${size}.webp`
        : `${basename(name, extname(name))}-${size}${extname(name)}`
      const newFilePath = join(tmpdir(), newFileName)

      let sharpPromise

      if (animated) {
        sharpPromise = sharp(tempFilePath, {
          animated: true,
        })
      } else {
        sharpPromise = sharp(tempFilePath)
      }
      if (toWebp) {
        sharpPromise = sharpPromise.toFormat('webp')
      }

      sharpPromise = sharpPromise
        .resize(size)
        .toFile(newFilePath)
        .then(() => {
          return storage.bucket(bucket).upload(newFilePath, {
            destination: `${config.targetFolder}/${newFileName}`,
          })
        })

      return sharpPromise
    })

    await Promise.all(uploadPromises)

    await fs.unlink(tempFilePath)

    console.log(
      `Resized ${name} to ${sizes.join(', ')} ${toWebp ? '(webp)' : ''}`
    )
  } catch (err) {
    errorHandling(err)
  }
}

const generateRandomString = (length = 10) => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters[randomIndex]
  }
  return randomString
}
