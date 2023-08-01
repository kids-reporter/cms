export const GetFormattedDate = (date: string): string => {
  const dateObj = new Date(date)
  if (!dateObj) {
    return ''
  }
  const year = dateObj.getFullYear()
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0')
  const day = `${dateObj.getDay() + 1}`.padStart(2, '0')
  return [year, month, day].join('.')
}
