'use client'
import { useEffect, useState, useRef } from 'react'
import { useArticleContext } from './article-context'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import { ArticleBodyDraftRenderer } from '@kids-reporter/draft-renderer'
import { STICKY_HEADER_HEIGHT, Theme } from '@/app/constants'
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
  const observerRef = useRef<IntersectionObserver | null>(null)
  const prevAnchorIDRef = useRef<string | null>(null)

  useEffect(() => {
    setIsMounted(true)

    const isVisibleClassName = 'isTOCVisible'
    const highlightFirstVisible = () => {
      const tocIndexes = document.querySelectorAll(`[id^="toc-"]`)
      tocIndexes?.forEach((index) => {
        index?.classList.remove('isActive')
      })

      const firstVisibleAnchor = document.querySelector(
        `[id^="toc-"].${isVisibleClassName}`
      )
      firstVisibleAnchor?.classList.add('isActive')

      if (!firstVisibleAnchor && prevAnchorIDRef.current) {
        document
          .querySelector(`#${prevAnchorIDRef.current}`)
          ?.classList.add('isActive')
      }
    }

    // Add IntersectionObserver for spy scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const anchorID = entry.target.getAttribute('id')
          const tocAnchorID = anchorID?.replace('anchor', 'toc')
          const tocAnchor = document.querySelector(`#${tocAnchorID}`)
          if (entry.isIntersecting) {
            tocAnchor?.classList?.add(isVisibleClassName)
            prevAnchorIDRef.current = anchorID
          } else {
            tocAnchor?.classList?.remove(isVisibleClassName)
          }
          highlightFirstVisible()
        })
      },
      {
        root: null,
        rootMargin: `-${STICKY_HEADER_HEIGHT}px 0px 0px 0px`,
        threshold: 0,
      }
    )
  }, [])

  useEffect(() => {
    const anchors = document.querySelectorAll('[id^="anchor-"]')
    anchors?.forEach((anchor) => {
      observerRef.current?.observe(anchor)
    })
  })

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
