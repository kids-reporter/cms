export const cmsOrigin =
  process.env.NEXT_PUBLIC_CMS_ORIGIN || 'http://localhost:3001'
export const gqlEndpoint =
  process.env.NEXT_PUBLIC_GQL_ENDPOINT || 'http://localhost:3001/api/graphql'

export default {
  cmsOrigin,
  gqlEndpoint,
}
