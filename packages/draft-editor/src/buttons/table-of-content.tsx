import React from 'react'
import { EditorState, RichUtils } from 'draft-js'

export const TOCButton = (props: {
  className?: string
  isActive: boolean
  editorState: EditorState
  onChange: (arg0: EditorState) => void
  onEditStart: () => void
  onEditFinish: () => void
}) => {
  const { isActive, editorState, onChange } = props

  const promptForTOC = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    props.onEditStart()
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent()
      const anchorKey = selection.getAnchorKey()
      const currentBlock = contentState.getBlockForKey(anchorKey)
      const start = selection.getStartOffset()
      const end = selection.getEndOffset()
      const selectedText = currentBlock.getText().slice(start, end)
      const contentStateWithEntity = contentState.createEntity(
        'TOC',
        'IMMUTABLE',
        { tocLabel: selectedText }
      )
      onChange(
        RichUtils.toggleLink(
          EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
          }),
          selection,
          contentStateWithEntity.getLastCreatedEntityKey()
        )
      )
    }
    props.onEditFinish()
  }

  const removeTOC = () => {
    props.onEditStart()
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null))
    }
    props.onEditFinish()
  }

  return (
    <React.Fragment>
      <div
        className={props.className}
        onMouseDown={isActive ? removeTOC : promptForTOC}
        title="目錄"
      >
        {'目'}
      </div>
    </React.Fragment>
  )
}
