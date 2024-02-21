import React from 'react'
import { ContentState } from 'draft-js'
import { findEntitiesByType } from '../utils/entity'

export const INNER_ANCHOR_ENTITY_TYPE = 'ANCHOR'

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
  strategy: findEntitiesByType(INNER_ANCHOR_ENTITY_TYPE),
  component: InnerAnchor,
}
