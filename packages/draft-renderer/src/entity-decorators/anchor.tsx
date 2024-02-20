import React from 'react'
import { ContentBlock, ContentState } from 'draft-js'

export const ANCHOR_ENTITY_TYPE = 'TOC_ANCHOR'

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
}) => {
  const { children, contentState, entityKey } = props
  const key = contentState?.getEntity(entityKey)?.getData()?.anchorKey
  return <span id={`anchor-${key}`}>{children}</span>
}

export const anchorDecorator = {
  strategy: findAnchorEntities,
  component: Anchor,
}
