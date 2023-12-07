import './hero-image.scss'

type HeroImageProp = {
  url: string
  caption: string
}

export const HeroImage = (props: HeroImageProp) => {
  const url = props?.url ?? '' // TODO: placeholder for missing image
  const caption = props?.caption ?? ''
  return (
    <figure className="hero-image">
      <div className="image-container">
        <img src={url} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default HeroImage
