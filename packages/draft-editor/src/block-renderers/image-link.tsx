import React, { useState } from 'react'
import styled from 'styled-components'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'
import {
  EditorState,
  RawDraftContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js'
import { blockRenderers } from '@kids-reporter/draft-renderer'
import { AtomicBlockProps } from '../block-renderer-fn.type'
import { ImageEntityWithMeta } from '../buttons/selector/image-selector'
import { EditableBlock as _EditableBlock } from './styled'
import { RichTextEditor } from '../rich-text-editor'
import { editableLinkDecorator } from '../entity-decorators/link'
import buttonNames from '../buttons/bt-names'

const disabledButtons = [
  buttonNames.bold,
  buttonNames.italic,
  buttonNames.underline,
  buttonNames.fontColor,
  buttonNames.backgroundColor,
  buttonNames.ol,
  buttonNames.ul,
  buttonNames.divider,
  buttonNames.h2,
  buttonNames.h3,
  buttonNames.h4,
  buttonNames.h5,
  buttonNames.code,
  buttonNames.codeBlock,
  buttonNames.blockquote,
  buttonNames.infoBox,
  buttonNames.slideshow,
  buttonNames.newsReading,
  buttonNames.tocAnchor,
  buttonNames.anchor,
  buttonNames.embed,
  buttonNames.annotation,
  buttonNames.image,
  buttonNames.imageLink,
]

const { ImageLinkInArticleBody } = blockRenderers

const StyledImage = styled(ImageLinkInArticleBody)``

const EditableBlock = styled(_EditableBlock)`
  &:hover {
    ${StyledImage} {
      background-color: #f0f0f0;
      opacity: 0.3;
    }
`

type EntityData = ImageEntityWithMeta & {
  alignment?: string
}

export type ImageLinkValue = {
  type: 'image-link'
  rawContentState: RawDraftContentState
}

export const ImageLinkEditor = (props: {
  isOpen: boolean
  inputValue: ImageLinkValue
  onConfirm: (arg0: {
    type: 'image-link'
    rawContentState: RawDraftContentState
  }) => void
  onCancel: () => void
}) => {
  const { isOpen, inputValue, onConfirm, onCancel } = props
  const [url, setURL] = useState('')
  const contentState = convertFromRaw(inputValue.rawContentState)
  const [inputValueState, setInputValueState] = useState({
    type: inputValue.type,
    editorState: EditorState.createWithContent(contentState),
  })

  console.log(setInputValueState)

  return (
    <DrawerController isOpen={isOpen}>
      <Drawer
        title={`Image Link`}
        actions={{
          cancel: {
            label: 'Cancel',
            action: () => onCancel(),
          },
          confirm: {
            label: 'Confirm',
            action: () =>
              onConfirm({
                type: inputValueState.type,
                rawContentState: convertToRaw(
                  inputValueState.editorState.getCurrentContent()
                ),
              }),
          },
        }}
      >
        <TextInput
          placeholder="圖片連結"
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <RichTextEditor
          decorators={[editableLinkDecorator]}
          disabledButtons={disabledButtons}
          editorState={inputValueState.editorState}
          onChange={(editorState: EditorState) => {
            setInputValueState({
              type: inputValueState.type,
              editorState,
            })
          }}
        />
      </Drawer>
    </DrawerController>
  )
}

export const EditableImageLink = (props: AtomicBlockProps<EntityData>) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const { block, blockProps, contentState } = props
  const { onEditStart, onEditFinish } = blockProps
  const entityKey = block.getEntityAt(0)
  const entity = contentState.getEntity(entityKey)
  const data = entity.getData() || {}
  const {alignment: _alignment, ...imageWithMeta} = data // eslint-disable-line

  const onChange = () => {
    onEditFinish()
    /*
    setIsSelectorOpen(false)

    if (selectedImages?.length === 0) {
      onEditFinish()
      return
    }

    const selectedImage = selectedImages?.[0]

    onEditFinish({
      entityKey,
      entityData: Object.assign({ alignment: alignment }, selectedImage),
    })
    */
  }

  return (
    <>
      {isEditorOpen && (
        <ImageLinkEditor
          isOpen={isEditorOpen}
          inputValue={{
            type: 'image-link',
            rawContentState: { blocks: [], entityMap: {} },
          }}
          onConfirm={onChange}
          onCancel={() => {
            setIsEditorOpen(false)
          }}
        />
      )}
      <EditableBlock
        component={<StyledImage data={data} />}
        onClick={() => {
          onEditStart()
          setIsEditorOpen(true)
        }}
      />
    </>
  )
}
