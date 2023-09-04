import { ShortenParagraph } from '@/app/utils'
import { CMS_URL, DEFAULT_AVATAR, AuthorRole, Theme } from '@/app/constants'
import './author-card.scss'

const getTheme = (group: AuthorRole) => {
  switch (group) {
    case AuthorRole.EDITORS:
    case AuthorRole.AUDITORS:
      return Theme.RED
    case AuthorRole.WRITERS:
    case AuthorRole.REVIEWERS:
      return Theme.BLUE
    case AuthorRole.DESIGNERS:
    case AuthorRole.PHOTOGRAPHERS:
    case AuthorRole.CONSULTANTS:
    default:
      return Theme.YELLOW
  }
}

export type Author = {
  id: string
  name: string
  avatar: string
  role: AuthorRole
  bio: string
}

type AuthorCardProp = {
  authors: Author[]
}

const descLengthLimit = 85

export const AuthorCard = (props: AuthorCardProp) => {
  const authors = props?.authors

  return (
    authors?.length > 0 && (
      <div className="author-section">
        <h3 className="author-section__title">誰幫我們完成這篇文章</h3>
        <div className="card-container">
          {authors.map((author, index) => {
            const avatarURL = author?.avatar
              ? `${CMS_URL}${author.avatar}`
              : DEFAULT_AVATAR
            const theme = getTheme(author?.role)

            return (
              author && (
                <div className="card" key={`author-card-${index}`}>
                  <div className="photo-mask">
                    <img src={avatarURL} alt={author.name} />
                  </div>
                  <span className="name">{author.name}</span>
                  <div className={`group theme-${theme}`}>
                    {author.role ?? '其他'}
                  </div>
                  <span className="desc">
                    {ShortenParagraph(author.bio, descLengthLimit) ?? ''}
                  </span>
                  <div className="more">
                    <a
                      href={`/staff/${author.id}`}
                      className={`theme-${theme}`}
                    >
                      <span>
                        了解更多 <i className="icon-rpjr-icon-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
              )
            )
          })}
        </div>
        <button
          className="author-section__m-btn rpjr-btn"
          //onclick="document.querySelector('.author-section').classList.add('author-section--show')"
        >
          展開看所有作者
        </button>
      </div>
    )
  )
}

export default AuthorCard
