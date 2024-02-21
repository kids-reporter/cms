import { CompositeDecorator } from 'draft-js'
import { annotationDecorator } from './annotation-decorator'
import { linkDecorator } from './link-decorator'
import {
  anchorDecorator,
  findAnchorEntities,
  ANCHOR_ENTITY_TYPE,
} from './anchor'
import {
  innerAnchorDecorator,
  findInnerAnchorEntities,
  INNER_ANCHOR_ENTITY_TYPE,
} from './inner-anchor'

export {
  annotationDecorator,
  linkDecorator,
  findAnchorEntities,
  ANCHOR_ENTITY_TYPE,
  findInnerAnchorEntities,
  INNER_ANCHOR_ENTITY_TYPE,
}

export const decorator = new CompositeDecorator([
  annotationDecorator,
  linkDecorator,
  anchorDecorator,
  innerAnchorDecorator,
])
