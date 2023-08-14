'use client'
import { ArticleBodyDraftRenderer } from '@kids-reporter/draft-renderer'
import { Theme } from '@/app/constants'

type PostProp = {
  post: any
  theme: Theme
}

export const PostRenderer = (props: PostProp) => {
  return (
    props?.post?.content &&
    props?.theme && (
      <ArticleBodyDraftRenderer
        rawContentState={props.post.content}
        themeColor={props.theme}
      />
    )
  )
}

export default PostRenderer
