import { PostSummary } from '@/app/components/types'
import { GetFormattedDate, ShortenParagraph } from '@/app/utils'
import './post-card.scss'

export type PostCardProp = {
  className?: string
  post: PostSummary
  isSimple?: boolean
}

const titleLengthLimit = 30
const descLengthLimit = 60

export const PostCard = ({
  className,
  post,
  isSimple = false,
}: PostCardProp) => {
  return (
    post && (
      <a
        href={post.url}
        className={`post-body theme-${post.theme} ${
          className ? className : ''
        }`}
      >
        <div className="hero-image-container">
          <img className={isSimple ? 'simple' : ''} src={post.image} />
        </div>
        <div className={`card-info ${isSimple ? 'simple' : ''}`}>
          <div className="card-top">
            <span className="card-category">{post.category}</span>
            <span className="card-title">
              {ShortenParagraph(post.title, titleLengthLimit) ?? ''}
            </span>
            {!isSimple && (
              <span className="card-desc">
                {ShortenParagraph(post.desc, descLengthLimit) ?? ''}
              </span>
            )}
          </div>
          <div className="card-bottom">
            {post.subSubcategory && (
              <span className="subSubcategory">{post.subSubcategory}</span>
            )}
            <span className="published-date">
              {(post.publishedDate && GetFormattedDate(post.publishedDate)) ??
                ''}
            </span>
          </div>
        </div>
      </a>
    )
  )
}

export default PostCard
