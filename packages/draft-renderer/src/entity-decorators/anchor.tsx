import React from 'react'
import { ContentState } from 'draft-js'
import { ENTITY, findEntitiesByType } from '../utils/entity'

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
  strategy: findEntitiesByType(ENTITY.TOCAnchor),
  component: Anchor,
}
