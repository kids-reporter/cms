import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import { API_URL, CMS_URL, DEFAULT_AVATAR } from '@/app/constants'

// TODO: remove mockup
import { postMockupsMore } from '@/app/mockup'

import './page.scss'

const authorQueryGQL = `
  query($authorWhere2: AuthorWhereUniqueInput!) {
    author(where: $authorWhere2) {
      bio
      name
      avatar {
        imageFile {
          url
        }
      }
      posts {
        heroImage {
          resized {
            medium
          }
          imageFile {
            url
          }
        }
        title
        slug
        publishedDate
      }
    }
  }
`

export default async function Staff({ params }: { params: { id: string } }) {
  let response
  try {
    response = params?.id
      ? await axios.post(API_URL, {
          query: authorQueryGQL,
          variables: {
            authorWhere2: {
              id: params.id,
            },
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

  const avatarURL = author?.avatar?.imageFile?.url
    ? `${CMS_URL}${author.avatar.imageFile.url}`
    : DEFAULT_AVATAR

  return (
    author && (
      <main>
        <div className="info">
          <div className="avatar">
            <img src={avatarURL} alt={author.name} />
          </div>
          <h1>{author.name}</h1>
          <p className="bio">{author.bio}</p>
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
