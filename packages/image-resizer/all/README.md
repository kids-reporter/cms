# image-resizer-all

This is a Cloud Run Job which will fetch images from a Cloud Storage bucket, and send mock trigger to the image resizer service to resize the images.

## Usage

```bash
node index.js
```

## Environment Variables

LIMIT: The maximum number of images to be resized.  `0` will not run, `-1` will run all images.  Default to `-1`.
BUCKET: The name of the source bucket.  Default to `dev-kids-storage.twreporter.org`.
FOLDER: The folder name of the source images.  Default to `images`.
SERVICE_ENDPOINT: The endpoint URL of the image resizer service.  Default to `https://dev-image-resizer-7q3q3q3q3q-uc.a.run.app`.