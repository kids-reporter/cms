const {
  GCP_PROJECT_ID,
  CORS_ALLOW_ORIGINS,
  GQL_ORIGIN,
  GQL_HEADLESS_ACCOUNT_EMAIL,
  GQL_HEADLESS_ACCOUNT_PASSWORD,
  GQL_PREVIEW_ACCOUNT_EMAIL,
  GQL_PREVIEW_ACCOUNT_PASSWORD,
  GQL_PREVIEW_SECRET,
} = process.env

/**
 *
 * @param {string} [cors]
 * @returns {'*' | string[]}
 */
const getAllowOrigins = (cors: string) => {
  if (cors === '*') {
    return '*'
  } else if (typeof cors === 'string') {
    return cors.split(',')
  } else {
    return [
      'https://kids.twreporter.org',
      'https://dev-kids.twreporter.org',
      'https://staging-kids.twreporter.org',
    ]
  }
}
const envVar = {
  gcp: {
    projectId: GCP_PROJECT_ID || 'kids-reporter',
  },
  apis: {
    gql: {
      origin: GQL_ORIGIN || 'http://localhost:3000',
      headlessAccount: {
        email: GQL_HEADLESS_ACCOUNT_EMAIL || '',
        password: GQL_HEADLESS_ACCOUNT_PASSWORD || '',
      },
      previewAccount: {
        email: GQL_PREVIEW_ACCOUNT_EMAIL || '',
        password: GQL_PREVIEW_ACCOUNT_PASSWORD || '',
      },
      previewSecret: GQL_PREVIEW_SECRET || '',
    },
  },
  cors: {
    allowOrigins: getAllowOrigins(CORS_ALLOW_ORIGINS || ''),
  },
}

export default envVar
