import { draftMode } from 'next/headers'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug
  const { isEnabled } = draftMode()
  console.log('Page test-bypass: ', isEnabled)
  return (
    <main className="flex flex-col items-center max-w-screen-2xl">
      {isEnabled ? 'true' : 'false'}
      {slug}
    </main>
  )
}
