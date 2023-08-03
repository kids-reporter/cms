import React, { useState } from 'react'
import buttonNames from './bt-names'
import styled from 'styled-components'
import {
  AtomicBlockUtils,
  DraftDecoratorType,
  EditorState,
  RawDraftContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { RichTextEditorProps } from '../draft-editor.type'
import { TextInput } from '@keystone-ui/fields'

const disabledButtons = [
  buttonNames.h2,
  buttonNames.h3,
  buttonNames.code,
  buttonNames.codeBlock,
  buttonNames.blockquote,
  buttonNames.annotation,
  buttonNames.embed,
  buttonNames.infoBox,
  buttonNames.slideshow,
]

const TitleInput = styled(TextInput)`
  margin-top: 30px;
  margin-bottom: 10px;
`

type InfoBoxInputType = {
  title?: string
  rawContentState?: RawDraftContentState
  isOpen: boolean
  onChange: ({
    title,
    rawContentState,
  }: {
    title: string
    rawContentState: RawDraftContentState
  }) => void
  onCancel: () => void
  Editor: React.ComponentType<RichTextEditorProps>
  decorator: DraftDecoratorType
}

export function InfoBoxInput(props: InfoBoxInputType) {
  const {
    isOpen,
    onChange,
    onCancel,
    title,
    rawContentState,
    Editor,
    decorator,
  } = props
  const initialInputValue = {
    title: title || '',
    // create an `editorState` from raw content state object
    editorState: EditorState.createWithContent(
      convertFromRaw(rawContentState || { blocks: [], entityMap: {} }),
      decorator
    ),
  }

  const [inputValue, setInputValue] = useState(initialInputValue)

  const clearInputValue = () => {
    setInputValue(initialInputValue)
  }

  return (
    <DrawerController isOpen={isOpen}>
      <Drawer
        title={`Insert Info Box`}
        actions={{
          cancel: {
            label: 'Cancel',
            action: () => {
              clearInputValue()
              onCancel()
            },
          },
          confirm: {
            label: 'Confirm',
            action: () => {
              onChange({
                title: inputValue.title,
                // convert `contentState` of the `editorState` into raw content state object
                rawContentState: convertToRaw(
                  inputValue.editorState.getCurrentContent()
                ),
              })
              clearInputValue()
            },
          },
        }}
      >
        <TitleInput
          onChange={(e) =>
            setInputValue({
              title: e.target.value,
              editorState: inputValue.editorState,
            })
          }
          type="text"
          placeholder="Title"
          value={inputValue.title}
        />
        <Editor
          disabledButtons={disabledButtons}
          editorState={inputValue.editorState}
          onChange={(editorState: EditorState) => {
            setInputValue({
              title: inputValue.title,
              editorState,
            })
          }}
        />
      </Drawer>
    </DrawerController>
  )
}

type InfoBoxButtonProps = {
  className?: string
  editorState: EditorState
  onChange: (param: EditorState) => void
}

export function createInfoBoxButton({
  InnerEditor,
  decorator,
}: {
  InnerEditor: React.ComponentType<RichTextEditorProps>
  decorator: DraftDecoratorType
}) {
  return function InfoBoxButton(props: InfoBoxButtonProps) {
    const [toShowInput, setToShowInput] = useState(false)
    const { className, editorState, onChange: onEditorStateChange } = props

    const onChange = ({
      title,
      rawContentState,
    }: {
      title: string
      rawContentState: RawDraftContentState
    }) => {
      const contentState = editorState.getCurrentContent()

      // create an InfoBox entity
      const contentStateWithEntity = contentState.createEntity(
        'INFOBOX',
        'IMMUTABLE',
        {
          title,
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
      setToShowInput(false)
    }

    return (
      <React.Fragment>
        <InfoBoxInput
          Editor={InnerEditor}
          decorator={decorator}
          onChange={onChange}
          onCancel={() => {
            setToShowInput(false)
          }}
          isOpen={toShowInput}
        />
        <div
          className={className}
          onClick={() => {
            setToShowInput(true)
          }}
        >
          <i className="far"></i>
          <span>InfoBox</span>
        </div>
      </React.Fragment>
    )
  }
}
