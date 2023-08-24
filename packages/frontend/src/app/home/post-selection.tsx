import PostCard from '@/app/components/post-card'
import { PostSummary } from '@/app/components/types'
import { GetFormattedDate } from '@/app/utils'

import './post-selection.scss'

type PostSelectionProp = {
  latestPosts: PostSummary[]
  featuredPosts: PostSummary[]
}

const PostBrick = (props: { post: PostSummary }) => {
  const post = props?.post
  return (
    post && (
      <a className="post-brick" href={post.url}>
        <p>{`${post.category}/${post.subSubcategory} ${GetFormattedDate(
          post.publishedDate
        )}`}</p>
        <p>{post.title}</p>
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
        src={'/images/featured-post.png'}
        alt="精選文章"
      />
      <div className="featured-post-container">
        <div className="lastest-post">
          <div className="more">
            <span>
              <img src={'/images/home-icon-clock.svg'} />
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
        <div className="featured-post">
          <div className="cards">
            <PostCard post={featuredPosts[0]} showDesc={false} />
            <PostCard post={featuredPosts[1]} showDesc={false} />
          </div>
          <div className="cards">
            <PostCard post={featuredPosts[2]} showDesc={false} />
            <PostCard post={featuredPosts[3]} showDesc={false} />
            <PostCard post={featuredPosts[4]} showDesc={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostSelection
