import { CompositeDecorator } from 'draft-js'
import { annotationDecorator } from './annotation-decorator'
import { linkDecorator } from './link-decorator'
import { editableAnchorDecorator, ANCHOR_ENTITY_TYPE } from './anchor'

export {
  annotationDecorator,
  linkDecorator,
  editableAnchorDecorator,
  ANCHOR_ENTITY_TYPE,
}

export const decorator = new CompositeDecorator([
  annotationDecorator,
  linkDecorator,
])
