import { draftMode } from 'next/headers'
// import { redirect } from 'next/navigation'

enum DraftType {
  ARTICLE = 'article',
  TOPIC = 'topic',
}

const getArticleBySlug = async (slug: string) => {
  console.log(slug)
}

const getTopicBySlug = async (slug: string) => {
  console.log(slug)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')

  const isValidType = type === DraftType.ARTICLE || type === DraftType.TOPIC

  if (secret !== 'MY_SECRET_TOKEN' || !isValidType || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  let content
  if (type === DraftType.ARTICLE) {
    content = await getArticleBySlug(slug)
  } else if (type === DraftType.TOPIC) {
    content = await getTopicBySlug(slug)
  }

  console.log(content)

  /*
  if (!content) {
    return new Response('Invalid slug', { status: 401 })
  }
  */

  draftMode().enable()

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  // const path = `/${type}/${slug}`
  // redirect(path)
}
