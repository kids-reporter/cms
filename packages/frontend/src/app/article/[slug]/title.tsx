import './title.scss'

type TitleProp = {
  text: string
  subtitle?: string // TODO: style
}

export const Title = (props: TitleProp) => {
  return (
    <>
      {props.subtitle && <h2>{props.subtitle}</h2>}
      <h1 className="title">{props.text}</h1>
    </>
  )
}

export default Title
