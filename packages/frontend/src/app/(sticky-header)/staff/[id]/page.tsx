import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import {
  API_URL,
  CMS_URL,
  POST_PER_PAGE,
  DEFAULT_AVATAR,
} from '@/app/constants'
import './page.scss'

// TODO: remove mockup
import { postMockupsMore } from '@/app/mockup'

const authorGQL = `
  query($authorWhere2: AuthorWhereUniqueInput!, $take: Int, $skip: Int!, $orderBy: [PostOrderByInput!]!) {
    author(where: $authorWhere2) {
      bio
      name
      email
      avatar {
        imageFile {
          url
        }
      }
      posts(orderBy: $orderBy, take: $take, skip: $skip) {
        title
        slug
        ogDescription
        heroImage {
          resized {
            medium
          }
          imageFile {
            url
          }
        }
        subSubcategories {
          name
          subcategory {
            name
          }
        }
        publishedDate
      }
      postsCount
    }
  }
`

export default async function Staff({ params }: { params: { id: string } }) {
  const currentPage = 1
  let response
  try {
    response = params?.id
      ? await axios.post(API_URL, {
          query: authorGQL,
          variables: {
            authorWhere2: {
              id: params.id,
            },
            orderBy: [
              {
                publishedDate: 'desc',
              },
            ],
            take: POST_PER_PAGE,
            skip: (currentPage - 1) * POST_PER_PAGE,
          },
        })
      : undefined
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }

  const author = response?.data?.data?.author
  if (!author) {
    notFound()
  }

  const posts = postMockupsMore // author.posts
  const avatarURL = author.avatar?.imageFile?.url
    ? `${CMS_URL}${author.avatar.imageFile.url}`
    : DEFAULT_AVATAR

  return (
    <main className="container">
      <div className="info">
        <div className="avatar">
          <img src={avatarURL} alt={author.name} />
        </div>
        <h1>{author.name}</h1>
        {author.email && <span>{author.email}</span>}
        <p className="bio">{author.bio}</p>
      </div>
      {posts?.length > 0 && (
        <div className="post-list">
          {posts.map((post, index) => {
            return <PostCard key={`author-post-card-${index}`} post={post} />
          })}
        </div>
      )}
      <Pagination currentPage={1} totalPages={10} routingPrefix={``} />
    </main>
  )
}
