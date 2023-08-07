import React from 'react'
import {
  Editor,
  EditorState,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js'
import { atomicBlockRenderer } from './block-renderer-fn'
import { blockRenderMap } from './block-render-map'
import { decorator } from './entity-decorators/index'

const blockRendererFn = (block: any) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

type DraftRendererProps = {
  rawContentState: RawDraftContentState
}

export function DraftRenderer({ rawContentState }: DraftRendererProps) {
  const contentState = convertFromRaw(rawContentState)
  const editorState = EditorState.createWithContent(contentState, decorator)

  return (
    <Editor
      editorState={editorState}
      blockRenderMap={blockRenderMap}
      blockRendererFn={blockRendererFn}
      readOnly
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange={() => {}}
    />
  )
}
