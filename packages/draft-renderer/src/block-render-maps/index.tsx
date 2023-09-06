import { blockRenderMap as blockRenderMapForAnnotation } from './annotation'
import { blockRenderMap as blockRenderMapForBrief } from './article-brief'
import { blockRenderMap as blockRenderMapForContent } from './article-content'
import {
  blockRenderMap as blockRenderMapForInfoBox,
  blockRenderMapForInfoBoxWithHeaderBorder,
} from './info-box'

export default {
  annotation: blockRenderMapForAnnotation,
  brief: blockRenderMapForBrief,
  content: blockRenderMapForContent,
  infoBox: {
    default: blockRenderMapForInfoBox,
    headerBorder: blockRenderMapForInfoBoxWithHeaderBorder,
  },
}
