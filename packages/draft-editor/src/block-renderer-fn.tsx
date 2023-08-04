import { AtomicBlockProps } from './block-renderer-fn.type'
import { ContentBlock } from 'draft-js'
import { EditableBlockquote } from './block-renderers/blockquote'
import { blockRenderers } from '@kids-reporter/draft-renderer'

const {
  EmbeddedCodeInArticleBody,
  ImageInArticleBody,
  InfoBoxInArticleBody,
  SlideshowInArticleBody,
} = blockRenderers

const AtomicBlock: React.FC<AtomicBlockProps<any>> = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))

  const entityType = entity.getType()
  const entityData = entity.getData()

  switch (entityType) {
    case 'BLOCKQUOTE': {
      return EditableBlockquote(props)
    }
    case 'IMAGE': {
      return ImageInArticleBody({ data: entityData })
    }
    case 'SLIDESHOW': {
      return SlideshowInArticleBody({ data: entityData })
    }
    case 'EMBEDDEDCODE': {
      return EmbeddedCodeInArticleBody({ data: entityData })
    }
    case 'INFOBOX': {
      return InfoBoxInArticleBody({ data: entityData })
    }
  }
  return null
}

export function atomicBlockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: AtomicBlock,
      editable: false,
      props: {},
    }
  }

  return null
}
