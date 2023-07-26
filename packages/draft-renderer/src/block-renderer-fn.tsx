import { ContentState, ContentBlock } from 'draft-js'
import { blockRenderers } from './block-renderers'
const {
  EmbeddedCodeBlock,
  ImageInArticleBody,
  InfoBoxBlock,
  SlideshowInArticleBody,
} = blockRenderers

const AtomicBlock = (props: {
  contentState: ContentState
  block: ContentBlock
}) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))

  const entityType = entity.getType()
  const entityData = entity.getData()

  switch (entityType) {
    case 'image': {
      return ImageInArticleBody({ data: entityData })
    }
    case 'slideshow': {
      return SlideshowInArticleBody({ data: entityData })
    }
    case 'EMBEDDEDCODE': {
      return EmbeddedCodeBlock({ data: entityData })
    }
    case 'INFOBOX': {
      return InfoBoxBlock({ data: entityData })
    }
  }
  return null
}

export function atomicBlockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: AtomicBlock,
      editable: false,
    }
  }

  return null
}
