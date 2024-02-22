import React from 'react'
import styled from 'styled-components'
import { ContentState } from 'draft-js'
import { ENTITY, findEntitiesByType } from '../utils/entity'

const LinkWrapper = styled.a`
  text-decoration: underline;
  color: #27b5f7;
  transition: color 0.1s ease-in;
  cursor: pointer;

  &:hover {
    color: #232323;
  }
`

const Link = (props: {
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
}) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData()

  // Handling for internal/external links, internal links start with '#'
  const linkProps = url.match(/^#/)
    ? {
        onClick: () => {
          const anchor = document.querySelector(url) as HTMLElement
          if (anchor) {
            window.scrollTo({
              top: anchor.offsetTop - 62, //STICKY_HEADER_HEIGHT,
              behavior: 'smooth',
            })
          }
        },
      }
    : {
        href: url,
        target: '_blank',
      }

  return <LinkWrapper {...linkProps}>{props.children}</LinkWrapper>
}

export const linkDecorator = {
  strategy: findEntitiesByType(ENTITY.Link),
  component: Link,
}
