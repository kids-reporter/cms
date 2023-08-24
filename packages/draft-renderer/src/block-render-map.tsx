import Immutable from 'immutable'
import React from 'react'
import styled, { css } from 'styled-components'
import { DefaultDraftBlockRenderMap } from 'draft-js'
// @ts-ignore pkg does not contain ts header file
import mq from '@twreporter/core/lib/utils/media-query'

const Paragraph = styled.div`
  width: 100%;
  max-width: 700px;
  font-size: 18px;
  font-weight: 500;
  color: #3a4f66;
  letter-spacing: 0.9px;
  line-height: 2;
  margin: 0 auto;

  ${mq.mobileOnly`
    padding-left: 15px;
    padding-right: 15px;
  `}

  > div[data-block="true"] {
    margin-bottom: 27px;
  }
`

const Heading = styled.div`
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

  ${mq.mobileOnly`
    padding-left: 15px;
    padding-right: 15px;
  `}
`

const List = styled.ol`
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

const Atomic = styled.div`
  /* hide empty block which immediately follows atomic block */
  & + ${Paragraph} {
    > div[data-block='true']:first-child {
      line-height: 0;
      margin-bottom: 0;
    }
  }
`

const _blockRenderMap = Immutable.Map({
  atomic: {
    element: 'div',
    wrapper: <Atomic />,
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

const ParagraphForIntroduction = styled(Paragraph)`
  color: #575757;
`

const ListForIntroduction = styled(List)`
  color: #575757;
`

export const blockRenderMapForIntroduction = DefaultDraftBlockRenderMap.merge(
  Immutable.Map({
    'ordered-list-item': {
      element: 'li',
      wrapper: <ListForIntroduction />,
    },
    'unordered-list-item': {
      element: 'li',
      wrapper: <ListForIntroduction as="ul" />,
    },
    unstyled: {
      element: 'div',
      wrapper: <ParagraphForIntroduction />,
    },
  })
)

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

export const blockRenderMapForAnnotation = DefaultDraftBlockRenderMap.merge(
  _blockRenderMapForAnnotation
)

const HeadingForInfoBox = styled(Heading)`
  margin-top: 30px;
  margin-bottom: 30px;
`

export const blockRenderMapForInfoBox = blockRenderMapForAnnotation.merge(
  Immutable.Map({
    'header-four': {
      element: 'h4',
      wrapper: <HeadingForInfoBox />,
    },
  })
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
    margin-top: 33px;
    margin-bottom: 33px;
  }

  &::before {
    ${dividerStyles}
  }

  &::after {
    ${dividerStyles}
  }
`

export const blockRenderMapForInfoBoxWithHeaderBorder =
  blockRenderMapForInfoBox.merge(
    Immutable.Map({
      'header-four': {
        element: 'h4',
        wrapper: <HeadingForInfoBoxWithHeaderBorder />,
      },
    })
  )
