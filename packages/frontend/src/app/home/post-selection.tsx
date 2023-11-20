import PostCard from '@/app/components/post-card'
import { PostSummary } from '@/app/components/types'
import { getFormattedDate } from '@/app/utils'

import './post-selection.scss'

type PostSelectionProp = {
  latestPosts: PostSummary[]
  featuredPosts: PostSummary[]
}

const PostBrick = ({ post }: { post: PostSummary }) => {
  return (
    post && (
      <a className="post-brick" href={post.url}>
        <div className="top">
          <p className="category">{`${post.category ?? ''}/${
            post.subSubcategory ?? ''
          }`}</p>
          <p className="date">
            {post.publishedDate ? getFormattedDate(post.publishedDate) : ''}
          </p>
        </div>
        <p className="title">{post.title}</p>
      </a>
    )
  )
}

export const PostSelection = (props: PostSelectionProp) => {
  const latestPosts = props?.latestPosts
  const featuredPosts = props?.featuredPosts

  return (
    <div className="post-selection">
      <img
        className="title-img"
        src={'/assets/images/selected_news.png'}
        alt="精選文章"
      />
      <div className="featured-post-container">
        <div className="lastest-post">
          <div className="more">
            <span>
              <img src={'/assets/images/home-icon-clock.svg'} />
              最新文章
            </span>
            <a href={'/all'}>
              更多<i className="icon-rpjr-icon-arrow-right"></i>
            </a>
          </div>
          <div className="latest-post-list">
            {latestPosts?.map((post, index) => {
              return <PostBrick key={`latest-post-${index}`} post={post} />
            })}
          </div>
        </div>
        {featuredPosts?.length > 0 && (
          <div className="featured-post">
            <div className="cards">
              <div className="card-child-1">
                {featuredPosts?.[0] && (
                  <PostCard post={featuredPosts[0]} isSimple={true} />
                )}
              </div>
              <div className="card-child-2">
                {featuredPosts?.[1] && (
                  <PostCard post={featuredPosts[1]} isSimple={true} />
                )}
              </div>
              <div className="card-child-rest">
                {featuredPosts?.[2] && (
                  <PostCard post={featuredPosts[2]} isSimple={true} />
                )}
              </div>
              <div className="card-child-rest">
                {featuredPosts?.[3] && (
                  <PostCard post={featuredPosts[3]} isSimple={true} />
                )}
              </div>
              <div className="card-child-rest">
                {featuredPosts?.[4] && (
                  <PostCard post={featuredPosts[4]} isSimple={true} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostSelection
