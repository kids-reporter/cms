import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { PREVIEW_SECRET } from '@/app/constants'

enum DraftType {
  ARTICLE = 'article',
  TOPIC = 'topic',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')
  const isValidType = type === DraftType.ARTICLE || type === DraftType.TOPIC

  if (secret !== PREVIEW_SECRET || !isValidType || !slug) {
    return new Response('Invalid parameters.', { status: 401 })
  }

  draftMode().enable()

  const path = `/${type}/${slug}`
  redirect(path)
}
