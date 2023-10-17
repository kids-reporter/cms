import { FontSizeLevel } from '@/app/constants'
import './title.scss'

type TitleProp = {
  text: string
  subtitle?: string
  fontSize?: FontSizeLevel
}

export const Title = ({
  text,
  subtitle = '',
  fontSize = FontSizeLevel.NORMAL,
}: TitleProp) => {
  return (
    <>
      {subtitle && <div className="subtitle">{subtitle}</div>}
      <h1
        className={`title ${subtitle ? '' : 'noSubtitle'} ${
          fontSize === FontSizeLevel.LARGE ? 'large' : ''
        }`}
      >
        {text}
      </h1>
    </>
  )
}

export default Title
