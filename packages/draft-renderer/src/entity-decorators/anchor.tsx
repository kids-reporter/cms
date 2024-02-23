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
  const id = contentState?.getEntity(entityKey)?.getData()?.anchorID
  return <span id={id}>{children}</span>
}

export const anchorDecorator = {
  strategy: findEntitiesByType(ENTITY.Anchor),
  component: Anchor,
}
