'use client'
import draftRenderer from '@kids-reporter/draft-renderer'

export const PostRenderer = ({ post }: { post: any }) => {
  return (
    <>
      {post?.brief && (
        <draftRenderer.DraftRenderer
          rawContentState={post.brief}
          themeColor={post.theme}
        />
      )}
      {post?.content && (
        <draftRenderer.DraftRenderer
          rawContentState={post.content}
          themeColor={post.theme}
        />
      )}
    </>
  )
}

export default PostRenderer
