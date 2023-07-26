import Immutable from 'immutable'
import React from 'react'
import styled from 'styled-components'
import { DefaultDraftBlockRenderMap } from 'draft-js'

const ParagraphBlock = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 27px auto;
  font-size: 18px;
  font-weight: 500;
  color: #3a4f66;
  letter-spacing: 0.9px;
  line-height: 2;
`

function Paragraph({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return <ParagraphBlock className={className}>{children}</ParagraphBlock>
}

const HeadingBlock = styled.div`
  font-weight: 700;
  line-height: 1.5;
  color: #232323;
  width: 100%;
  max-width: 700px;
  margin: 45px auto 20px auto;

  h2,
  h3,
  h4 {
    margin: 0;
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 28px;
  }

  h4 {
    font-size: 26px;
  }
`

function Heading({
  className,
  children,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <HeadingBlock className={className}>{children}</HeadingBlock>
}

const ListBlock = styled.ol`
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

function OrderdedList({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <ListBlock className={className}>{children}</ListBlock>
}

function UnorderdedList({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <ListBlock as="ul" className={className}>
      {children}
    </ListBlock>
  )
}

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
  'ordered-list-item': {
    element: 'li',
    wrapper: <OrderdedList />,
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: <UnorderdedList />,
  },
  unstyled: {
    element: 'div',
    wrapper: <Paragraph />,
  },
})

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(_blockRenderMap)

const HeadingForAnnotation = styled(Heading)`
  h4 {
    font-size: 20px;
  }
`

const OrderdedListForAnnotation = styled(OrderdedList)`
  li {
    font-size: 16px;
  }
`

const UnorderdedListForAnnotation = styled(UnorderdedList)`
  li {
    font-size: 16px;
  }
`

const ParagraphForAnnotation = styled(Paragraph)`
  /* overwrite css */
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0;
`

const _blockRenderMapForAnnotation = Immutable.Map({
  'header-four': {
    element: 'h4',
    wrapper: <HeadingForAnnotation />,
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: <OrderdedListForAnnotation />,
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: <UnorderdedListForAnnotation />,
  },
  unstyled: {
    element: 'div',
    wrapper: <ParagraphForAnnotation />,
  },
})

export const blockRenderMapForAnnotation = DefaultDraftBlockRenderMap.merge(
  _blockRenderMapForAnnotation
)
