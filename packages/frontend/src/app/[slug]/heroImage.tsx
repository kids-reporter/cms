type HeroImageProp = {
  url: string
  caption: string
}

export const HeroImage = (props: HeroImageProp) => {
  return (
    <h1>
      TODO: 首圖 {props.url} {props.caption}
    </h1>
  )
}

export default HeroImage
