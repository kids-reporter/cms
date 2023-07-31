import PostSlider from './post-slider'
import './related-post.scss'

type RelatedPostsProp = {
  posts: any[]
}

export const RelatedPosts = (props: RelatedPostsProp) => {
  return (
    <div className="related-post-container">
      <h3 className="ct-block-title">
        <img
          src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/post-related-post-title.svg"
          alt="相關文章"
        />
      </h3>
      <PostSlider posts={props.posts} />
    </div>
  )
}

export default RelatedPosts
