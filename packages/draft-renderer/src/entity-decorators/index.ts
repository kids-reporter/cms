import { CompositeDecorator } from 'draft-js'
import { annotationDecorator } from './annotation-decorator'
import { linkDecorator } from './link-decorator'
import { anchorDecorator, ANCHOR_ENTITY_TYPE } from './anchor'
import { innerAnchorDecorator, INNER_ANCHOR_ENTITY_TYPE } from './inner-anchor'

export {
  annotationDecorator,
  linkDecorator,
  ANCHOR_ENTITY_TYPE,
  INNER_ANCHOR_ENTITY_TYPE,
}

export const decorator = new CompositeDecorator([
  annotationDecorator,
  linkDecorator,
  anchorDecorator,
  innerAnchorDecorator,
])
