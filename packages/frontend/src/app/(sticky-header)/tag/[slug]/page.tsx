import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import { API_URL } from '@/app/constants'

// TODO: remove mockup
import { postMockupsMore } from '@/app/mockup'

import './page.scss'

const tagQueryGQL = `
  query($where: TagWhereUniqueInput!) {
    tag(where: $where) {
      name
    }
  }
`

export default async function Staff({ params }: { params: { slug: string } }) {
  let response
  try {
    response = params?.slug
      ? await axios.post(API_URL, {
          query: tagQueryGQL,
          variables: {
            where: {
              slug: params.slug,
            },
          },
        })
      : undefined
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }

  const tagName = response?.data?.data?.name
  const posts = response?.data?.data?.posts
  if (!posts) {
    notFound()
  }

  //const tagName = params.slug
  //const posts = postMockupsMore

  return (
    posts && (
      <main>
        <div className="info">
          <h1>#{tagName}</h1>
        </div>
        <div className="post-list">
          {postMockupsMore.map((post, index) => {
            return <PostCard key={`author-post-card-${index}`} post={post} />
          })}
        </div>
      </main>
    )
  )
}
