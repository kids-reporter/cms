import blockRenderMaps from './block-render-maps/index'
import {
  DraftRenderer,
  ArticleBodyDraftRenderer,
  ArticleIntroductionDraftRenderer,
  ProjectContentDraftRenderer,
} from './draft-renderer'
import { atomicBlockRenderer } from './block-renderer-fn'
import { blockRenderers } from './block-renderers'
import {
  annotationDecorator,
  linkDecorator,
  ANCHOR_ENTITY_TYPE,
  INNER_ANCHOR_ENTITY_TYPE,
} from './entity-decorators'
import { findEntitiesByType } from './utils/entity'
import { customStyleFn } from './custom-style-fn'

const blockRenderMap = blockRenderMaps.content

export {
  ArticleBodyDraftRenderer,
  ArticleIntroductionDraftRenderer,
  DraftRenderer,
  ProjectContentDraftRenderer,
  atomicBlockRenderer,
  blockRenderMap,
  blockRenderers,
  customStyleFn,
  annotationDecorator,
  linkDecorator,
  ANCHOR_ENTITY_TYPE,
  INNER_ANCHOR_ENTITY_TYPE,
  findEntitiesByType,
}

export default {
  ArticleBodyDraftRenderer,
  ArticleIntroductionDraftRenderer,
  DraftRenderer,
  ProjectContentDraftRenderer,
  atomicBlockRenderer,
  blockRenderMap: blockRenderMaps.content,
  blockRenderers,
  customStyleFn,
  annotationDecorator,
  linkDecorator,
  ANCHOR_ENTITY_TYPE,
  INNER_ANCHOR_ENTITY_TYPE,
  findEntitiesByType,
}
