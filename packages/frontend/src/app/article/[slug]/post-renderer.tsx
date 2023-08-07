'use client'
import draftRenderer from '@kids-reporter/draft-renderer'

export const PostRenderer = ({ post }: { post: any }) => {
  return (
    <>
      {post?.brief && (
        <draftRenderer.DraftRenderer rawContentState={post.brief} />
      )}
      {post?.content && (
        <draftRenderer.DraftRenderer rawContentState={post.content} />
      )}
    </>
  )
}

export default PostRenderer
