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
  findAnchorEntities,
  ANCHOR_ENTITY_TYPE,
} from './entity-decorators'
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
  findAnchorEntities,
  ANCHOR_ENTITY_TYPE,
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
  findAnchorEntities,
  ANCHOR_ENTITY_TYPE,
}
