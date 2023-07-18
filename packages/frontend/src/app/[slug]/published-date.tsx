type DateProp = {
  date: string
}

export const PublishedDate = (props: DateProp) => {
  const getFormattedDate = (date: string): string => {
    const dateObj = new Date(date)
    const year = dateObj?.getFullYear()
    const month = `${dateObj?.getMonth() + 1}`.padStart(2, '0')
    const day = `${dateObj?.getDay() + 1}`.padStart(2, '0')
    return [year, month, day].join('.')
  }
  return (
    <div className="post_date">刊出日期 {getFormattedDate(props.date)}</div>
  )
}

export default PublishedDate
