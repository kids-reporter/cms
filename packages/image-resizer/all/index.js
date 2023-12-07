import { Storage } from '@google-cloud/storage'
import fetch from 'node-fetch'

const storage = new Storage()
const limit = process.env.LIMIT || '-1'
const bucketName = process.env.BUCKET || 'dev-kids-storage.twreporter.org'
const folderName = process.env.FOLDER || 'images'
const serviceUrl =
  process.env.SERVICE_ENDPOINT ||
  'https://dev-image-resizer-ehh4zj53ca-de.a.run.app'

async function runJob() {
  let limitCount = parseInt(limit)
  const bucket = storage.bucket(bucketName)
  const [files] = await bucket.getFiles({ prefix: `${folderName}/` })
  const now = Date.now()
  const totalCount = files.length - 1
  let successCount = 0
  let failCount = 0

  for (const file of files) {
    if (limitCount >= 0 && limitCount < 1) {
      break
    }

    if (file.name === `${folderName}/`) {
      continue
    }
    const payload = {
      protoPayload: {
        resourceName: `projects/_/buckets/${bucketName}/objects/${file.name}`,
      },
      insertId: `all-${now}`,
    }

    const response = await fetch(serviceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      failCount++
      console.error(
        `[+${successCount}-${failCount}/${totalCount}] Failed to process ${file.name}: ${response.statusText}`
      )
    } else {
      successCount++
      console.log(
        `[+${successCount}-${failCount}/${totalCount}] Successfully processed ${file.name}`
      )
    }
    limitCount--
  }
}

runJob().catch(console.error)
