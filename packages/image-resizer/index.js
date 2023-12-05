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
  try {
    const event = req.body

    // Extract bucket and file name from protoPayload.resourceName
    const resourceName = event?.protoPayload?.resourceName
    if (!resourceName || typeof resourceName !== 'string') {
      const msg = `Invalid resourceName: ${resourceName}`
      console.warn(msg)
      res.status(400).send(msg)
      return
    }
    const bucket = resourceName.split('/')[3]
    const name = resourceName.split('/').slice(5).join('/')

    logWithSlack(`Processing file ${name} in bucket ${bucket}`)

    const file = storage.bucket(bucket).file(name)

    // Check if the file exists in GCS
    const [exists] = await file.exists()
    if (!exists) {
      const msg = `File ${name} does not exist in bucket ${bucket}`
      console.warn(msg)
      res.status(404).send(msg)
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
      const msg = `Unsupported file: ${name} (${contentType})`
      console.warn(msg)
      res.status(400).send(msg)
      return
    }

    const toWebp = ['image/jpeg', 'image/png', 'image/gif'].includes(
      contentType
    )
    const animated = ['image/gif', 'image/webp'].includes(contentType)

    const tempFilePath = join(tmpdir(), 'tempImage')
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

    const msg = `Resized ${name} to ${sizes.join(', ')} ${
      toWebp ? '(webp)' : ''
    }`
    console.log(msg)
    res.status(200).send(msg)
  } catch (err) {
    errorHandling(err)
    res.status(500).send('Internal Server Error')
  }
})

const port = config.port
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
