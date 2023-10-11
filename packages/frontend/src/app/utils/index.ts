import { CMS_URL, Theme, ThemeColor } from '@/app/constants'
import { PostSummary } from '@/app/components/types'

export const GetThemeColor = (theme: Theme) => {
  if (theme === Theme.YELLOW) {
    return ThemeColor.YELLOW
  } else if (theme === Theme.RED) {
    return ThemeColor.RED
  } else {
    return ThemeColor.BLUE
  }
}

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

export const ShortenParagraph = (paragraph: string, limit: number): string => {
  return paragraph?.length > 0 && limit > 0 && paragraph.length > limit
    ? paragraph.substring(0, limit).concat('', '...')
    : paragraph
}

// TODO: complete theme-color mapping
export const GetThemeFromCategory = (Category: string): Theme => {
  switch (Category) {
    case 'news':
      return Theme.BLUE
    default:
      return Theme.YELLOW
  }
}

export const GetPostSummaries = (posts: any[]): PostSummary[] => {
  // TODO: error handling for post
  return posts?.map((post: any) => {
    const imageURL = post?.heroImage?.imageFile?.url
    const image = imageURL ? `${CMS_URL}${imageURL}` : ''
    const subSubcategory = post?.subSubcategories?.[0]

    return {
      image: image,
      title: post.title,
      url: `/article/${post.slug}`,
      desc: post.ogDescription,
      category: subSubcategory?.subcategory?.name,
      subSubcategory: subSubcategory?.name,
      publishedDate: post.publishedDate,
      theme: GetThemeFromCategory(subSubcategory?.subcategory?.slug),
    }
  })
}
