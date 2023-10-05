'use client'
import { BackgroundImage, DownButton, Title } from './styled'
import { Photo } from './type-def'
import { useRef } from 'react'

export const Leading = ({
  title,
  backgroundImage,
  mobileBgImage,
}: {
  title: string
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
  return (
    <BackgroundImage
      ref={ref}
      $imageEntity={backgroundImage}
      $mobileImageEntity={mobileBgImage}
    >
      <Title>{title}</Title>
      <span onClick={onDownButtonClick}>
        <DownButton />
      </span>
    </BackgroundImage>
  )
}

export default Leading
