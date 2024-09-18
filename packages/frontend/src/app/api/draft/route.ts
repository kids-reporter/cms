import { promises as fs } from 'fs'
import { draftMode, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ContentType, PREVIEW_SECRET_PATH } from '@/app/constants'
import { isProduction } from '@/environment-variables'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')
  const requestSecret = searchParams.get('secret')
  const isValidType = type === ContentType.ARTICLE || type === ContentType.TOPIC

  let secretValue
  try {
    secretValue = await fs.readFile(PREVIEW_SECRET_PATH, {
      encoding: 'utf8',
    })
  } catch (err) {
    console.error('Failed to read secret!', err)
  }

  const isValidSecret =
    requestSecret && secretValue && requestSecret === secretValue
  if (!isValidSecret || !isValidType || !slug) {
    console.log('Get preview failed!', type, slug)
    redirect('/not-found')
  }

  draftMode().enable()
  const path = `/${type}/${slug}`

  if (isProduction) {
    console.log('Redirect for preview to', path)
    redirect(path)
  } else {
    try {
      // Note: createProxyMiddleware will remove all cookies when the request is cross origin & different sub domain
      // during redirect, so in non-prod mode we need workaround to bypass draft mode cookie as below.
      // ref: https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
      const draftCookieName = '__prerender_bypass'
      const draftCookie = cookies().get(draftCookieName)?.value
      const page = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}${path}`, {
        headers: {
          Cookie: `${draftCookieName}=${draftCookie};`,
        },
      })
      return page
    } catch (err) {
      console.log(err)
    }
    redirect('/not-found')
  }
}
