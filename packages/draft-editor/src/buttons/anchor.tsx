import React, { useState } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { ENTITY } from '@kids-reporter/draft-renderer'
import { AnchorLabelEditor } from '../entity-decorators/anchor'

type AnchorButtonProps = {
  className?: string
  isActive: boolean
  editorState: EditorState
  onChange: (arg0: EditorState) => void
  onEditStart: () => void
  onEditFinish: () => void
}

export const AnchorButton = (props: AnchorButtonProps) => {
  const toggleEntity = RichUtils.toggleLink
  const { isActive, editorState, onChange } = props
  const [toShowInput, setToShowInput] = useState(false)

  const promptForAnchor = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      props.onEditStart()
      setToShowInput(true)
    }
  }

  const confirmAnchor = (anchorLabelValue: string) => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      ENTITY.Anchor,
      'MUTABLE',
      {
        anchorID: anchorLabelValue,
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
    props.onEditFinish()
  }

  const removeAnchor = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(toggleEntity(editorState, selection, null))
    }
    setToShowInput(false)
    props.onEditFinish()
  }

  return (
    <>
      {toShowInput && (
        <AnchorLabelEditor
          isOpen={toShowInput}
          anchorLabelValue={''}
          onConfirm={confirmAnchor}
          onCancel={removeAnchor}
        />
      )}
      <div
        className={props.className}
        onMouseDown={isActive ? removeAnchor : promptForAnchor}
        title="錨點"
      >
        <span>錨</span>
      </div>
    </>
  )
}
