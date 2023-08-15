import './title.scss'

type TitleProp = {
  text: string
  subtitle?: string
}

export const Title = (props: TitleProp) => {
  const subtitle = props.subtitle
  return (
    <>
      {subtitle && <div className="subtitle">{subtitle}</div>}
      <h1 className={`title ${subtitle ? '' : 'noSubtitle'}`}>{props.text}</h1>
    </>
  )
}

export default Title
