import { MetadataRoute } from 'next'
import { KIDS_URL_ORIGIN } from '@/app/constants'
import { isProduction } from '@/environment-variables'

const devConfig = {
  rules: {
    userAgent: '*',
    disallow: '/',
  },
}

const prodConfig = {
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${KIDS_URL_ORIGIN}/sitemap.xml`,
}

export default function robots(): MetadataRoute.Robots {
  return isProduction ? prodConfig : devConfig
}
