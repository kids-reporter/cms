'use client'
import styled from 'styled-components'
import { BackgroundImage, DownButton, TitleContainer } from './styled'
import { Photo } from '@/app/types'
import { useRef } from 'react'
import { mediaQuery } from '@/app/utils/media-query'

const PositionedTitle = styled(TitleContainer)`
  ${mediaQuery.largeOnly} {
    &.left {
      left: calc(104 / 1440 * 100%);
      transform: translate(0, -50%);
    }

    &.bottom {
      top: unset;
      bottom: 148px;
      transform: translate(-50%, 0);
    }

    &.left.bottom {
      transform: translate(0);
    }
  }

  ${mediaQuery.mediumOnly} {
    &.bottom {
      top: unset;
      bottom: 171px;
      transform: translate(-50%, 0);
    }
  }

  ${mediaQuery.smallOnly} {
    &.bottom {
      top: unset;
      bottom: 103px;
      transform: translate(-50%, 0);
    }
  }
`

export const Leading = ({
  title,
  subtitle,
  titlePosition = 'center',
  backgroundImage,
  mobileBgImage,
}: {
  title: string
  subtitle?: string
  titlePosition?: string
  backgroundImage: Photo
  mobileBgImage?: Photo
}) => {
  const ref = useRef(null)
  const onDownButtonClick = () => {
    if (ref.current) {
      const container = ref.current as HTMLElement
      if (container) {
        window.scrollTo({
          behavior: 'smooth',
          top: container.offsetHeight,
        })
      }
    }
  }
  let titleClassName = ''
  switch (titlePosition) {
    case 'left-center': {
      titleClassName = 'left'
      break
    }
    case 'center-bottom': {
      titleClassName = 'bottom'
      break
    }
    case 'left-bottom': {
      titleClassName = 'left bottom'
      break
    }
    case 'center':
    default: {
      break
    }
  }
  return (
    <BackgroundImage
      ref={ref}
      $imageEntity={backgroundImage}
      $mobileImageEntity={mobileBgImage}
    >
      <PositionedTitle
        className={titleClassName}
        title={title}
        subtitle={subtitle}
      />
      <span onClick={onDownButtonClick}>
        <DownButton />
      </span>
    </BackgroundImage>
  )
}

export default Leading
