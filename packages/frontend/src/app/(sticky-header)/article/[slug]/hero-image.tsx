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
        <img
          srcSet={`${image?.resized?.small} 800w, ${image?.resized?.medium} 1200w, ${image?.resized?.large} 2000w"`}
          sizes="(min-width: 1100px) 1000px, 90vw"
          src={image?.resized?.medium}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default HeroImage
