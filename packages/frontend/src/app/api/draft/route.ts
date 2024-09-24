import { promises as fs } from 'fs'
import { draftMode, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ContentType, PREVIEW_SECRET_PATH } from '@/app/constants'

const notFoundPath = '/not-found'

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
    console.log(`Invalid parameter, get preview /${type}/${slug} failed!`)
    redirect(notFoundPath)
  }

  draftMode().enable()
  try {
    const url = `${process.env.ORIGIN}/${type}/${slug}`

    // Note: createProxyMiddleware will remove all cookies when the request is cross origin & different sub domain
    // during redirect, so fetch is a workaround to forward draft mode cookie instead of using redirect().
    // ref: https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
    const draftCookieName = '__prerender_bypass'
    const draftCookieValue = cookies().get(draftCookieName)?.value
    const response = await fetch(url, {
      headers: {
        cookie: `${draftCookieName}=${draftCookieValue}`,
      },
    })
    if (response.ok) {
      return response
    } else {
      console.error(`Response from ${url} is failed!`)
    }
  } catch (err) {
    console.error('Fetch preview failed!', err)
  }
  redirect(notFoundPath)
}
