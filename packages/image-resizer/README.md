# image-resizer

## Environment Variables

- `SOURCE_FOLDER`: The folder name of the source images
- `TARGET_FOLDER`: The folder name of the resized images
- `TARGET_SIZES`: The sizes of the resized images, separated by comma
- `SLACK_LOG_HOOK`: The Slack webhook URL for logging
- `PROJECT_ID`: The GCP project ID
- `KEY_FILENAME`: The path to the GCP service account key file

## Deploy

Deploy on GCP Cloud Functions 2nd gen

- Envrionment: 2nd gen
- Region: asia-east1 (Taiwan)
- Cloud Storage Trigger
  - Event: google.cloud.storage.object.v1.finalize
- Runtime Memory: 512MB
- Runtime: Node.js 18
- Entry Point: resizeImage
