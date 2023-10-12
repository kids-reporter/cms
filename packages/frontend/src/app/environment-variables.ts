export const cmsOrigin =
  process.env.NEXT_PUBLIC_CMS_ORIGIN || 'https://dev-kids-cms.twreporter.org'
export const gqlEndpoint =
  process.env.NEXT_PUBLIC_GQL_ENDPOINT ||
  'https://dev-kids-cms.twreporter.org/api/graphql'

export default {
  cmsOrigin,
  gqlEndpoint,
}
