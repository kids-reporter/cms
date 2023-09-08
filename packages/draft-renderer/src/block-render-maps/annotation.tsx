import Immutable from 'immutable'
import React from 'react'
import styled from 'styled-components'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import { Paragraph, Heading, List } from './article-content'

const HeadingForAnnotation = styled(Heading)`
  margin: 0 auto 27px auto;
`

const ListForAnnotation = styled(List)`
  li {
    font-size: 16px;
  }
`

const ParagraphForAnnotation = styled(Paragraph)`
  /* overwrite css */
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
`

const _blockRenderMapForAnnotation = Immutable.Map({
  atomic: {
    element: 'div',
  },
  'header-four': {
    element: 'h4',
    wrapper: <HeadingForAnnotation />,
  },
  'header-five': {
    element: 'h5',
    wrapper: <HeadingForAnnotation />,
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: <ListForAnnotation />,
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: <ListForAnnotation as="ul" />,
  },
  unstyled: {
    element: 'div',
    wrapper: <ParagraphForAnnotation />,
  },
})

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  _blockRenderMapForAnnotation
)
