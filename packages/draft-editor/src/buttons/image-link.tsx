import React, { useState } from 'react'
import {
  AtomicBlockUtils,
  EditorState,
  RawDraftContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'
import buttonNames from './bt-names'
import { RichTextEditor } from '../rich-text-editor'
import { editableLinkDecorator } from '../entity-decorators/link'

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

export function ImageLinkButton(props: {
  editorState: EditorState
  onChange: (param: EditorState) => void
  className?: string
}) {
  const { editorState, onChange: onEditorStateChange, className } = props

  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const promptForImageLinkEditor = () => {
    setIsEditorOpen(true)
  }

  const onChange = ({
    type,
    rawContentState,
  }: {
    type: 'image-link'
    rawContentState: RawDraftContentState
  }) => {
    const contentState = editorState.getCurrentContent()

    // create an InfoBox entity
    const contentStateWithEntity = contentState.createEntity(
      'IMAGELINK',
      'IMMUTABLE',
      {
        type,
        rawContentState,
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    //The third parameter here is a space string, not an empty string
    //If you set an empty string, you will get an error: Unknown DraftEntity key: null
    onEditorStateChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    )
    setIsEditorOpen(false)
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

      <div className={className} onClick={promptForImageLinkEditor}>
        <i className="far fa-image"></i>
        <span> ImageLink</span>
      </div>
    </>
  )
}
