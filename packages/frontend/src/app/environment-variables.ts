const { CMS_ORIGIN, GQL_ENDPOINT } = process.env

export const cmsOrigin = CMS_ORIGIN || 'https://dev-kids-cms.twreporter.org'
export const gqlEndpoint =
  GQL_ENDPOINT || 'https://dev-kids-cms.twreporter.org/api/graphql'

export default {
  cmsOrigin,
  gqlEndpoint,
}
