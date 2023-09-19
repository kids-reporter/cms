'use client'
import styled from 'styled-components'
import { ProjectContentDraftRenderer } from '@kids-reporter/draft-renderer'
import { RawDraftContentState } from 'draft-js'
import { Theme } from '@/app/constants'
import { useEffect, useState } from 'react'

type ContentProp = {
  rawContentState: RawDraftContentState
  theme: Theme
}

const Container = styled.div`
  margin-bottom: 120px;
`

export const Content = ({
  rawContentState,
  theme = Theme.BLUE,
}: ContentProp) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // TODO: render skeleton
  return isMounted ? (
    <Container>
      <ProjectContentDraftRenderer
        rawContentState={rawContentState}
        themeColor={theme}
      />
    </Container>
  ) : null
}

export default Content
