import { CompositeDecorator } from 'draft-js'
import { annotationDecorator } from './annotation-decorator'
import { linkDecorator } from './link-decorator'
import { editableAnchorDecorator, ANCHOR_FIELD_NAME } from './anchor'

export {
  annotationDecorator,
  linkDecorator,
  editableAnchorDecorator,
  ANCHOR_FIELD_NAME,
}

export const decorator = new CompositeDecorator([
  annotationDecorator,
  linkDecorator,
])
