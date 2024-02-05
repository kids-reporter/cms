import React from 'react'
import { EditorState, RichUtils } from 'draft-js'

export const ANCHOR_FIELD_NAME = 'ANCHOR'

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
  const { isActive, editorState: editorStateOfOuterEditor, onChange } = props

  const promptForTOC = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    props.onEditStart()

    const selection = editorStateOfOuterEditor.getSelection()
    if (!selection.isCollapsed()) {
      const contentState = editorStateOfOuterEditor.getCurrentContent()
      const startKey = selection.getStartKey()
      const block = contentState.getBlockForKey(startKey)
      const selectedText = block
        .getText()
        .slice(selection.getStartOffset(), selection.getEndOffset())
      const contentStateWithEntity = contentState.createEntity(
        ANCHOR_FIELD_NAME,
        'IMMUTABLE',
        {
          tocID: `${block.getKey()}-${selection.getStartOffset()}-${selection.getEndOffset()}`,
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

  const removeTOC = () => {
    const selection = editorStateOfOuterEditor.getSelection()
    if (!selection.isCollapsed()) {
      onChange(toggleEntity(editorStateOfOuterEditor, selection, null))
    }
    props.onEditFinish()
  }

  return (
    <div
      className={props.className}
      onMouseDown={isActive ? removeTOC : promptForTOC}
      title="索引"
    >
      <span>索</span>
    </div>
  )
}
