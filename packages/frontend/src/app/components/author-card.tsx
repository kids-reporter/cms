import Link from 'next/link'
import { DEFAULT_AVATAR, AuthorRole, Theme } from '@/app/constants'

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
        <h3 className="text-3xl font-bold text-center mt-10 mb-10">
          {props.title}
        </h3>
        <div className="max-w-5xl w-full flex flex-wrap justify-evenly items-stretch gap-10 mx-auto">
          {authors.map((author, index) => {
            const avatarURL = author.avatar ?? DEFAULT_AVATAR
            const theme = getTheme(author?.role)

            return (
              author && (
                <div
                  className="w-80 flex flex-col gap-0 items-center justify-center box-border bg-white pt-10 px-9 border-2 border-gray-200 rounded-3xl"
                  key={`author-card-${index}`}
                >
                  <div className="w-32 h-32 overflow-hidden rounded-full mx-auto">
                    <img
                      className="max-w-full align-middle"
                      src={avatarURL}
                      alt={author.name}
                    />
                  </div>
                  <span
                    style={{ lineHeight: '160%', letterSpacing: '0.08em' }}
                    className="font-bold text-center text-xl text-gray-900 mt-3"
                  >
                    {author.name}
                  </span>
                  <div
                    style={{
                      flexFlow: 'row wrap',
                      columnGap: '12px',
                      lineHeight: '160%',
                      letterSpacing: '0.08em',
                      color: 'var(--theme-color, #27B5F7)',
                    }}
                    className={`flex font-bold text-sm my-4 px-3 py-0.5 rounded-3xl theme-${theme}`}
                  >
                    {author.roleName ? author.roleName : author.role}
                  </div>
                  <span
                    style={{
                      lineHeight: '160%',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: '5',
                    }}
                    className="overflow-hidden not-italic font-normal text-base tracking-wider text-gray-900"
                  >
                    {author.bio}
                  </span>
                  {author.slug && (
                    <div className="text-center text-lg mt-5 mb-10">
                      <Link
                        href={`/author/${author.slug}`}
                        style={{ color: 'var(--theme-color)' }}
                        className={`no-underline theme-${theme}`}
                      >
                        <span>
                          了解更多{' '}
                          <i className="icon-rpjr-icon-arrow-right"></i>
                        </span>
                      </Link>
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
