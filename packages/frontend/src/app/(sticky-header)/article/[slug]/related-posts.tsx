import PostSlider, { PostSliderProp } from '@/app/components/post-slider'

export const RelatedPosts = (props: PostSliderProp) => {
  return (
    props?.posts?.length > 0 && (
      <div
        style={{ width: '95vw' }}
        className="flex flex-col justify-center items-center px-0 py-12"
      >
        <img
          className="w-full h-20 mb-4 "
          src="/assets/images/post-related-post-title.svg"
          alt="相關文章"
          loading="lazy"
        />
        <PostSlider {...props} />
      </div>
    )
  )
}

export default RelatedPosts
