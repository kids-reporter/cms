'use client'
import { useState } from 'react'
import styled from 'styled-components'
import { mediaQuery } from '@/app/utils/media-query'
import { STICKY_HEADER_HEIGHT, ThemeColor } from '@/app/constants'

const zIndex = 1000
const TOCContainer = styled.div`
  position: fixed;
  width: 90px;
  left: 0;
  transform: translateY(-50%);
  z-index: ${zIndex};

  ${mediaQuery.mediumAbove} {
  }

  ${mediaQuery.smallOnly} {
  }
`

const tocWidth = 180 // px
const TOCTab = styled.div`
  width: 30px;
  position: fixed;
  z-index: ${zIndex};
  top: 150px;
  left: 0;
  transition: transform 0.1s ease-in-out 0.1s;
  transform: ${(props) =>
    props.isExpanded ? `translateX(${tocWidth}px)` : 'translateX(0px)'};
  cursor: pointer;

  > div {
    opacity: 0.6;
    color: black;
    background-color: #f4f4f4;
    font-size: 14px;
    width: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
const TOCBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: fixed;
  z-index: ${zIndex};
  top: 220;
  left: 0;
  height: 100vh;
  width: ${tocWidth}px;
  background-color: #f4f4f4;
  transition: transform 0.1s ease-in-out 0.1s;
  transform: ${(props) =>
    props.isExpanded ? 'translateX(0px)' : `translateX(-${tocWidth}px)`};
`

// TODO: change color
const Index = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #8e8e8e;

  &.withinViewPort {
    color: ${ThemeColor.BLUE};
  }
`
export type TOCIndex = { key: string; label: string }

export const TOC = (props: { indexes: TOCIndex[] }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <TOCContainer>
      <TOCTab
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
        isExpanded={isExpanded}
      >
        <div>索引</div>
      </TOCTab>
      <TOCBackground isExpanded={isExpanded}>
        {props.indexes.map(
          (tocIndex, index) =>
            tocIndex && (
              <Index
                key={`toc-key-${index}`}
                id={`toc-${tocIndex.key}`}
                onClick={() => {
                  const anchor = document.querySelector(
                    `#anchor-${tocIndex.key}`
                  ) as HTMLElement
                  window.scrollTo({
                    top: anchor.offsetTop - STICKY_HEADER_HEIGHT,
                    behavior: 'smooth',
                  })
                }}
              >
                {tocIndex.label}
                <br />
              </Index>
            )
        )}
      </TOCBackground>
    </TOCContainer>
  )
}
