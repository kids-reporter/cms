import Immutable from 'immutable'
import React from 'react'
import styled from 'styled-components'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import { mediaQuery } from '../utils/media-query'

export const Paragraph = styled.div`
  width: 100%;
  max-width: 700px;
  font-size: 18px;
  font-weight: 500;
  color: #3a4f66;
  letter-spacing: 0.9px;
  line-height: 2;
  margin: 0 auto;

  ${mediaQuery.smallOnly} {
    padding-left: 15px;
    padding-right: 15px;
  }

  > div[data-block='true'] {
    margin-bottom: 27px;
  }
`

export const Heading = styled.div`
  font-weight: 700;
  line-height: 1.5;
  color: #232323;
  width: 100%;
  max-width: 700px;
  margin: 45px auto 20px auto;

  h2,
  h3,
  h4,
  h5 {
    margin: 0;
  }

  h2 {
    font-size: 35px;
  }

  h3 {
    font-size: 30px;
  }

  h4 {
    font-size: 25px;
  }

  h5 {
    font-size: 20px;
  }

  ${mediaQuery.smallOnly} {
    padding-left: 15px;
    padding-right: 15px;
  }
`

export const List = styled.ol`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 27px auto;
  font-size: 18px;
  line-height: 2;
  letter-spacing: 0.9px;
  color: #3a4f66;

  > li {
    margin-bottom: 6px;
  }
`

const _blockRenderMap = Immutable.Map({
  atomic: {
    element: 'div',
  },
  'header-two': {
    element: 'h2',
    wrapper: <Heading />,
  },
  'header-three': {
    element: 'h3',
    wrapper: <Heading />,
  },
  'header-four': {
    element: 'h4',
    wrapper: <Heading />,
  },
  'header-five': {
    element: 'h5',
    wrapper: <Heading />,
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: <List />,
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: <List as="ul" />,
  },
  unstyled: {
    element: 'div',
    wrapper: <Paragraph />,
  },
})

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(_blockRenderMap)
