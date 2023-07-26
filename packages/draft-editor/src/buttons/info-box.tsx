import React, { useState } from 'react'
import {
  AtomicBlockUtils,
  EditorState,
  RawDraftContentState,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'
import styled from 'styled-components'

const TitleInput = styled(TextInput)`
  margin-top: 30px;
  margin-bottom: 10px;
`

export type RenderBasicEditor = (propsOfBasicEditor: {
  onChange: (es: EditorState) => void
  editorState: EditorState
}) => React.ReactNode

type InfoBoxInputType = {
  title?: string
  rawContentStateForInfoBoxEditor?: RawDraftContentState
  isOpen: boolean
  onChange: ({
    title,
    rawContentState,
  }: {
    title: string
    rawContentState: RawDraftContentState
  }) => void
  onCancel: () => void
  renderBasicEditor: RenderBasicEditor
  decorators?: CompositeDecorator
}

export function InfoBoxInput(props: InfoBoxInputType) {
  const {
    isOpen,
    onChange,
    onCancel,
    title,
    rawContentStateForInfoBoxEditor,
    renderBasicEditor,
    decorators,
  } = props
  const rawContentState = rawContentStateForInfoBoxEditor || {
    blocks: [],
    entityMap: {},
  }
  const initialInputValue = {
    title: title || '',
    // create an `editorState` from raw content state object
    editorStateOfBasicEditor: EditorState.createWithContent(
      convertFromRaw(rawContentState),
      decorators
    ),
  }

  const [inputValue, setInputValue] = useState(initialInputValue)

  const clearInputValue = () => {
    setInputValue(initialInputValue)
  }

  const basicEditorJsx = renderBasicEditor({
    editorState: inputValue.editorStateOfBasicEditor,
    onChange: (editorStateOfBasicEditor: EditorState) => {
      setInputValue({
        title: inputValue.title,
        editorStateOfBasicEditor,
      })
    },
  })

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
                  inputValue.editorStateOfBasicEditor.getCurrentContent()
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
              editorStateOfBasicEditor: inputValue.editorStateOfBasicEditor,
            })
          }
          type="text"
          placeholder="Title"
          value={inputValue.title}
        />
        {basicEditorJsx}
      </Drawer>
    </DrawerController>
  )
}

type InfoBoxButtonProps = {
  className?: string
  editorState: EditorState
  onChange: (param: EditorState) => void
  renderBasicEditor: RenderBasicEditor
  decorators: CompositeDecorator
}

export function InfoBoxButton(props: InfoBoxButtonProps) {
  const [toShowInput, setToShowInput] = useState(false)
  const {
    className,
    editorState,
    onChange: onEditorStateChange,
    renderBasicEditor,
  } = props

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
        renderBasicEditor={renderBasicEditor}
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
