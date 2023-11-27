import { MetadataRoute } from 'next'
import { KIDS_URL_ORIGIN } from '@/app/constants'

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
  return process.env.NEXT_PUBLIC_RELEASE_ENV === 'prod' ? prodConfig : devConfig
}
