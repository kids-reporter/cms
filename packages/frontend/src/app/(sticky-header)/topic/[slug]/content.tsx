'use client'
import styled from 'styled-components'
import { DraftRenderer, DraftRendererProp } from './draft-renderer'
import { mediaQuery } from '@/app/utils/media-query'

const Container = styled.div`
  margin-bottom: 70x;
  ${mediaQuery.smallOnly} {
    margin-bottom: 50px;
  }
`

export const Content = ({ rawContentState, theme }: DraftRendererProp) => {
  // TODO: render skeleton
  return (
    <Container>
      <DraftRenderer rawContentState={rawContentState} theme={theme} />
    </Container>
  )
}

export default Content
