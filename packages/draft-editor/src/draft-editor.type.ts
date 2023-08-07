import { EditorState } from 'draft-js'

export type RichTextEditorProps = {
  onChange: (editorState: EditorState) => void
  editorState: EditorState
  disabledButtons?: string[]
}
