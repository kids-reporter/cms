import { InfoBoxEditorBlock as InfoBoxBlock } from './block-renderer/info-box-block'
import { TableEditorBlock as TableBlock } from './block-renderer/table-block'
import { ColorBoxEditorBlock as ColorBoxBlock } from './block-renderer/color-box-block'
import { BGImageEditorBlock as BGImageBlock } from './block-renderer/background-image-block'
import { BGVideoEditorBlock as BGVideoBlock } from './block-renderer/background-video-block'
import { SideIndexEditorBlock as SideIndexBlock } from './block-renderer/side-index-block'
import dr from '@kids-reporter/draft-renderer'

const {
  EmbeddedCodeBlock,
  MediaBlock,
  ImageBlock,
  SlideshowBlock,
  DividerBlock,
  RelatedPostBlock,
  VideoBlock,
  AudioBlock,
} = dr.blockRenderers

const AtomicBlock = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))

  const entityType = entity.getType()

  switch (entityType) {
    case 'audioLink':
    case 'imageLink':
    case 'videoLink': {
      return MediaBlock(entity)
    }
    case 'image': {
      return ImageBlock(entity)
    }
    case 'slideshow': {
      return SlideshowBlock(entity)
    }
    case 'EMBEDDEDCODE': {
      return EmbeddedCodeBlock(entity)
    }
    case 'INFOBOX': {
      return InfoBoxBlock(props)
    }
    case 'DIVIDER': {
      return DividerBlock()
    }
    case 'TABLE': {
      return TableBlock(props)
    }
    case 'COLORBOX': {
      return ColorBoxBlock(props)
    }
    case 'BACKGROUNDIMAGE': {
      return BGImageBlock(props)
    }
    case 'BACKGROUNDVIDEO': {
      return BGVideoBlock(props)
    }
    case 'RELATEDPOST': {
      return RelatedPostBlock(entity)
    }
    case 'SIDEINDEX': {
      return SideIndexBlock(props)
    }
    case 'VIDEO': {
      return VideoBlock(entity)
    }
    case 'AUDIO': {
      return AudioBlock(entity)
    }
  }
  return null
}

export function atomicBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: AtomicBlock,
      editable: false,
    }
  }

  return null
}
