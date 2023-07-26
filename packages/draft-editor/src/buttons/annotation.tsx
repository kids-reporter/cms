import React, { useState } from 'react'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'

export function AnnotationButton(props) {
  const toggleEntity = RichUtils.toggleLink
  const {
    isActive,
    editorState,
    onChange,
    renderBasicEditor,
    decorators,
  } = props
  const [toShowInput, setToShowInput] = useState(false)
  const [inputValue, setInputValue] = useState({
    editorStateOfBasicEditor: EditorState.createEmpty(decorators),
  })

  const promptForAnnotation = (e) => {
    e.preventDefault()
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      setToShowInput(true)
    }
  }

  const confirmAnnotation = () => {
    const contentState = editorState.getCurrentContent()
    const rawContentState = convertToRaw(
      inputValue.editorStateOfBasicEditor.getCurrentContent()
    )
    const contentStateWithEntity = contentState.createEntity(
      'ANNOTATION',
      'MUTABLE',
      {
        rawContentState,
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    onChange(
      toggleEntity(newEditorState, newEditorState.getSelection(), entityKey)
    )

    setToShowInput(false)
    setInputValue({
      editorStateOfBasicEditor: EditorState.createEmpty(decorators),
    })
  }

  const removeAnnotation = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(toggleEntity(editorState, selection, null))
    }
    setToShowInput(false)
    setInputValue({
      editorStateOfBasicEditor: EditorState.createEmpty(decorators),
    })
  }

  const basicEditorJsx = renderBasicEditor({
    editorState: inputValue.editorStateOfBasicEditor,
    onChange: (editorStateOfBasicEditor: EditorState) => {
      setInputValue({
        editorStateOfBasicEditor,
      })
    },
  })

  const urlInput = (
    <DrawerController isOpen={toShowInput}>
      <Drawer
        title="Insert Annotation"
        actions={{
          cancel: {
            label: 'Cancel',
            action: removeAnnotation,
          },
          confirm: {
            label: 'Confirm',
            action: confirmAnnotation,
          },
        }}
      >
        {basicEditorJsx}
      </Drawer>
    </DrawerController>
  )

  return (
    <React.Fragment>
      {urlInput}
      <div
        className={props.className}
        onMouseDown={isActive ? removeAnnotation : promptForAnnotation}
      >
        <i className="far"></i>
        <span>Annotation</span>
      </div>
    </React.Fragment>
  )
}
