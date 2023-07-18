type TitleProp = {
  text: string
}

export const Title = (props: TitleProp) => {
  return <h1 className="page-title">{props.text}</h1>
}

export default Title
