'use client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import { ProjectContentDraftRenderer } from '@kids-reporter/draft-renderer'
import { RawDraftContentState } from 'draft-js'
import { Theme } from '@/app/constants'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonContainer = styled.div`
  width: 100%;
  text-align: center;
  line-height: 200%;
`

export type DraftRendererProp = {
  rawContentState: RawDraftContentState
  theme: Theme
}

export const DraftRenderer = ({
  rawContentState,
  theme = Theme.BLUE,
}: DraftRendererProp) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted && rawContentState && theme ? (
    <ProjectContentDraftRenderer
      rawContentState={rawContentState}
      themeColor={theme}
    />
  ) : (
    <SkeletonContainer>
      <Skeleton width={'80%'} count={5} />
    </SkeletonContainer>
  )
}

export default DraftRenderer
