import React from 'react'
import {
  Editor,
  EditorState,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js'
import { atomicBlockRenderer } from './block-renderer-fn'
import { blockRenderMap } from './block-render-map'
import { decorators } from './entity-decorators/index'

const customStyleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}

const blockRendererFn = (block: any) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

type DraftRendererProps = {
  rawContentBlock: RawDraftContentState
}

export function DraftRenderer({ rawContentBlock }: DraftRendererProps) {
  const contentState = convertFromRaw(rawContentBlock)
  const editorState = EditorState.createWithContent(contentState, decorators)

  return (
    <Editor
      editorState={editorState}
      customStyleMap={customStyleMap}
      blockRenderMap={blockRenderMap}
      blockRendererFn={blockRendererFn}
      readOnly
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange={() => {}}
    />
  )
}
