import React from 'react'
import styled from 'styled-components'

const TOCContainer = styled.span`
  &::before {
    content: '[';
  }
  &::after {
    content: ']';
  }
`

export const EditModeTOC = (props) => {
  const tocContent = props.decoratedText
  const { tocLabel } = props.contentState.getEntity(props.entityKey).getData()

  return (
    <TOCContainer>
      <button
        onClick={() => {
          props.contentState.replaceEntityData(props.entityKey, {
            tocLabel: 'test',
          })
        }}
      >
        目{tocContent === tocLabel ? '' : ` - ${tocLabel}`}
      </button>
      {props.children}
    </TOCContainer>
  )
}
