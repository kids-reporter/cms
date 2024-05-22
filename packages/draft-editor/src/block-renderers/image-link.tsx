import React, { useState, useRef } from 'react'
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
import {
  ImageAlignment,
  ImageAlignOptions,
} from '../buttons/selector/image-selector'
import { AlignSelector } from '../buttons/selector/align-selector'
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

const Label = styled.label`
  display: block;
  margin: 10px 0;
  font-weight: 600;
`

const EditableBlock = styled(_EditableBlock)`
  &:hover {
    ${StyledImage} {
      background-color: #f0f0f0;
      opacity: 0.3;
    }
`

type EntityData = {
  url: string
  alignment?: string
  rawContentState?: RawDraftContentState
}

export type ImageLinkValue = {
  url: string
  alignment: ImageAlignment
  rawContentState: RawDraftContentState
}

export const ImageLinkEditor = (props: {
  isOpen: boolean
  inputValue: ImageLinkValue
  onConfirm: (arg0: {
    url: string
    alignment: ImageAlignment
    rawContentState: RawDraftContentState
  }) => void
  onCancel: () => void
}) => {
  const { isOpen, inputValue, onConfirm, onCancel } = props
  const [url, setURL] = useState('')
  const [align, setAlign] = useState(ImageAlignment.DEFAULT)
  const contentState = convertFromRaw(inputValue.rawContentState)
  const [inputValueState, setInputValueState] = useState({
    url: '',
    alignment: ImageAlignment.DEFAULT,
    editorState: EditorState.createWithContent(contentState),
  })

  const contentWrapperRef = useRef<HTMLDivElement>(null)

  const onAlignSelectChange = (align: ImageAlignment) => {
    setAlign(align)
  }

  const onAlignSelectOpen = () => {
    const scrollWrapper = contentWrapperRef.current?.parentElement
    if (scrollWrapper) {
      scrollWrapper.scrollTop = scrollWrapper?.scrollHeight
    }
  }

  return (
    <DrawerController isOpen={isOpen}>
      <Drawer
        title="Image Link"
        actions={{
          cancel: {
            label: 'Cancel',
            action: () => onCancel(),
          },
          confirm: {
            label: 'Confirm',
            action: () =>
              onConfirm({
                url: url,
                alignment: align,
                rawContentState: convertToRaw(
                  inputValueState.editorState.getCurrentContent()
                ),
              }),
          },
        }}
      >
        <Label>連結</Label>
        <TextInput
          placeholder="圖片連結"
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <AlignSelector
          align={align}
          options={ImageAlignOptions}
          onChange={onAlignSelectChange as (val: string) => void}
          onOpen={onAlignSelectOpen}
        />
        <Label>圖說</Label>
        <RichTextEditor
          decorators={[editableLinkDecorator]}
          disabledButtons={disabledButtons}
          editorState={inputValueState.editorState}
          onChange={(editorState: EditorState) => {
            setInputValueState({
              url: url,
              alignment: align,
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
  const { url, alignment, rawContentState } = data // eslint-disable-line

  const onChange = () => {
    onEditFinish()
    setIsEditorOpen(false)
    /*
    onEditFinish({
      entityKey,
      entityData: Object.assign({ alignment: alignment }),
    })
    */
  }

  return (
    <>
      {isEditorOpen && (
        <ImageLinkEditor
          isOpen={isEditorOpen}
          inputValue={{
            url: url,
            alignment: alignment,
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
