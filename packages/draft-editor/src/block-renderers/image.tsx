import React, { useState } from 'react'
import styled from 'styled-components'
import { AtomicBlockProps } from '../block-renderer-fn.type'
import {
  ImageSelectorOnChangeFn,
  ImageSelector,
  ImageEntity,
} from '../buttons/selector/image-selector'
import { EditButton, EditableBlock as _EditableBlock } from './styled'
import { blockRenderers } from '@kids-reporter/draft-renderer'

const { ImageInArticleBody } = blockRenderers

const StyledImage = styled(ImageInArticleBody)``

const EditableBlock = styled(_EditableBlock)`
  &:hover {
    ${StyledImage} {
      background-color: #f0f0f0;
      opacity: 0.3;
    }
`

type EntityData = ImageEntity & {
  desc?: string
  alignment?: string
}

export function EditableImage(props: AtomicBlockProps<EntityData>) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const { block, blockProps, contentState } = props
  const { onEditStart, onEditFinish } = blockProps
  const entityKey = block.getEntityAt(0)
  const entity = contentState.getEntity(entityKey)
  const data = entity.getData() || {}
  const { desc, alignment, ...imageEntity } = data

  const onChange: ImageSelectorOnChangeFn = (selectedImages, newAlignment) => {
    // close `ImageSelector`
    setIsSelectorOpen(false)

    if (selectedImages?.length === 0) {
      return
    }

    const imageEntityWithMeta = selectedImages?.[0]

    onEditFinish({
      entityKey,
      entityData: {
        ...imageEntityWithMeta?.image,
        desc: imageEntityWithMeta?.desc,
        alignment: newAlignment,
      },
    })
  }

  return (
    <React.Fragment>
      {isSelectorOpen && (
        <ImageSelector
          onChange={onChange}
          enableCaption={true}
          enableUrl={false}
          enableAlignment={true}
          alignment={alignment}
          selected={[
            {
              desc,
              image: imageEntity,
            },
          ]}
        />
      )}
      <EditableBlock>
        <StyledImage data={data} />
        <EditButton
          onClick={() => {
            // call `onEditStart` prop as we are trying to update the blockquote entity
            onEditStart()
            // open `BlockquoteInput`
            setIsSelectorOpen(true)
          }}
        >
          <i className="fa-solid fa-pen"></i>
          <span>Modify</span>
        </EditButton>
      </EditableBlock>
    </React.Fragment>
  )
}
