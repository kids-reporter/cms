'use client'
import PostCard, { PostCardProp } from '@/app/components/post-card'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { createRef } from 'react'
import { mediaQuery } from '@/app/utils/media-query'

const FlexContainer = styled(TransitionGroup)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 999px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
  gap: 30px;
  margin: 0 auto 30px auto;

  ${mediaQuery.mediumAbove} {
    max-width: var(--normal-container-max-width);
  }

  .item-enter {
    opacity: 0;
  }
  .item-enter-done {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
`

export type { PostCardProp }

const Cards = ({ items }: { items: PostCardProp[] }) => {
  const cardsJsx = items.map((item, idx) => {
    const nodeRef = createRef<HTMLDivElement>()
    if (!item) {
      return null
    }
    return (
      <CSSTransition
        in={true}
        key={idx}
        nodeRef={nodeRef}
        timeout={500}
        classNames="item"
      >
        <div ref={nodeRef}>
          <PostCard post={item.post} />
        </div>
      </CSSTransition>
    )
  })
  return <FlexContainer>{cardsJsx}</FlexContainer>
}

export { Cards }
export default Cards
