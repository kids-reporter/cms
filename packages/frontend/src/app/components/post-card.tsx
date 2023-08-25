import { PostSummary } from '@/app/components/types'
import { GetFormattedDate, ShortenParagraph } from '@/app/utils'

import './post-card.scss'

export type PostCardProp = {
  post: PostSummary
  showDesc?: boolean
}

const titleLengthLimit = 30
const descLengthLimit = 110

export const PostCard = ({ post, showDesc = true }: PostCardProp) => {
  return (
    post && (
      <a href={post.url} className={`post-body theme-${post.theme}`}>
        <img src={post.image} />
        <div className="card-info">
          <span className="card-category">{post.category}</span>
          <span className="card-title">
            {ShortenParagraph(post.title, titleLengthLimit) ?? ''}
          </span>
          {showDesc && (
            <span className="card-desc">
              {ShortenParagraph(post.desc, descLengthLimit) ?? ''}
            </span>
          )}
          <div className="card-bottom">
            {post.subSubcategory && (
              <span className="subSubcategory">{post.subSubcategory}</span>
            )}
            <span className="published-date">
              {GetFormattedDate(post.publishedDate) ?? ''}
            </span>
          </div>
        </div>
      </a>
    )
  )
}

export default PostCard
