import { config } from './configs.js'
import { log } from './utils.js'
import { Storage } from '@google-cloud/storage'
import sharp from 'sharp'
import { join, basename, extname } from 'path'
import { tmpdir } from 'os'
import { promises as fs } from 'fs'

const storage =
  config.gcs.projectId && config.gcs.keyFilename
    ? new Storage({
        projectId: config.gcs.projectId,
        keyFilename: config.gcs.keyFilename,
      })
    : new Storage()

export async function resizeImages(event) {
  // Accepts triggers from desinated bucket folder
  if (!event.name.startsWith(`${config.sourceFolder}/`)) {
    return
  }

  log(`Processing file: ${event.name}`)

  const file = storage.bucket(event.bucket).file(event.name)
  const tempFilePath = join(tmpdir(), 'tempImage')

  // Skip unsupported file types, sharp only accepts jpeg, png, gif, webp
  const [metadata] = await file.getMetadata()
  const contentType = metadata.contentType || 'undefined'
  if (
    !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
      contentType
    )
  ) {
    log(`Skipping unsupported file: ${event.name} (${contentType})`)
    await fs.unlink(tempFilePath)
    return
  }

  await file.download({ destination: tempFilePath })

  // Resize the image and upload to the target folder
  const sizes = config.targetSizes
  const uploadPromises = sizes.map((size) => {
    const newFileName = `${basename(
      event.name,
      extname(event.name)
    )}-${size}${extname(event.name)}`
    const newFilePath = join(tmpdir(), newFileName)

    return sharp(tempFilePath)
      .resize(size)
      .toFile(newFilePath)
      .then(() => {
        return storage.bucket(event.bucket).upload(newFilePath, {
          destination: `${config.targetFolder}/${newFileName}`,
        })
      })
  })

  await Promise.all(uploadPromises)

  await fs.unlink(tempFilePath)
  log(`Resized ${event.name} to ${sizes.join(', ')}`)
}
