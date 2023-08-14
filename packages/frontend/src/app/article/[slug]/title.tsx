import './title.scss'

type TitleProp = {
  text: string
  subtitle?: string // TODO: style
}

export const Title = (props: TitleProp) => {
  const subtitle = props.subtitle
  return (
    <>
      {subtitle && <div className="subtitle">{props.subtitle}</div>}
      <h1 className={`title ${subtitle ? '' : 'noSubtitle'}`}>{props.text}</h1>
    </>
  )
}

export default Title
