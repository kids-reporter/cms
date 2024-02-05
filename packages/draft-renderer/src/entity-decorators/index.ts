import { CompositeDecorator } from 'draft-js'
import { annotationDecorator } from './annotation-decorator'
import { linkDecorator } from './link-decorator'
import { editableAnchorDecorator } from './anchor'

export { annotationDecorator, linkDecorator, editableAnchorDecorator }

export const decorator = new CompositeDecorator([
  annotationDecorator,
  linkDecorator,
])
