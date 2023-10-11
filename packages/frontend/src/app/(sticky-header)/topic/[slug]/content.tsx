'use client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import { DraftRenderer, DraftRendererProp } from './draft-renderer'
import { mediaQuery } from '@/app/utils/media-query'
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div`
  margin-bottom: 70px;
  ${mediaQuery.smallOnly} {
    margin-bottom: 50px;
  }
`

const SkeletonContainer = styled.div`
  width: 100%;
  text-align: center;
  line-height: 200%;
`

export const Content = ({ rawContentState, theme }: DraftRendererProp) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Container>
      {isMounted && rawContentState && theme ? (
        <DraftRenderer rawContentState={rawContentState} theme={theme} />
      ) : (
        <SkeletonContainer>
          <Skeleton width={'80%'} count={5} />
        </SkeletonContainer>
      )}
    </Container>
  )
}

export default Content
