import { DEFAULT_AVATAR, AuthorRole, Theme } from '@/app/constants'
import './author-card.scss'

const getTheme = (group: AuthorRole) => {
  switch (group) {
    case AuthorRole.EDITORS:
    case AuthorRole.AUDITORS:
      return Theme.RED
    case AuthorRole.WRITERS:
    case AuthorRole.REVIEWERS:
    case AuthorRole.CONSULTANTS:
      return Theme.BLUE
    case AuthorRole.DESIGNERS:
    case AuthorRole.PHOTOGRAPHERS:
    default:
      return Theme.YELLOW
  }
}

export type Author = {
  slug: string | undefined
  name: string
  avatar: string
  role: AuthorRole
  roleName?: string
  bio: string
}

type AuthorCardProp = {
  title: string
  authors: Author[]
}

export const AuthorCard = (props: AuthorCardProp) => {
  const authors = props?.authors

  return (
    authors?.length > 0 && (
      <div className="author-section">
        <h3 className="title">{props.title}</h3>
        <div className="card-container">
          {authors.map((author, index) => {
            const avatarURL = author.avatar ?? DEFAULT_AVATAR
            const theme = getTheme(author?.role)

            return (
              author && (
                <div className="card" key={`author-card-${index}`}>
                  <div className="photo-mask">
                    <img src={avatarURL} alt={author.name} />
                  </div>
                  <span className="name">{author.name}</span>
                  <div className={`group theme-${theme}`}>
                    {author.roleName ? author.roleName : author.role}
                  </div>
                  <span className="desc">{author.bio}</span>
                  {author.slug && (
                    <div className="more">
                      <a
                        href={`/author/${author.slug}`}
                        className={`theme-${theme}`}
                      >
                        <span>
                          了解更多{' '}
                          <i className="icon-rpjr-icon-arrow-right"></i>
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              )
            )
          })}
        </div>
        {/* TODO: more button <button
          className="author-section__m-btn rpjr-btn"
          //onclick="document.querySelector('.author-section').classList.add('author-section--show')"
        >
          展開看所有作者
        </button>*/}
      </div>
    )
  )
}

export default AuthorCard
