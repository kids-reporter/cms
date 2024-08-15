import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import debounce from 'lodash/debounce'
import { Photo } from '@/app/types'
import { FALLBACK_IMG, DEBOUNCE_THRESHOLD } from '@/app/constants'
import { breakpoints } from '@/app/utils/media-query'
import { useArticleContext } from './article-context'

const ImageWithFallback = dynamic(
  () => import('@/app/components/image-with-fallback'),
  { ssr: false }
)

type HeroImageProp = {
  image: Photo
  caption: string
  handleImgModalOpen: (
    imgProps: React.ImgHTMLAttributes<HTMLImageElement>
  ) => void
}

export const HeroImage = (props: HeroImageProp) => {
  const { image, caption } = props
  const { handleImgModalOpen } = useArticleContext()
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
    image?.imageFile?.width && image?.imageFile?.height
      ? `${image.imageFile.width}/${image.imageFile.height}`
      : '16/9'

  const commonImgProps = {
    sizes: '(min-width: 1100px) 1000px, 90vw',
    srcSet: `${image?.resized?.small} 320w, ${image?.resized?.medium} 500w, ${image?.resized?.large} 1000w`,
    src: image?.resized?.medium ?? FALLBACK_IMG,
  }

  return (
    image && (
      <figure className="max-w-5xl mx-auto pt-10 pb-12">
        <div className="relative inline-flex w-full overflow-hidden">
          <ImageWithFallback
            className="max-w-full object-contain"
            {...commonImgProps}
            style={{
              width: 'inherit',
              height: 'auto',
              aspectRatio: aspectRatio,
              cursor: isDesktopAndAbove ? 'zoom-in' : 'default',
            }}
            loading="eager"
            fetchPriority="high"
            onClick={() =>
              isDesktopAndAbove && handleImgModalOpen(commonImgProps)
            }
          />
        </div>
        <figcaption
          style={{ color: 'var(--paletteColor3)' }}
          className="pt-2.5 mt-1 text-sm leading-7 text-center"
        >
          {caption ?? ''}
        </figcaption>
      </figure>
    )
  )
}

export default HeroImage
