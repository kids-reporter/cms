import {
  ContentBlock,
  ContentState,
  Editor,
  EditorState,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js'
import React from 'react'
import styled from 'styled-components'
import {
  blockRenderMapForInfoBox,
  blockRenderMapForInfoBoxWithHeaderBorder,
} from '../block-render-map'
import { ImageInInfoBox } from '../block-renderers/image-block'
import { decorator } from '../entity-decorators/index'
import { ThemeColorEnum } from '../utils/index'

enum InfoBoxType {
  newsChargeStation = 'news-charge-station',
  headerBorder = 'header-border',
  boxBorder = 'box-border',
}

type InfoBoxBlockProps = {
  className?: string
  data: {
    type:
      | InfoBoxType.boxBorder
      | InfoBoxType.headerBorder
      | InfoBoxType.newsChargeStation
    rawContentState: RawDraftContentState
  }
}

const NewsChargeStationContainer = styled.div`
  padding: 40px;
  background-color: #fffcf4;
  position: relative;
  border-radius: 30px;

  &::before {
    content: '';
    width: 300px;
    height: 80px;
    /* TODO: change image url */
    background-image: url(https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/js/components/rpjr-box/newsChargeStation.svg);
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
  }
`

function NewsChargeStation({ children }: { children: React.ReactNode }) {
  return <NewsChargeStationContainer>{children}</NewsChargeStationContainer>
}

const HeaderBorderContainer = styled.div`
  ${({ theme }) => {
    let logoColor
    let bgColor
    switch (theme?.themeColor) {
      case ThemeColorEnum.YELLOW: {
        logoColor = 'red'
        bgColor = '#fff0d2'
        break
      }
      case ThemeColorEnum.RED: {
        logoColor = 'blue'
        bgColor = '#ffd2d2'
        break
      }
      case ThemeColorEnum.BLUE:
      default: {
        logoColor = 'yellow'
        bgColor = '#3a4f66'
        break
      }
    }
    return `
      background-color: ${bgColor};
      &::before {
        background-image: url(https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/js/components/rpjr-box/box2_${logoColor}.png);
      }
      `
  }}

  padding: 40px;
  position: relative;
  border-radius: 30px;

  &::before {
    content: '';
    width: 120px;
    height: 120px;
    background-size: contain;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`

function HeaderBorder({ children }: { children: React.ReactNode }) {
  return <HeaderBorderContainer>{children}</HeaderBorderContainer>
}

const BoxBorderContainer = styled.div`
  padding: 40px;
  background-color: #ebebeb;
  position: relative;
  border-radius: 30px;
  border: 3px solid #232323;
  overflow: hidden;

  ${({ theme }) => `
    &::before {
      background-image: url(https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/js/components/rpjr-box/box2_${theme?.themeColor}-b.png);
    }`}

  &::before {
    content: '';
    width: 100px;
    height: 100px;
    background-size: contain;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`

function BoxBorder({ children }: { children: React.ReactNode }) {
  return <BoxBorderContainer>{children}</BoxBorderContainer>
}

const ArticleBodyContainer = styled.div`
  max-width: 700px;
  margin: 60px auto;
`

const EditorContainer = styled.div`
  position: relative;
`

export function InfoBoxInArticleBody({ className, data }: InfoBoxBlockProps) {
  const { type, rawContentState } = data
  const contentState = convertFromRaw(rawContentState)
  const editorState = EditorState.createWithContent(contentState, decorator)
  let Component
  let blockRenderMap = blockRenderMapForInfoBox
  switch (type) {
    case InfoBoxType.headerBorder: {
      Component = HeaderBorder
      blockRenderMap = blockRenderMapForInfoBoxWithHeaderBorder
      break
    }
    case InfoBoxType.boxBorder: {
      Component = BoxBorder
      break
    }
    case InfoBoxType.newsChargeStation:
    default: {
      Component = NewsChargeStation
      break
    }
  }
  return (
    <ArticleBodyContainer className={className}>
      <Component>
        <EditorContainer>
          <Editor
            blockRenderMap={blockRenderMap}
            blockRendererFn={blockRendererFn}
            editorState={editorState}
            readOnly
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
          />
        </EditorContainer>
      </Component>
    </ArticleBodyContainer>
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
    case 'IMAGE': {
      return ImageInInfoBox({ data: entityData })
    }
  }
  return null
}

function blockRendererFn(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: AtomicBlock,
      editable: false,
    }
  }

  return null
}
