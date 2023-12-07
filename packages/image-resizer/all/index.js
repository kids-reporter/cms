import { Storage } from '@google-cloud/storage'
import fetch from 'node-fetch'
// @ts-ignore `@twreporter/errors` does not have tyepscript definition file yet
import _errors from '@twreporter/errors'

// @twreporter/errors is a cjs module, therefore, we need to use its default property
const errors = _errors.default

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
      console.warn(
        JSON.stringify({
          severity: 'WARNING',
          message: `[+${successCount}-${failCount}/${totalCount}] Failed to process ${file.name}: ${response.statusText}`,
        })
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

runJob().catch((err) => {
  console.error(
    JSON.stringify({
      severity: 'ERROR',
      message: errors.helpers.printAll(
        err,
        { withStack: true, withPayload: true },
        0,
        0
      ),
    })
  )
})
