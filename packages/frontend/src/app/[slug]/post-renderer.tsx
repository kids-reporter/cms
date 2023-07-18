'use client'
import draftRenderer from '@kids-reporter/draft-renderer'

export const PostRenderer = ({ post }: { post: any }) => {
  console.log('render draftRenderer')
  return (
    <>
      {post?.brief && (
        <draftRenderer.DraftRenderer rawContentBlock={post.brief} />
      )}
      {post?.content && (
        <draftRenderer.DraftRenderer rawContentBlock={post.content} />
      )}
    </>
  )
}

export default PostRenderer
