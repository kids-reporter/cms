import React, { useState } from 'react'
import styled from 'styled-components'
import { ContentBlock, ContentState } from 'draft-js'

const TOCWrapper = styled.span<{ tocLabel: string }>`
  display: inline-block;
  cursor: pointer;
  color: #27b5f7;
  &::before {
    content: '[目錄:${(props) =>
      props.tocLabel ? `(${props.tocLabel}) ` : ''}';
  }
  &::after {
    content: ']';
  }
`

const EditModeTOC = (props: {
  decoratedText: string
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
}) => {
  const { children, contentState, entityKey } = props
  const tocContent = props.decoratedText
  const [showContent, setShowContent] = useState(false)
  const { tocLabel } = contentState.getEntity(entityKey).getData()

  return (
    <React.Fragment>
      <TOCWrapper
        tocLabel={tocLabel !== tocContent ? tocLabel : ''}
        onClick={(e) => {
          e.preventDefault()
          contentState.replaceEntityData(entityKey, {
            tocLabel: 'test',
          })
          setShowContent(!showContent)
        }}
      >
        <span>{children}</span>
      </TOCWrapper>
    </React.Fragment>
  )
}

const findTOCEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'TOC'
    )
  }, callback)
}

export const TOCDecorator = {
  strategy: findTOCEntities,
  component: EditModeTOC,
}
