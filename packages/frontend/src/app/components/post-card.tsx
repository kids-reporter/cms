import { PostSummary } from '@/app/components/types'
import { GetFormattedDate, ShortenParagraph } from '@/app/utils'

import './post-card.scss'

export type PostCardProp = {
  post: PostSummary
}

const titleLengthLimit = 35
const descLengthLimit = 110

export const PostCard = (props: PostCardProp) => {
  const post = props.post

  return (
    post && (
      <a href={post.url} className={`post-body theme-${post.theme}`}>
        <img src={post.image} />
        <span className="post-category">{post.category}</span>
        <span className="post-title">
          {ShortenParagraph(post.title, titleLengthLimit) ?? ''}
        </span>
        <span className="post-desc">
          {ShortenParagraph(post.desc, descLengthLimit) ?? ''}
        </span>
        <div className="post-bottom">
          {post.subSubcategory && (
            <span className="subSubcategory">{post.subSubcategory}</span>
          )}
          <span className="published-date">
            {GetFormattedDate(post.publishedDate) ?? ''}
          </span>
        </div>
      </a>
    )
  )
}

export default PostCard
