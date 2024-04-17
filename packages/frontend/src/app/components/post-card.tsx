import Link from 'next/link'
import { PostSummary } from '@/app/components/types'
import { getFormattedDate } from '@/app/utils'
import './post-card.scss'

const fallbackImg = '/assets/images/404.png'

export type PostCardProp = {
  className?: string
  post: PostSummary
  isSimple?: boolean
}

export const PostCard = ({
  className,
  post,
  isSimple = false,
}: PostCardProp) => {
  return (
    post && (
      <Link
        href={post.url}
        className={`post-body theme-${post.theme} ${
          className ? className : ''
        }`}
      >
        <div className="hero-image-container">
          <img
            className={isSimple ? 'simple' : ''}
            src={post.image ?? fallbackImg}
          />
        </div>
        <div className={`card-info ${isSimple ? 'simple' : ''}`}>
          <div className="card-top">
            <span className="card-category">{post.category}</span>
            <span className="card-title">{post.title}</span>
            {!isSimple && <span className="card-desc">{post.desc}</span>}
          </div>
          <div className="card-bottom">
            {post.subSubcategory && (
              <span className="subSubcategory">{post.subSubcategory}</span>
            )}
            <span className="published-date">
              {(post.publishedDate && getFormattedDate(post.publishedDate)) ??
                ''}
            </span>
          </div>
        </div>
      </Link>
    )
  )
}

export default PostCard
