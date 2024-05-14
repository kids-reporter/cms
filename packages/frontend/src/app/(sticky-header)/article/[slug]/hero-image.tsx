import { Photo } from '@/app/types'
import { FALLBACK_IMG } from '@/app/constants'

type HeroImageProp = {
  image: Photo
  caption: string
}

export const HeroImage = (props: HeroImageProp) => {
  const { image, caption } = props
  const aspectRatio =
    image?.imageFile?.width && image?.imageFile?.height
      ? `${image.imageFile.width}/${image.imageFile.height}`
      : '16/9'

  return (
    image && (
      <figure className="max-w-5xl mx-auto pt-10 pb-12">
        <div className="relative inline-flex w-full overflow-hidden">
          <img
            className="max-w-full object-contain"
            srcSet={`${image.resized?.small} 320w, ${image.resized?.medium} 500w, ${image.resized?.large} 1000w`}
            sizes="(min-width: 1100px) 1000px, 90vw"
            src={image.resized?.medium ?? FALLBACK_IMG}
            style={{
              width: 'inherit',
              height: 'auto',
              aspectRatio: aspectRatio,
            }}
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
