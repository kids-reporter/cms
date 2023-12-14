import { config } from './configs.js'
import { logWithSlack, errorHandling } from './utils.js'
import { Storage } from '@google-cloud/storage'
import sharp from 'sharp'
import { join, basename, extname } from 'path'
import { tmpdir } from 'os'
import { promises as fs } from 'fs'
import express from 'express'

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
  console.time('Processed time') // Start timer

  try {
    // Extract bucket and file name from protoPayload.resourceName
    const resourceName = event?.protoPayload?.resourceName
    if (!resourceName || typeof resourceName !== 'string') {
      console.warn(`Invalid resourceName: ${resourceName}`)
      console.timeEnd('Processed time') // End timer
      return
    }
    const bucket = resourceName.split('/')[3]
    const name = resourceName.split('/').slice(5).join('/')

    logWithSlack(
      `Processing file ${name} in bucket ${bucket} (ID: ${event?.insertId}))`
    )

    const storage =
      config.gcs.projectId && config.gcs.keyFilename
        ? new Storage({
            projectId: config.gcs.projectId,
            keyFilename: config.gcs.keyFilename,
          })
        : new Storage()

    const file = storage.bucket(bucket).file(name)

    // Check if the file exists in GCS
    const [exists] = await file.exists()
    if (!exists) {
      console.warn(`File ${name} does not exist in bucket ${bucket}`)
      console.timeEnd('Processed time') // End timer
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
      console.timeEnd('Processed time') // End timer
      return
    }

    const toWebp = ['image/jpeg', 'image/png', 'image/gif'].includes(
      contentType
    )
    const animated = ['image/gif', 'image/webp'].includes(contentType)

    // Download the file from GCS to a temp folder
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
    /**
     * @type {number[]}
     */
    let resizedSizes = []
    /**
     * @type {number[]}
     */
    let skippedSizes = []
    let targetSizes = config.targetSizes
    const uploadPromises = targetSizes.map(async (size) => {
      const newFileName = toWebp
        ? `${basename(name, extname(name))}-${size}.webp`
        : `${basename(name, extname(name))}-${size}${extname(name)}`
      const newFilePath = join(tmpdir(), newFileName)

      let sharpInstance

      if (animated) {
        sharpInstance = sharp(tempFilePath, {
          animated: true,
        })
      } else {
        sharpInstance = sharp(tempFilePath)
      }

      if (toWebp) {
        sharpInstance = sharpInstance.toFormat('webp')
      }

      // If the image's width is smaller than the target size, skip the resize
      const metadata = await sharpInstance.metadata()
      if (metadata.width && metadata.width > size) {
        sharpInstance = sharpInstance.resize(size)
        resizedSizes.push(size)
      } else {
        skippedSizes.push(size)
      }

      sharpInstance = sharpInstance.toFile(newFilePath).then(() => {
        return storage.bucket(bucket).upload(newFilePath, {
          destination: `${config.targetFolder}/${newFileName}`,
        })
      })

      return sharpInstance
    })

    await Promise.all(uploadPromises)

    await fs.unlink(tempFilePath)

    let resultMsg = `File ${name}`
    if (toWebp) {
      resultMsg += ` converted to${animated ? ' animated' : ''} webp and`
    }
    if (resizedSizes.length > 0) {
      resultMsg += ` resized to ${resizedSizes.join(', ')}`
    }
    if (skippedSizes.length > 0) {
      resultMsg += ` skipped ${skippedSizes.join(', ')}`
    }
    console.log(resultMsg)
  } catch (err) {
    console.timeEnd('Processed time') // End timer
    errorHandling(err)
  }

  console.timeEnd('Processed time') // End timer
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
