import React, { useState } from 'react'
import styled from 'styled-components'
import { AtomicBlockProps } from '../block-renderer-fn.type'
import {
  ImageSelectorOnChangeFn,
  ImageSelector,
  ImageEntityWithMeta,
} from '../buttons/selector/image-selector'
import { EditableBlock as _EditableBlock } from './styled'
import { blockRenderers } from '@kids-reporter/draft-renderer'

const { SlideshowInArticleBody } = blockRenderers

const StyledSlideshow = styled(SlideshowInArticleBody)``

const EditableBlock = styled(_EditableBlock)`
  &:hover {
    ${StyledSlideshow} {
      background-color: #f0f0f0;
      opacity: 0.3;
    }
`

type EntityData = {
  alignment?: string
  delay?: number
  images: ImageEntityWithMeta[]
}

export function EditableSlideshow(props: AtomicBlockProps<EntityData>) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const { block, blockProps, contentState } = props
  const { onEditStart, onEditFinish } = blockProps
  const entityKey = block.getEntityAt(0)
  const entity = contentState.getEntity(entityKey)
  const data = entity.getData() || {}

  const onChange: ImageSelectorOnChangeFn = (selectedImages, alignment) => {
    // close `ImageSelector`
    setIsSelectorOpen(false)

    if (selectedImages?.length === 0) {
      onEditFinish()
      return
    }

    onEditFinish({
      entityKey,
      entityData: { alignment: alignment, images: selectedImages },
    })
  }

  return (
    <React.Fragment>
      {isSelectorOpen && (
        <ImageSelector
          onChange={onChange}
          enableCaption={true}
          enableUrl={false}
          enableAlignment={false}
          enableMultiSelect={true}
          alignment={data.alignment}
          selected={data.images}
        />
      )}
      <EditableBlock
        component={<StyledSlideshow data={data} />}
        onClick={() => {
          onEditStart()
          setIsSelectorOpen(true)
        }}
      />
    </React.Fragment>
  )
}
