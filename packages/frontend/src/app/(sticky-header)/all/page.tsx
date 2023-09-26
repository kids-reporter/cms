import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import { API_URL } from '@/app/constants'
import './page.scss'

// TODO: remove mockup
import { postMockupsMore } from '@/app/mockup'

const latestPostsGQL = `
query($orderBy: [PostOrderByInput!]!) {
  posts(orderBy: $orderBy) {
    title
    slug
    heroImage {
      resized {
        medium
      }
      imageFile {
        url
      }
    }
    publishedDate
  }
}
`

export default async function LatestPosts() {
  let postsRes
  try {
    postsRes = await axios.post(API_URL, {
      query: latestPostsGQL,
      variables: {
        orderBy: {
          publishedDate: 'desc',
        },
      },
    })
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }

  const posts = postsRes?.data?.data?.posts
  if (!posts) {
    notFound()
  }

  return (
    <main className="container">
      <div className="content">
        <img src={'/images/new_article.svg'} />
        <div className="post-list">
          {postMockupsMore.map((post, index) => {
            return <PostCard key={`author-post-card-${index}`} post={post} />
          })}
        </div>
        <Pagination pageNum={10} />
      </div>
    </main>
  )
}
