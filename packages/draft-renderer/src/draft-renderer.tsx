import React from 'react'
import {
  Editor,
  EditorState,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js'
import { atomicBlockRenderer } from './block-renderer-fn'
import {
  blockRenderMap,
  blockRenderMapForIntroduction,
} from './block-render-map'
import { decorator } from './entity-decorators/index'
import { ThemeColorEnum, ThemeColorType } from './utils/index'
import { ThemeProvider } from 'styled-components'

const blockRendererFn = (block: any) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

type DraftRendererProps = {
  themeColor: ThemeColorType
  rawContentState: RawDraftContentState
}

function DraftRenderer({
  rawContentState,
  themeColor = ThemeColorEnum.RED,
}: DraftRendererProps) {
  const contentState = convertFromRaw(rawContentState)
  const editorState = EditorState.createWithContent(contentState, decorator)

  return (
    <ThemeProvider
      theme={{
        themeColor,
      }}
    >
      <Editor
        editorState={editorState}
        blockRenderMap={blockRenderMap}
        blockRendererFn={blockRendererFn}
        readOnly
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
      />
    </ThemeProvider>
  )
}

const ArticleBodyDraftRenderer = DraftRenderer

function ArticleIntroductionDraftRenderer({
  rawContentState,
  themeColor = ThemeColorEnum.RED,
}: DraftRendererProps) {
  const contentState = convertFromRaw(rawContentState)
  const editorState = EditorState.createWithContent(contentState, decorator)

  return (
    <ThemeProvider
      theme={{
        themeColor,
      }}
    >
      <Editor
        editorState={editorState}
        blockRenderMap={blockRenderMapForIntroduction}
        readOnly
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
      />
    </ThemeProvider>
  )
}

export {
  DraftRenderer,
  ArticleBodyDraftRenderer,
  ArticleIntroductionDraftRenderer,
}
