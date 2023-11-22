import { STORAGE_URL, Theme, ThemeColor } from '@/app/constants'
import { PostSummary } from '@/app/components/types'

export const getThemeColor = (theme: Theme) => {
  if (theme === Theme.YELLOW) {
    return ThemeColor.YELLOW
  } else if (theme === Theme.RED) {
    return ThemeColor.RED
  } else {
    return ThemeColor.BLUE
  }
}

export const getFormattedDate = (date: string): string => {
  const dateObj = new Date(date)
  if (!date || !dateObj) {
    return ''
  }
  const year = dateObj.getFullYear()
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0')
  const day = `${dateObj.getDate()}`.padStart(2, '0')
  return [year, month, day].join('.')
}

export const getPostSummaries = (posts: any[]): PostSummary[] => {
  // TODO: error handling for post
  return posts?.map((post: any) => {
    const imageURL = post?.heroImage?.imageFile?.url
    const image = imageURL ? `${STORAGE_URL}${imageURL}` : ''
    const subSubcategory = post?.subSubcategories?.[0]

    return {
      image: image,
      title: post.title,
      url: `/article/${post.slug}`,
      desc: post.ogDescription,
      category: subSubcategory?.subcategory?.name,
      subSubcategory: subSubcategory?.name,
      publishedDate: post.publishedDate,
      theme: subSubcategory?.subcategory?.category?.themeColor,
    }
  })
}

export enum LogLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export const log = (level: LogLevel = LogLevel.INFO, msg: string) => {
  const structuredMsg = JSON.stringify({
    severity: level,
    message: msg,
  })

  switch (level) {
    case LogLevel.ERROR:
      console.error(structuredMsg)
      return
    case LogLevel.WARNING:
      console.warn(structuredMsg)
      return
    case LogLevel.INFO:
    default:
      console.log(structuredMsg)
      return
  }
}
