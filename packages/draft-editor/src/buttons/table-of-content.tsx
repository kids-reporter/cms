import React from 'react'
import { EditorState, RichUtils } from 'draft-js'

export function TOCButton(props: {
  className?: string
  isActive: boolean
  editorState: EditorState
  onChange: (arg0: EditorState) => void
  onEditStart: () => void
  onEditFinish: () => void
}) {
  const { isActive, editorState, onChange } = props

  const promptForLink = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    props.onEditStart()
  }

  const removeLink = () => {
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
        onMouseDown={isActive ? removeLink : promptForLink}
      >
        {'標'}
      </div>
    </React.Fragment>
  )
}
