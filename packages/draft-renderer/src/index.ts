import {
  DraftRenderer,
  ArticleBodyDraftRenderer,
  ArticleIntroductionDraftRenderer,
} from './draft-renderer'
import { atomicBlockRenderer } from './block-renderer-fn'
import { blockRenderMap } from './block-render-map'
import { blockRenderers } from './block-renderers'
import { decorator } from './entity-decorators/index'

export {
  ArticleBodyDraftRenderer,
  ArticleIntroductionDraftRenderer,
  DraftRenderer,
  atomicBlockRenderer,
  blockRenderMap,
  blockRenderers,
  decorator,
}

export default {
  ArticleBodyDraftRenderer,
  ArticleIntroductionDraftRenderer,
  DraftRenderer,
  atomicBlockRenderer,
  blockRenderMap,
  blockRenderers,
  decorator,
}
