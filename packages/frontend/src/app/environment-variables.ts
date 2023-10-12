const { NEXT_PUBLIC_CMS_ORIGIN, NEXT_PUBLIC_GQL_ENDPOINT } = process.env

export const cmsOrigin =
  NEXT_PUBLIC_CMS_ORIGIN || 'https://dev-kids-cms.twreporter.org'
export const gqlEndpoint =
  NEXT_PUBLIC_GQL_ENDPOINT || 'https://dev-kids-cms.twreporter.org/api/graphql'

export default {
  cmsOrigin,
  gqlEndpoint,
}
