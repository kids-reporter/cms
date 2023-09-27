'use client'
import { ProjectContentDraftRenderer } from '@kids-reporter/draft-renderer'
import { RawDraftContentState } from 'draft-js'
import { Theme } from '@/app/constants'
import { useEffect, useState } from 'react'

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

  // TODO: render skeleton
  return isMounted ? (
    <ProjectContentDraftRenderer
      rawContentState={rawContentState}
      themeColor={theme}
    />
  ) : null
}

export default DraftRenderer
