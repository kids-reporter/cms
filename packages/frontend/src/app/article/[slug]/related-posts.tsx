import PostSlider, { PostSliderProp } from '@/app/components/post-slider'
import './related-post.scss'

export const RelatedPosts = (props: PostSliderProp) => {
  return (
    props?.posts?.length > 0 && (
      <div className="related-post-container">
        <h3 className="ct-block-title">
          <img src="/images/post-related-post-title.svg" alt="相關文章" />
        </h3>
        <PostSlider {...props} />
      </div>
    )
  )
}

export default RelatedPosts
