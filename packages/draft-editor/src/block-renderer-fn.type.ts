import React from 'react'
import { ContentBlock, ContentState, EditorState } from 'draft-js'

type RenderBasicEditor = (propsOfBasicEditor: {
  onChange: (es: EditorState) => void
  editorState: EditorState
}) => React.ReactNode

export type AtomicBlockProps<T> = {
  block: ContentBlock
  blockProps: {
    onEditStart: () => void
    onEditFinish: (params?: { entityKey?: string; entityData?: T }) => void
    renderBasicEditor?: RenderBasicEditor
  }
  contentState: ContentState
}
