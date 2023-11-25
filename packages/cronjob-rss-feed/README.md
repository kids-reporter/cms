# Cronjob RSS Feed Generator

This Node.js script fetches posts data from a RESTful server, generates an RSS feed based on the fetched data, uploads the RSS file to a Google Cloud Storage (GCS) bucket, and sends a notification to a Slack channel.

## Prerequisites

- Node.js (version 18 or higher)
- Google Cloud Storage account and bucket set up
- Slack webhook URL

## Installation

1. Clone the repository or download the `rss.js` file.
2. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

## Configuration

1. Set up Google Cloud Storage:
   - Replace `'your-gcs-bucket-name'` in `rss.js` with your GCS bucket name.
   - Ensure you have necessary permissions to access the bucket.

2. Slack Integration:
   - Replace `'YOUR_SLACK_WEBHOOK_URL'` in `rss.js` with your Slack webhook URL.

## Usage

Run the script using:

```bash
yarn start
```

This will execute the script, fetching posts data, generating an RSS feed, uploading it to GCS, and sending a Slack notification.

## RSS Feed Configs

- Update frequency:  `0 17 * * *` (every day at 17:00)
- Fetch criteria: latest 10 published posts
