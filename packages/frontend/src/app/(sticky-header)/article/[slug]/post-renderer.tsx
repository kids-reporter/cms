'use client'
import { useEffect, useState } from 'react'
import { useArticleContext } from './article-context'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import { ArticleBodyDraftRenderer } from '@kids-reporter/draft-renderer'
import { Theme } from '@/app/constants'
import 'react-loading-skeleton/dist/skeleton.css'

type PostProp = {
  post: any
  theme: Theme
}

const SkeletonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  line-height: 200%;
`

export const PostRenderer = (props: PostProp) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const content = props.post?.content
  const theme = props.theme
  const { fontSize } = useArticleContext()

  return isMounted && content && theme ? (
    <ArticleBodyDraftRenderer
      rawContentState={content}
      themeColor={theme}
      fontSizeLevel={fontSize}
    />
  ) : (
    <SkeletonContainer>
      <Skeleton width={'80%'} count={5} />
    </SkeletonContainer>
  )
}

export default PostRenderer
