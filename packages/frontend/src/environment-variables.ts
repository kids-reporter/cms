export const gqlEndpoint =
  process.env.NEXT_PUBLIC_GQL_ENDPOINT || 'http://localhost:3001/api/graphql'
export const isPreviewMode = process.env.NEXT_PUBLIC_IS_PREVIEW_MODE === 'true'

export default {
  gqlEndpoint,
  isPreviewMode,
}
