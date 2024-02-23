import { CompositeDecorator } from 'draft-js'
import { annotationDecorator } from './annotation-decorator'
import { linkDecorator } from './link-decorator'
import { tocAnchorDecorator } from './toc-anchor'
import { innerAnchorDecorator } from './inner-anchor'

export { annotationDecorator, linkDecorator }

export const decorator = new CompositeDecorator([
  annotationDecorator,
  linkDecorator,
  tocAnchorDecorator,
  innerAnchorDecorator,
])
