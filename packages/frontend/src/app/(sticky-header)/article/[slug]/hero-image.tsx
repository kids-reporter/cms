import { Photo } from '@/app/types'
import './hero-image.scss'

type HeroImageProp = {
  image: Photo
  caption: string
}

export const HeroImage = (props: HeroImageProp) => {
  const { image, caption } = props
  const aspectRatio =
    image?.imageFile?.width && image?.imageFile?.height
      ? `${image.imageFile.width}/${image.imageFile.height}`
      : undefined

  return (
    image &&
    aspectRatio && (
      <figure className="hero-image">
        <div className="image-container">
          <img
            srcSet={`${image.resized?.small} 320w, ${image.resized?.medium} 500w, ${image.resized?.large} 1000w`}
            sizes="(min-width: 1100px) 1000px, 90vw"
            src={image.resized?.medium}
            style={{ aspectRatio: aspectRatio }}
          />
        </div>
        <figcaption>{caption ?? ''}</figcaption>
      </figure>
    )
  )
}

export default HeroImage
