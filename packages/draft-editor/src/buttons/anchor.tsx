import React, { useState } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { ENTITY } from '@kids-reporter/draft-renderer'
import { AnchorIDEditor } from '../entity-decorators/anchor'

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
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const promptForAnchor = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      props.onEditStart()
      setIsEditorOpen(true)
    }
  }

  const confirmAnchor = (anchorID: string) => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      ENTITY.Anchor,
      'MUTABLE',
      {
        anchorID: anchorID,
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    onChange(
      toggleEntity(newEditorState, newEditorState.getSelection(), entityKey)
    )

    setIsEditorOpen(false)
    props.onEditFinish()
  }

  const removeAnchor = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(toggleEntity(editorState, selection, null))
    }
    setIsEditorOpen(false)
    props.onEditFinish()
  }

  return (
    <>
      {isEditorOpen && (
        <AnchorIDEditor
          isOpen={isEditorOpen}
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
