import React from 'react'
import { EditorState, RichUtils } from 'draft-js'

export const TOCButton = (props: {
  className?: string
  isActive: boolean
  editorState: EditorState
  onChange: (arg0: EditorState) => void
}) => {
  const { isActive, editorState, onChange } = props

  const promptForTOC = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const selection = editorState.getSelection()
    console.log(selection)

    /*
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'TOC',
      'MUTABLE',
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      })
    */
  }

  const removeTOC = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null))
    }
  }

  return (
    <React.Fragment>
      <div
        className={props.className}
        onMouseDown={isActive ? removeTOC : promptForTOC}
        title="索引"
      >
        {'索'}
      </div>
    </React.Fragment>
  )
}
