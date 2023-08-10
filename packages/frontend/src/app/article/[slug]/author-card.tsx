import { ShortenParagraph } from '@/app/utils'
import { CMS_URL, DEFAULT_AVATAR, AuthorGroup, Theme } from '@/app/constants'
import './author-card.scss'

const AuthorGroupLabel = new Map<AuthorGroup, string>([
  [AuthorGroup.WRITERS, '文字'],
  [AuthorGroup.DESIGNERS, '設計'],
  [AuthorGroup.REVIEWERS, '核稿'],
  [AuthorGroup.EDITORS, '責任編輯'],
  [AuthorGroup.PHOTOGRAPHERS, '攝影'],
  [AuthorGroup.ENGINEERS, '工程'],
])

const getTheme = (group: AuthorGroup) => {
  switch (group) {
    case AuthorGroup.EDITORS:
      return Theme.RED
    case AuthorGroup.WRITERS:
    case AuthorGroup.REVIEWERS:
      return Theme.BLUE
    case AuthorGroup.DESIGNERS:
    case AuthorGroup.PHOTOGRAPHERS:
    case AuthorGroup.ENGINEERS:
    default:
      return Theme.YELLOW
  }
}

type AuthorCardProp = {
  authors: {
    id: string
    name: string
    avatar: string
    group: AuthorGroup
    bio: string
  }[]
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
            const theme = getTheme(author?.group)

            return (
              author && (
                <div className="card" key={`author-card-${index}`}>
                  <div className="photo-mask">
                    <img src={avatarURL} alt={author.name} />
                  </div>
                  <span className="name">{author.name}</span>
                  <div className={`group theme-${theme}`}>
                    {AuthorGroupLabel.get(author.group) ?? '其他'}
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
