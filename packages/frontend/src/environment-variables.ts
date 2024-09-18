export const internalGqlEndpoint =
  process.env.INTERNAL_GQL_ENDPOINT || 'http://localhost:3001/api/graphql'
export const gqlEndpoint =
  process.env.NEXT_PUBLIC_GQL_ENDPOINT || 'http://localhost:3001/api/graphql'
export const isPreviewMode = process.env.NEXT_PUBLIC_IS_PREVIEW_MODE === 'true'
export const isProduction = process.env.NEXT_PUBLIC_RELEASE_ENV === 'prod'

export default {
  internalGqlEndpoint,
  gqlEndpoint,
  isPreviewMode,
  isProduction,
}
