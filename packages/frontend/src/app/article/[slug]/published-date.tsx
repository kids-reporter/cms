import { GetFormattedDate } from '@/app/utils'

type DateProp = {
  date: string
}

export const PublishedDate = (props: DateProp) => {
  return (
    <div className="post_date">
      刊出日期 {GetFormattedDate(props.date) ?? ''}
    </div>
  )
}

export default PublishedDate
