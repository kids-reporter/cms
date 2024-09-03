import { promises as fs } from 'fs'
import { draftMode, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ContentType, PREVIEW_SECRET_PATH } from '@/app/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')
  const previewToken = cookies()?.get('previewToken')?.value
  const isValidType = type === ContentType.ARTICLE || type === ContentType.TOPIC
  const secretValue = await fs.readFile(PREVIEW_SECRET_PATH, {
    encoding: 'utf8',
  })

  if (previewToken !== secretValue || !isValidType || !slug) {
    redirect('/not-found')
  }

  draftMode().enable()
  const path = `/${type}/${slug}`
  redirect(path)
}
