import { config } from './configs.js'
import { log } from './utils.js'
import { Storage } from '@google-cloud/storage'
import sharp from 'sharp'
import { join, basename, extname } from 'path'
import { tmpdir } from 'os'
import { promises as fs } from 'fs'
import express from 'express'
import bodyParser from 'body-parser'

const storage =
  config.gcs.projectId && config.gcs.keyFilename
    ? new Storage({
        projectId: config.gcs.projectId,
        keyFilename: config.gcs.keyFilename,
      })
    : new Storage()

const app = express()

app.use(bodyParser.json())
app.post('/', async (req, res) => {
  const event = req.body

  // Extract bucket and file name from protoPayload.resourceName
  const resourceName = event.protoPayload.resourceName
  const bucket = resourceName.split('/')[3]
  const name = resourceName.split('/').slice(5).join('/')

  log(`Processing file ${name} in bucket ${bucket}`)

  const file = storage.bucket(bucket).file(name)

  // Check if the file exists in GCS
  const [exists] = await file.exists()
  if (!exists) {
    log(`File ${name} does not exist in bucket ${bucket}`)
    res.status(404).send(`File ${name} does not exist`)
    return
  }
  const tempFilePath = join(tmpdir(), 'tempImage')

  // Skip unsupported file types, sharp only accepts jpeg, png, gif, webp
  const [metadata] = await file.getMetadata()
  const contentType = metadata.contentType || 'undefined'
  if (
    !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
      contentType
    )
  ) {
    log(`Skipping unsupported file: ${name} (${contentType})`)
    await fs.unlink(tempFilePath)
    res.status(400).send('Unsupported file type')
    return
  }

  await file.download({ destination: tempFilePath })

  // Resize the image and upload to the target folder
  const sizes = config.targetSizes
  const uploadPromises = sizes.map((size) => {
    const newFileName = `${basename(name, extname(name))}-${size}${extname(
      name
    )}`
    const newFilePath = join(tmpdir(), newFileName)

    return sharp(tempFilePath)
      .resize(size)
      .toFile(newFilePath)
      .then(() => {
        return storage.bucket(bucket).upload(newFilePath, {
          destination: `${config.targetFolder}/${newFileName}`,
        })
      })
  })

  await Promise.all(uploadPromises)

  await fs.unlink(tempFilePath)

  log(`Resized ${name} to ${sizes.join(', ')}`)
  res.status(200).send(`Resized ${name} to ${sizes.join(', ')}`)
})

const port = config.port
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
