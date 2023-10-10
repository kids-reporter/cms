'use client'
import { useEffect, useState } from 'react'
import { useArticleContext } from './article-context'
import { ArticleBodyDraftRenderer } from '@kids-reporter/draft-renderer'
import { Theme } from '@/app/constants'

type PostProp = {
  post: any
  theme: Theme
}

export const PostRenderer = (props: PostProp) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { fontSize } = useArticleContext()

  // TODO: render skeleton
  return (
    isMounted &&
    props?.post?.content &&
    props?.theme && (
      <ArticleBodyDraftRenderer
        rawContentState={props.post.content}
        fontSizeLevel={fontSize}
        themeColor={props.theme}
      />
    )
  )
}

export default PostRenderer
