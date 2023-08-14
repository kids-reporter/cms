import React from 'react'
import styled from 'styled-components'
import { theme } from '../theme/index'

const Figure = styled.figure`
  width: 100%;
`

const FigureCaption = styled.figcaption`
  width: fit-content;
  max-width: 100%;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;
  color: rgb(58, 79, 102);
  letter-spacing: 0.7px;
  line-height: 28px;
`

const Img = styled.img`
  width: 100%;
`

type ImageBlockProps = {
  className?: string
  data: {
    alignment?: string
    desc?: string
    imageFile: {
      url: string
      width: number
      height: number
    }
    resized?: {
      small: string
      medium: string
      large: string
    }
  }
}

export function ImageBlock({ className = '', data }: ImageBlockProps) {
  const { desc, imageFile, resized } = data || {}

  const imgSrcSetArr = []
  if (resized?.medium) {
    imgSrcSetArr.push(`${resized.medium} 500w`)
  }

  if (resized?.large) {
    imgSrcSetArr.push(`${resized.large} 1000w`)
  }

  const imgBlock = (
    <Figure className={className}>
      <Img
        alt={desc}
        src={imageFile?.url}
        srcSet={imgSrcSetArr.join(',')}
        sizes="(min-width: 1200px) 1000px, 100vw"
      />
      {desc && <FigureCaption>{desc}</FigureCaption>}
    </Figure>
  )

  return imgBlock
}

type ImageBlockInArticleBodyProps = ImageBlockProps

const ArticleBodyContainer = styled.div<{ $alignment?: string }>`
  /* reset browser default styles */
  figure {
    margin: 0;
  }

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  max-width: 100%;
  margin: 0 auto 27px auto;

  ${theme.breakpoint.sm} {
    max-width: 72vw;
  }

  ${theme.breakpoint.xl} {
    max-width: 1000px;
  }

  ${(props) => {
    switch (props.$alignment) {
      case 'paragraph-width':
        return `
          ${theme.breakpoint.xl} {
            figure {
              width: 700px;
              margin-left: auto;
              margin-right: auto;
            }
          }
        `
      case 'right':
        return `
          ${theme.breakpoint.xl} {
            figure {
              width: 361px;
              float: right;
              margin: 5px 0px 5px 27px;
            }
          }
        `
      case 'left':
        return `
          ${theme.breakpoint.xl} {
            figure {
              width: 361px;
              float: left;
              margin: 5px 27px 5px 0px;
            }
          }
        `
    }
  }}
`

export function ImageInArticleBody({
  className = '',
  data,
}: ImageBlockInArticleBodyProps) {
  return (
    <ArticleBodyContainer $alignment={data.alignment} className={className}>
      <ImageBlock data={data} />
    </ArticleBodyContainer>
  )
}

const InfoBoxContainer = styled.div<{ $alignment?: string }>`
  /* reset browser default styles */
  figure {
    margin: 0;
  }
  margin-bottom: 30px;
  width: fit-content;

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  ${(props) => {
    switch (props.$alignment) {
      case 'paragraph-width': {
        return `
          figure {
            margin-left: auto;
            margin-right: auto;
          }
          `
      }
      case 'left': {
        return `
          figure {
            max-width: 50%; 
            margin-right: auto;
          }
          `
      }
      case 'right': {
        return `
          figure {
            max-width: 50%;
            margin-left: auto;
          }
        `
      }
    }
  }}
`

export function ImageInInfoBox({
  className = '',
  data,
}: ImageBlockInArticleBodyProps) {
  return (
    <InfoBoxContainer $alignment={data.alignment} className={className}>
      <ImageBlock data={data} />
    </InfoBoxContainer>
  )
}
