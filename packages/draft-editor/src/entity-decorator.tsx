import { CompositeDecorator } from 'draft-js'
import dr from '@kids-reporter/draft-renderer'

const { annotationDecorator, linkDecorator } = dr.entityDecorators

const decorators = new CompositeDecorator([annotationDecorator, linkDecorator])

export default decorators
