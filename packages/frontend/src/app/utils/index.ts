import { Theme, ThemeColor } from '@/app/constants'
import { PostSummary } from '@/app/components/types'
import { DEFAULT_THEME_COLOR } from '@/app/constants'

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
    const subSubcategory = post?.subSubcategories?.[0]

    return {
      image: post?.heroImage?.resized?.medium ?? '',
      title: post.title,
      url: `/article/${post.slug}`,
      desc: post.ogDescription,
      category: subSubcategory?.subcategory?.name,
      subSubcategory: subSubcategory?.name,
      publishedDate: post.publishedDate,
      theme:
        subSubcategory?.subcategory?.category?.themeColor ||
        DEFAULT_THEME_COLOR,
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
    case LogLevel.ERROR: {
      // Follow https://cloud.google.com/error-reporting/docs/formatting-error-messages doc to print structured error log
      // and trigger GCP error reporting.
      const errorLogEntry = {
        severity: level,
        '@type':
          'type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent',
        message: msg,
      }
      console.error(JSON.stringify(errorLogEntry))
      return
    }
    case LogLevel.WARNING:
      console.warn(structuredMsg)
      return
    case LogLevel.INFO:
    default:
      console.log(structuredMsg)
      return
  }
}
