import React from 'react'
import styled from 'styled-components'
import {
  ContentBlock,
  ContentState,
  Editor,
  EditorState,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js'
import blockRenderMaps from '../block-render-maps/index'
import { decorator } from '../entity-decorators/index'
import { mediaQuery } from '../utils/media-query'

const Figure = styled.figure`
  width: 100%;
`

/* TODO: caption style
const FigureCaption = styled.figcaption`
  width: fit-content;
  max-width: 100%;
  font-size: ${({ theme }) =>
    theme?.fontSizeLevel === 'large' ? '18px' : '14px'};
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;
  color: rgb(58, 79, 102);
  letter-spacing: 0.7px;
  line-height: 28px;
  text-align: center;
`
*/

const Img = styled.img`
  width: 100%;
  object-fit: contain;
`

type ImageLinkBlockProps = {
  className?: string
  data: {
    url: string
    alignment?: string
    rawContentState: RawDraftContentState
  }
}

export const ImageLinkBlock = ({
  className = '',
  data,
}: ImageLinkBlockProps) => {
  const { url, rawContentState } = data
  const contentState = convertFromRaw(rawContentState)
  const editorState = EditorState.createWithContent(contentState, decorator)
  const blockRenderMap = blockRenderMaps.infoBox.default
  // const aspectRatio = '16/9'

  // TODO: fallback img, desc style
  const imgBlock = (
    <Figure className={className}>
      <Img alt={''} src={url} />
      <Editor
        blockRenderMap={blockRenderMap}
        blockRendererFn={blockRendererFn}
        editorState={editorState}
        readOnly
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
      />
    </Figure>
  )

  return imgBlock
}

type ImageBlockInArticleBodyProps = ImageLinkBlockProps

const ArticleBodyContainer = styled.div<{ $alignment?: string }>`
  /* reset browser default styles */
  figure {
    margin: 0;
  }

  max-width: 72vw;
  margin: 0 auto 27px auto;

  ${mediaQuery.smallOnly} {
    max-width: 100%;
  }

  ${mediaQuery.largeOnly} {
    max-width: 1000px;
  }

  ${(props) => {
    switch (props.$alignment) {
      case 'paragraph-width':
        return `
          ${mediaQuery.mediumAbove} {
            max-width: 700px;
          }
        `
      case 'right':
        return `
          ${mediaQuery.mediumAbove} {
            width: 361px;
            float: right;
            margin: 5px 0px 5px 27px;
          }
        `
      case 'left':
        return `
          ${mediaQuery.mediumAbove} {
            width: 361px;
            float: left;
            margin: 5px 27px 5px 0px;
          }
        `
    }
  }}
`

export const ImageLinkInArticleBody = ({
  className = '',
  data,
}: ImageBlockInArticleBodyProps) => {
  return (
    <ArticleBodyContainer $alignment={data.alignment} className={className}>
      <ImageLinkBlock data={data} />
    </ArticleBodyContainer>
  )
}

const InfoBoxContainer = styled.div<{ $alignment?: string }>`
  /* reset browser default styles */
  figure {
    margin: 0 0 27px 0;
  }

  ${(props) => {
    switch (props.$alignment) {
      case 'left': {
        return `
          width: 200px;
          float: left;
          margin: 5px 27px 5px 0px;
        `
      }
      case 'right': {
        return `
          width: 200px;
          float: right;
          margin: 5px 0px 5px 27px;
        `
      }
      case 'paragraph-width':
      default: {
        return `
        width: fit-content;
        margin-left: auto; 
        margin-right: auto;
        `
      }
    }
  }}
`

export const ImageLinkInInfoBox = ({
  className = '',
  data,
}: ImageBlockInArticleBodyProps) => {
  return (
    <InfoBoxContainer $alignment={data.alignment} className={className}>
      <ImageLinkBlock data={data} />
    </InfoBoxContainer>
  )
}

function AtomicBlock(props: {
  contentState: ContentState
  block: ContentBlock
}) {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))

  const entityType = entity.getType()
  const entityData = entity.getData()

  switch (entityType) {
    case 'IMAGE_LINK': {
      return ImageLinkInInfoBox({ data: entityData })
    }
  }
  return null
}

const blockRendererFn = (block: ContentBlock) => {
  return block.getType() === 'atomic'
    ? {
        component: AtomicBlock,
        editable: false,
      }
    : null
}
