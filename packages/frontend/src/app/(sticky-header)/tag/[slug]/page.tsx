import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import { API_URL } from '@/app/constants'
import './page.scss'

// TODO: remove mockup
import { postMockupsMore } from '@/app/mockup'

const tagQueryGQL = `
query($where: TagWhereUniqueInput!) {
  tag(where: $where) {
    posts {
      slug
      title
      ogImage {
        resized {
          small
        }
      }
      ogDescription
      subSubcategories {
        name
      }
    }
    name
  }
}
`

export default async function Tag({ params }: { params: { slug: string } }) {
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

  const tag = response?.data?.data?.tag
  if (!tag) {
    notFound()
  }

  const tagName = tag.name
  const posts = postMockupsMore // tag.posts

  return (
    <main>
      <div className="info">
        <h1>#{tagName}</h1>
      </div>
      {posts?.length > 0 && (
        <div className="post-list">
          {posts.map((post, index) => {
            return <PostCard key={`author-post-card-${index}`} post={post} />
          })}
        </div>
      )}
      <Pagination currentPage={1} totalPages={10} />
    </main>
  )
}
