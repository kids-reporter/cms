import React from 'react'
import { ContentState } from 'draft-js'
import { findEntitiesByType } from '../utils/entity'

export const ANCHOR_ENTITY_TYPE = 'TOC_ANCHOR'

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
  strategy: findEntitiesByType(ANCHOR_ENTITY_TYPE),
  component: Anchor,
}
