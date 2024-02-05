import React from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { ANCHOR_FIELD_NAME } from '@kids-reporter/draft-renderer'

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

  const promptForAnchor = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    props.onEditStart()

    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent()
      const startKey = selection.getStartKey()
      const block = contentState.getBlockForKey(startKey)
      const selectedText = block
        .getText()
        .slice(selection.getStartOffset(), selection.getEndOffset())
      const contentStateWithEntity = contentState.createEntity(
        ANCHOR_FIELD_NAME,
        'IMMUTABLE',
        {
          anchorID: `${block.getKey()}-${selection.getStartOffset()}-${selection.getEndOffset()}`,
          anchorLabel: selectedText,
        }
      )
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      })

      onChange(
        toggleEntity(newEditorState, newEditorState.getSelection(), entityKey)
      )
    }

    props.onEditFinish()
  }

  const removeAnchor = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(toggleEntity(editorState, selection, null))
    }
    props.onEditFinish()
  }

  return (
    <div
      className={props.className}
      onMouseDown={isActive ? removeAnchor : promptForAnchor}
      title="索引"
    >
      <span>索</span>
    </div>
  )
}
