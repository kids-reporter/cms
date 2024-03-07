import React from 'react'
import { ContentState } from 'draft-js'
import { ENTITY, findEntitiesByType } from '../utils/entity'

const TOCAnchor = (props: {
  decoratedText: string
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
}) => {
  const { children, contentState, entityKey } = props
  const key = contentState?.getEntity(entityKey)?.getData()?.anchorKey
  return <span id={`toc-anchor-${key}`}>{children}</span>
}

export const tocAnchorDecorator = {
  strategy: findEntitiesByType(ENTITY.TOCAnchor),
  component: TOCAnchor,
}
