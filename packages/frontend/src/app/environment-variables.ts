export const cmsOrigin =
  process.env.NEXT_PUBLIC_CMS_ORIGIN || 'http://localhost:3001'

export const gqlEndpoint =
  process.env.NEXT_PUBLIC_GQL_ENDPOINT || 'http://localhost:3001/api/graphql'

export const apiOrigin = process.env.API_ORIGIN || 'http://localhost:3000'

// @TODO: get account and password from GCP Secret Mananger
export const apiHeadlessAccountEmail =
  process.env.API_HEADLESS_ACCOUNT_EMAIL ||
  'change_environment_variable_to_set_up_account'
export const apiHeadlessAccountPassword =
  process.env.API_HEADLESS_ACCOUNT_PASSWORD ||
  'change_environment_variable_to_set_up_password'

export default {
  apiOrigin,
  apiHeadlessAccountEmail,
  apiHeadlessAccountPassword,
  cmsOrigin,
  gqlEndpoint,
}
