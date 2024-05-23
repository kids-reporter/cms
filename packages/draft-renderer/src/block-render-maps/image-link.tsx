import Immutable from 'immutable'
import React from 'react'
import styled from 'styled-components'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import { Atomic, Paragraph } from './article-content'

const ParagraphForInfoBox = styled(Paragraph)`
  /* overwrite css */
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

const _blockRenderMapForAnnotation = Immutable.Map({
  atomic: {
    element: 'div',
    wrapper: <Atomic />,
  },
  unstyled: {
    element: 'div',
    wrapper: <ParagraphForInfoBox />,
  },
})

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  _blockRenderMapForAnnotation
)
