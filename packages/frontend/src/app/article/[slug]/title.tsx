import './title.scss'

type TitleProp = {
  text: string
}

export const Title = (props: TitleProp) => {
  return <h1 className="title">{props.text}</h1>
}

export default Title
