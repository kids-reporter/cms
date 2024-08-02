import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { PREVIEW_SECRET, ContentType } from '@/app/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')
  const isValidType = type === ContentType.ARTICLE || type === ContentType.TOPIC

  if (secret !== PREVIEW_SECRET || !isValidType || !slug) {
    redirect('/not-found')
  }

  draftMode().enable()
  const path = `/${type}/${slug}`
  redirect(path)
}
