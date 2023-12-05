export const config = {
  port: process.env.PORT || 8080,
  targetFolder: process.env.TARGET_FOLDER || 'resized',
  targetSizes: process.env.TARGET_SIZES
    ? process.env.TARGET_SIZES.split(',').map(Number) // e.g. '2000,1200,800,400' => [2000, 1200, 800, 400]
    : [2000, 1200, 800, 400],
  slackLogHook: process.env.SLACK_LOG_HOOK,
  gcs: {
    projectId: process.env.PROJECT_ID || '',
    keyFilename: process.env.KEY_FILENAME || '',
  },
}
