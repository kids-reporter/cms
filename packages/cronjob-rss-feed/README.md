# Cronjob RSS Feed Generator

This Node.js script fetches posts data from a RESTful server, generates an RSS feed based on the fetched data, uploads the RSS file to a Google Cloud Storage (GCS) bucket, and sends a notification to a Slack channel.

## Prerequisites

- Node.js (version 18 or higher)
- Google Cloud Storage account and bucket set up
- Slack webhook URL

## Installation

1. Clone the repository
2. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

## Configuration

Set up `configs.js` with envs, accepted envs:

- API_URL
- BASE_URL
- BUCKET_NAME
- SLACK_WEBHOOK
- RSS_FILE_NAME
- PROJECT_ID
- KEY_FILENAME

## Usage

Run the script using:

```bash
yarn start
```

This will execute the script, fetching posts data, generating an RSS feed, uploading it to GCS, and sending a Slack notification.

## Deployment

1. Build the Docker image:

    ```bash
    docker build --platform linux/amd64 --no-cache --tag gcr.io/kids-reporter/cronjob-rss-feed:v1.0 .
    ```

2. Push the Docker image to Google Container Registry:

    ```bash
    docker push gcr.io/kids-reporter/cronjob-rss-feed:v1.0
    ```

3. Create a Cloud Run job with the image.
4. Add Job Scheduler Trigger.

## RSS Feed Configs

- Update frequency:  `0 17 * * *` (every day at 17:00 UTC)
- Fetch criteria: latest 10 published posts
