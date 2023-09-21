import PostCard from '@/app/components/post-card'
import { PostSummary } from '@/app/components/types'
import { GetFormattedDate, ShortenParagraph } from '@/app/utils'

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
        <div className="top">
          <p className="category">{`${post.category}/${post.subSubcategory}`}</p>
          <p className="date">{GetFormattedDate(post.publishedDate)}</p>
        </div>
        <p className="title">{ShortenParagraph(post.title, 20)}</p>
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
        src={'/images/selected_news.png'}
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
            <div className="card-child-1">
              <PostCard post={featuredPosts[0]} showDesc={false} />
            </div>
            <div className="card-child-2">
              <PostCard post={featuredPosts[1]} showDesc={false} />
            </div>
            <div className="card-child-rest">
              <PostCard post={featuredPosts[2]} showDesc={false} />
            </div>

            <div className="card-child-rest">
              <PostCard post={featuredPosts[3]} showDesc={false} />
            </div>

            <div className="card-child-rest">
              <PostCard post={featuredPosts[4]} showDesc={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostSelection
