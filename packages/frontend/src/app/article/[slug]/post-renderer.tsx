'use client'
import { ArticleBodyDraftRenderer } from '@kids-reporter/draft-renderer'

export const PostRenderer = ({ post }: { post: any }) => {
  return (
    <>
      {post?.content && (
        <ArticleBodyDraftRenderer
          rawContentState={post.content}
          themeColor={post.theme}
        />
      )}
    </>
  )
}

export default PostRenderer
