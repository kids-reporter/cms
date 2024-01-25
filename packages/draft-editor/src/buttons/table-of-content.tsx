import React from 'react'
import { EditorState, RichUtils } from 'draft-js'

export function TOCButton(props: {
  className?: string
  isActive: boolean
  editorState: EditorState
  onChange: (arg0: EditorState) => void
}) {
  const { isActive, editorState, onChange } = props

  const promptForTOC = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
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
