import React, { useEffect } from 'react'
import { ContentBlock, ContentState } from 'draft-js'

export const ANCHOR_ENTITY_TYPE = 'ANCHOR'

export const findAnchorEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === ANCHOR_ENTITY_TYPE
    )
  }, callback)
}

const Anchor = (props: {
  decoratedText: string
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
  blockKey: string
  start: number
  end: number
}) => {
  const { children, blockKey, start, end } = props
  const key = `${blockKey}-${start}-${end}`
  const anchorID = `anchor-${key}`
  const tocAnchorID = `toc-${key}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const tocAnchor = document.querySelector(`#${tocAnchorID}`)
        const tocAnchorClassName = 'withinViewPort'
        entry.isIntersecting
          ? tocAnchor?.classList?.add(tocAnchorClassName)
          : tocAnchor?.classList?.remove(tocAnchorClassName)
      },
      {
        root: null,
        threshold: 0,
      }
    )

    observer.observe(document.querySelector(`#${anchorID}`) as Element)
  }, [])

  return <span id={anchorID}>{children}</span>
}

export const anchorDecorator = {
  strategy: findAnchorEntities,
  component: Anchor,
}
