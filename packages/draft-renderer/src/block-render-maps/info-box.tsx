import Immutable from 'immutable'
import React from 'react'
import styled, { css } from 'styled-components'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import { Paragraph, Heading, List } from './article-content'

const HeadingForInfoBox = styled(Heading)`
  margin-top: 30px;
  margin-bottom: 30px;
`

const ListForInfoBox = styled(List)`
  li {
    font-size: 16px;
  }
`

const ParagraphForInfoBox = styled(Paragraph)`
  /* overwrite css */
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
`

const Atomic = styled.div`
  /* reset figure default styles */
  figure {
    margin: 0;
  }

  /* hide last empty block which immediately follows an atomic block */
  & + ${Paragraph}:last-of-type {
    line-height: 0;
    margin-bottom: 0;
  }
`

const _blockRenderMapForAnnotation = Immutable.Map({
  atomic: {
    element: 'div',
    wrapper: <Atomic />,
  },
  'header-four': {
    element: 'h4',
    wrapper: <HeadingForInfoBox />,
  },
  'header-five': {
    element: 'h5',
    wrapper: <HeadingForInfoBox />,
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: <ListForInfoBox />,
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: <ListForInfoBox as="ul" />,
  },
  unstyled: {
    element: 'div',
    wrapper: <ParagraphForInfoBox />,
  },
})

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  _blockRenderMapForAnnotation
)

const dividerStyles = css`
  content: '';
  width: 100%;
  height: 12px;
  display: block;
  background-image: url(https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/js/components/rpjr-box/box2_768.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const HeadingForInfoBoxWithHeaderBorder = styled(HeadingForInfoBox)`
  h4 {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  &::before {
    ${dividerStyles}
  }

  &::after {
    ${dividerStyles}
  }
`

export const blockRenderMapForInfoBoxWithHeaderBorder = blockRenderMap.merge(
  Immutable.Map({
    'header-four': {
      element: 'h4',
      wrapper: <HeadingForInfoBoxWithHeaderBorder />,
    },
  })
)
