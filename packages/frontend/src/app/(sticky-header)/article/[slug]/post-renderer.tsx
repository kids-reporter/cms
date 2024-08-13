'use client'
import { useEffect, useState, useRef } from 'react'
import { useArticleContext } from './article-context'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import { ArticleBodyDraftRenderer } from '@kids-reporter/draft-renderer'
import { STICKY_HEADER_HEIGHT, Theme } from '@/app/constants'
import { tocAnchorPrefix, tocIndexPrefix } from './table-of-content'
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
  const firstAnchorIDRef = useRef<string | null>(null)
  const prevAnchorIDRef = useRef<string | null>(null)

  useEffect(() => {
    setIsMounted(true)

    const isVisibleClassName = 'isTOCVisible'
    const highlightFirstVisible = () => {
      const tocIndexes = document.querySelectorAll(`[id^="${tocIndexPrefix}-"]`)
      tocIndexes?.forEach((index) => {
        index?.classList.remove('isActive')
      })

      const firstVisibleIndex = document.querySelector(
        `[id^="${tocIndexPrefix}-"].${isVisibleClassName}`
      )
      if (firstVisibleIndex) {
        firstVisibleIndex.classList.add('isActive')
      } else {
        // Handling for outside first/last anchor
        const prevAnchorID = prevAnchorIDRef.current
        if (prevAnchorID && prevAnchorID !== firstAnchorIDRef.current) {
          const tocIndexID = prevAnchorID.replace(
            tocAnchorPrefix,
            tocIndexPrefix
          )
          document.querySelector(`#${tocIndexID}`)?.classList.add('isActive')
        }
      }
    }

    // Add IntersectionObserver for spy scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const anchorID = entry.target.getAttribute('id')
          const indexID = anchorID?.replace(tocAnchorPrefix, tocIndexPrefix)
          const index = document.querySelector(`#${indexID}`)
          if (entry.isIntersecting) {
            index?.classList?.add(isVisibleClassName)
            prevAnchorIDRef.current = anchorID
          } else {
            index?.classList?.remove(isVisibleClassName)
            // Prevent initial fire when mounted
            if (prevAnchorIDRef.current) {
              prevAnchorIDRef.current = anchorID
            }
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
    const anchors = document.querySelectorAll(`[id^="${tocAnchorPrefix}-"]`)
    anchors?.forEach((anchor, index) => {
      if (index === 0) {
        firstAnchorIDRef.current = anchor.id
      }
      observerRef.current?.observe(anchor)
    })
  })

  const content = props.post?.content
  const theme = props.theme
  const { fontSize, handleImgModalOpen } = useArticleContext()

  return isMounted && content && theme ? (
    <ArticleBodyDraftRenderer
      rawContentState={content}
      themeColor={theme}
      fontSizeLevel={fontSize}
      handleImgModalOpen={handleImgModalOpen}
      initiallyScrollTo={
        typeof window !== 'undefined' ? window.location.hash : undefined
      }
      offsetTop={STICKY_HEADER_HEIGHT}
    />
  ) : (
    <SkeletonContainer>
      <Skeleton width={'80%'} count={5} />
    </SkeletonContainer>
  )
}

export default PostRenderer
