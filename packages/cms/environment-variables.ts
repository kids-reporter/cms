const {
  IS_UI_DISABLED,
  ACCESS_CONTROL_STRATEGY,
  PREVIEW_SERVER_ORIGIN,
  PREVIEW_SERVER_PATH,
  DATABASE_PROVIDER,
  DATABASE_URL,
  SESSION_SECRET,
  SESSION_MAX_AGE,
  GCS_ORIGIN,
  FILES_BASE_URL,
  FILES_STORAGE_PATH,
  IMAGES_BASE_URL,
  IMAGES_STORAGE_PATH,
  MEMORY_CACHE_TTL,
  MEMORY_CACHE_SIZE,
  CORS_ALLOW_ORIGINS,
  NODE_ENV,
  TWO_FACTOR_AUTH_ENABLE,
  TWO_FACTOR_AUTH_SERVICE_NAME,
  TWO_FACTOR_AUTH_SECRET,
  TWO_FACTOR_AUTH_COOKIE_NAME,
  OPEN_AI_KEY,
} = process.env

enum DatabaseProvider {
  Sqlite = 'sqlite',
  Postgres = 'postgresql',
}

const getAllowOrigins = (cors: string) => {
  if (cors === '*') {
    return '*'
  } else if (typeof cors === 'string') {
    return cors.split(',')
  } else {
    return ['https://kids.twreporter.org', 'https://next-kids.twreporter.org']
  }
}

const environmentVariables = {
  isUIDisabled: IS_UI_DISABLED === 'true',
  memoryCacheTtl: Number.isNaN(Number(MEMORY_CACHE_TTL))
    ? 300_000
    : Number(MEMORY_CACHE_TTL),
  memoryCacheSize: Number.isNaN(Number(MEMORY_CACHE_SIZE))
    ? 300
    : Number(MEMORY_CACHE_SIZE),
  accessControlStrategy: ACCESS_CONTROL_STRATEGY || 'cms', // the value could be one of 'cms', 'gql' or 'preview'
  database: {
    provider:
      DATABASE_PROVIDER === 'sqlite'
        ? DatabaseProvider.Sqlite
        : DatabaseProvider.Postgres,
    url: DATABASE_URL || 'postgres://user:password@localhost:5432/kids',
  },
  session: {
    secret:
      SESSION_SECRET ||
      'default_session_secret_and_it_should_be_more_than_32_characters',
    maxAge:
      (typeof SESSION_MAX_AGE === 'string' && parseInt(SESSION_MAX_AGE)) ||
      60 * 60 * 24 * 1, // 1 days
  },
  gcs: {
    origin: GCS_ORIGIN || 'http://localhost:3000',
  },
  files: {
    baseUrl: FILES_BASE_URL || '/files',
    storagePath: FILES_STORAGE_PATH || 'public/files',
  },
  images: {
    baseUrl: IMAGES_BASE_URL || '/images',
    storagePath: IMAGES_STORAGE_PATH || 'public/images',
  },
  cors: {
    allowOrigins: getAllowOrigins(CORS_ALLOW_ORIGINS || ''),
  },
  previewServer: {
    origin: PREVIEW_SERVER_ORIGIN || 'http://localhost:3001',
    path: PREVIEW_SERVER_PATH || '/preview-server',
  },
  twoFactorAuth: {
    enable: TWO_FACTOR_AUTH_ENABLE === 'true', // feature toggle
    secret:
      TWO_FACTOR_AUTH_SECRET || // secret for 2FA JWT
      'default_2fa_secret_and_it_should_be_more_than_32_characters',
    cookieName: TWO_FACTOR_AUTH_COOKIE_NAME || 'keystonejs-2fa',
    serviceName: TWO_FACTOR_AUTH_SERVICE_NAME || 'KidsReporter Keystone', // the service name show in 2FA app
  },
  nodeEnv: NODE_ENV || 'development', // value could be 'development', 'production' or 'test'
  openAIKey: OPEN_AI_KEY || '',
}

export default environmentVariables
