import './hero-image.scss'

type HeroImageProp = {
  url: string
  caption: string
}

export const HeroImage = (props: HeroImageProp) => {
  // TODO: image url?
  return (
    <figure className="hero-image">
      <img src="https://kids.twreporter.org/wp-content/uploads/2023/07/%E5%BC%B5%E7%91%8B%E6%81%A9%E4%B8%BB%E5%9C%96.jpg" />
      <figcaption>{props.caption}</figcaption>
    </figure>
  )
}

export default HeroImage
