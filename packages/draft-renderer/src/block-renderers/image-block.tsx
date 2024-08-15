import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import debounce from 'lodash/debounce'
import { breakpoints, mediaQuery } from '../utils/media-query'
import { DEBOUNCE_THRESHOLD } from '../utils/constants'

const Figure = styled.figure`
  width: 100%;
`

const FigureCaption = styled.figcaption`
  width: fit-content;
  max-width: 100%;
  font-size: ${({ theme }) =>
    theme?.fontSizeLevel === 'large' ? '18px' : '14px'};
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;
  color: rgb(58, 79, 102);
  letter-spacing: 0.7px;
  line-height: 28px;
  text-align: center;
`

const Img = styled.img<{ $isDesktopAndAbove: boolean }>`
  width: 100%;
  object-fit: contain;
  ${(props) => (props.$isDesktopAndAbove ? 'cursor: zoom-in;' : '')};
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
      original: string
      small: string
      medium: string
      large: string
    }
  }
}

export function ImageBlock({ className = '', data }: ImageBlockProps) {
  const theme = useTheme()
  const { desc, imageFile, resized } = data || {}
  const [isDesktopAndAbove, setIsDesktopAndAbove] = useState(false)

  const handleWindowResize = debounce(() => {
    setIsDesktopAndAbove(window.innerWidth > breakpoints.desktop)
  }, DEBOUNCE_THRESHOLD)

  useEffect(() => {
    setIsDesktopAndAbove(window.innerWidth > breakpoints.desktop)
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const aspectRatio =
    imageFile?.width && imageFile?.height
      ? `${imageFile.width}/${imageFile.height}`
      : '16/9'

  const imgSrcSetArr: string[] = []
  if (resized?.medium) {
    imgSrcSetArr.push(`${resized.medium} 500w`)
  }
  if (resized?.large) {
    imgSrcSetArr.push(`${resized.large} 1000w`)
  }

  const commonImgProps = {
    src: resized?.original ?? resized?.medium,
    sizes: '(min-width: 1200px) 1000px, 100vw',
    srcSet: imgSrcSetArr.join(','),
  }

  const imgBlock = (
    <Figure className={className}>
      <Img
        alt={desc}
        {...commonImgProps}
        style={{ aspectRatio: aspectRatio }}
        $isDesktopAndAbove={isDesktopAndAbove}
        onClick={() =>
          isDesktopAndAbove && theme?.handleImgModalOpen?.(commonImgProps)
        }
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

  max-width: 72vw;
  margin: 0 auto 27px auto;

  ${mediaQuery.smallOnly} {
    max-width: 100%;
  }

  ${mediaQuery.largeOnly} {
    max-width: 1000px;
  }

  ${(props) => {
    switch (props.$alignment) {
      case 'paragraph-width':
        return `
          ${mediaQuery.mediumAbove} {
            max-width: 700px;
          }
        `
      case 'right':
        return `
          ${mediaQuery.mediumAbove} {
            width: 361px;
            float: right;
            margin: 5px 0px 5px 27px;
          }
        `
      case 'left':
        return `
          ${mediaQuery.mediumAbove} {
            width: 361px;
            float: left;
            margin: 5px 27px 5px 0px;
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

export const InfoBoxContainer = styled.div<{ $alignment?: string }>`
  /* reset browser default styles */
  figure {
    margin: 0 0 27px 0;
  }

  ${(props) => {
    switch (props.$alignment) {
      case 'left': {
        return `
          width: 200px;
          float: left;
          margin: 5px 27px 5px 0px;
        `
      }
      case 'right': {
        return `
          width: 200px;
          float: right;
          margin: 5px 0px 5px 27px;
        `
      }
      case 'paragraph-width':
      default: {
        return `
        width: fit-content;
        margin-left: auto; 
        margin-right: auto;
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
