import { mediaFeature } from '@/app/utils/media-query'
import { Photo } from '@/app/types'
import './hero-image.scss'

type HeroImageProp = {
  image: Photo
  caption: string
}

export const HeroImage = (props: HeroImageProp) => {
  const image = props?.image // TODO: placeholder for missing image
  const caption = props?.caption ?? ''
  return (
    <figure className="hero-image">
      <div className="image-container">
        <picture>
          <source
            media={mediaFeature.largeOnly}
            srcSet={image?.resized?.large}
          />
          <source
            media={mediaFeature.smallOnly}
            srcSet={image?.resized?.small}
          />
          <img src={image?.resized?.medium} />
        </picture>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default HeroImage
