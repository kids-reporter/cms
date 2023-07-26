import './hero-image.scss'

type HeroImageProp = {
  url: string
  caption: string
}

export const HeroImage = (props: HeroImageProp) => {
  return (
    <figure className="hero-image">
      <div className="image-container">
        <img src={props.url} />
      </div>
      <figcaption>{props.caption}</figcaption>
    </figure>
  )
}

export default HeroImage
