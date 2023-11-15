export const storageOrigin =
  process.env.NEXT_PUBLIC_STORAGE_ORIGIN || 'http://localhost:3001'
export const gqlEndpoint =
  process.env.NEXT_PUBLIC_GQL_ENDPOINT || 'http://localhost:3001/api/graphql'
export const isPreviewMode = process.env.NEXT_PUBLIC_IS_PREVIEW_MODE === 'true'

export default {
  storageOrigin,
  gqlEndpoint,
  isPreviewMode,
}
