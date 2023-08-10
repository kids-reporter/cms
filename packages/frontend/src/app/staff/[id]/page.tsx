import axios from 'axios'
import { API_URL, CMS_URL, DEFAULT_AVATAR } from '@/app/constants'

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
        name
        slug
        publishedDate
      }
    }
  }
`

export default async function Staff({ params }: { params: { id: string } }) {
  const staffID = params?.id
  const response = staffID
    ? await axios.post(API_URL, {
        query: authorQueryGQL,
        variables: {
          authorWhere2: {
            id: staffID,
          },
        },
      })
    : undefined

  const author = response?.data?.data?.author
  const avatarURL = author?.avatar?.imageFile?.url
    ? `${CMS_URL}${author.avatar.imageFile.url}`
    : DEFAULT_AVATAR

  return (
    author && (
      <main>
        <div className="staff-banner">
          <div className="staff-banner__image">
            <img src={avatarURL} alt={author.name} />
          </div>
          <h1 className="staff-banner__name">{author.name}</h1>
          <p className="staff-banner__title"></p>
          <p className="staff-banner__description">{author.bio}</p>
        </div>
        TODO: post list
      </main>
    )
  )
}
