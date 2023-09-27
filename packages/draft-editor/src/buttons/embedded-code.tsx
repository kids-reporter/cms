import React, { useState } from 'react'
import { AtomicBlockUtils, EditorState } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput, TextArea } from '@keystone-ui/fields'

export function EmbeddedCodeButton(props) {
  const { editorState, onChange, className } = props

  const [toShowInput, setToShowInput] = useState(false)
  const [inputValue, setInputValue] = useState({
    caption: '',
    embeddedCode: '',
  })

  const promptForInput = () => {
    setToShowInput(true)
    setInputValue({
      caption: '',
      embeddedCode: '',
    })
  }

  const confirmInput = () => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'EMBEDDEDCODE',
      'IMMUTABLE',
      inputValue
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    // The third parameter here is a space string, not an empty string
    // If you set an empty string, you will get an error: Unknown DraftEntity key: null
    onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))

    setToShowInput(false)
    setInputValue({
      caption: '',
      embeddedCode: '',
    })
  }

  const input = (
    <DrawerController isOpen={toShowInput}>
      <Drawer
        title="鑲嵌程式碼（Embedded Code）"
        //isOpen={toShowInput}
        actions={{
          cancel: {
            label: 'Cancel',
            action: () => {
              setToShowInput(false)
            },
          },
          confirm: {
            label: 'Confirm',
            action: confirmInput,
          },
        }}
      >
        <TextArea
          onChange={(e) =>
            setInputValue({
              caption: inputValue.caption,
              embeddedCode: e.target.value,
            })
          }
          placeholder="Embedded Code"
          type="text"
          value={inputValue.embeddedCode}
          style={{ marginBottom: '30px' }}
        />
        <TextInput
          onChange={(e) =>
            setInputValue({
              caption: e.target.value,
              embeddedCode: inputValue.embeddedCode,
            })
          }
          type="text"
          placeholder="Caption"
          value={inputValue.caption}
          style={{ marginBottom: '10px', marginTop: '30px' }}
        />
      </Drawer>
    </DrawerController>
  )

  return (
    <React.Fragment>
      {input}
      <div
        onClick={() => {
          promptForInput()
        }}
        className={className}
      >
        <i className="far"></i>
        <span>Embed</span>
      </div>
    </React.Fragment>
  )
}
