import React from 'react'
import { ContentBlock, ContentState } from 'draft-js'

export const INNER_ANCHOR_ENTITY_TYPE = 'ANCHOR'

export const findInnerAnchorEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === INNER_ANCHOR_ENTITY_TYPE
    )
  }, callback)
}

const InnerAnchor = (props: {
  decoratedText: string
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
}) => {
  const { children, contentState, entityKey } = props
  const id = contentState?.getEntity(entityKey)?.getData()?.anchorID
  return <span id={id}>{children}</span>
}

export const innerAnchorDecorator = {
  strategy: findInnerAnchorEntities,
  component: InnerAnchor,
}
