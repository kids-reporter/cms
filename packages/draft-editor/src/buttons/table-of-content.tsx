import React, { useState } from 'react'
import styled from 'styled-components'
import { DraftDecoratorType, EditorState, RichUtils } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'

const StyledTextInput = styled(TextInput)`
  margin: 10px;
`

type AnnotationButtonProps = {
  className?: string
  isActive: boolean
  editorState: EditorState
  onChange: (arg0: EditorState) => void
  onEditStart: () => void
  onEditFinish: () => void
}

export function createTOCButton({
  decorator,
}: {
  decorator: DraftDecoratorType
}): React.FC<AnnotationButtonProps> {
  return function AnnotationButton(props) {
    const toggleEntity = RichUtils.toggleLink
    const { isActive, editorState: editorStateOfOuterEditor, onChange } = props
    const [tocLabel, setTOCLabel] = useState('')
    const [toShowInput, setToShowInput] = useState(false)

    const promptForAnnotation = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      props.onEditStart()
      const selection = editorStateOfOuterEditor.getSelection()
      if (!selection.isCollapsed()) {
        // setToShowInput(true)
        const contentState = editorStateOfOuterEditor.getCurrentContent()
        const startKey = selection.getStartKey()
        const block = contentState.getBlockForKey(startKey)
        const selectedText = block
          .getText()
          .slice(selection.getStartOffset(), selection.getEndOffset())
        const contentStateWithEntity = contentState.createEntity(
          'TOC',
          'IMMUTABLE',
          {
            tocLabel: selectedText,
          }
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(editorStateOfOuterEditor, {
          currentContent: contentStateWithEntity,
        })

        onChange(
          toggleEntity(newEditorState, newEditorState.getSelection(), entityKey)
        )
      }
      props.onEditFinish()
    }

    const confirmAnnotation = () => {
      const contentState = editorStateOfOuterEditor.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity(
        'TOC',
        'IMMUTABLE',
        {
          tocLabel: 'aaa',
        }
      )
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newEditorState = EditorState.set(editorStateOfOuterEditor, {
        currentContent: contentStateWithEntity,
      })

      onChange(
        toggleEntity(newEditorState, newEditorState.getSelection(), entityKey)
      )

      setToShowInput(false)
      setInputValue({
        editorStateOfInnerEditor: EditorState.createEmpty(decorator),
      })
      props.onEditFinish()
    }

    const removeAnnotation = () => {
      const selection = editorStateOfOuterEditor.getSelection()
      if (!selection.isCollapsed()) {
        onChange(toggleEntity(editorStateOfOuterEditor, selection, null))
      }
      setToShowInput(false)
      setInputValue({
        editorStateOfInnerEditor: EditorState.createEmpty(decorator),
      })
      props.onEditFinish()
    }

    const input = (
      <DrawerController isOpen={toShowInput}>
        <Drawer
          title="註解"
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
          <StyledTextInput
            placeholder="目錄內顯示文字"
            value={tocLabel}
            onChange={(e) => {
              setTOCLabel(e.target.value)
            }}
            type="text"
          />
        </Drawer>
      </DrawerController>
    )

    return (
      <React.Fragment>
        {input}
        <div
          className={props.className}
          onMouseDown={isActive ? removeAnnotation : promptForAnnotation}
        >
          <i className="far"></i>
          <span>目</span>
        </div>
      </React.Fragment>
    )
  }
}
