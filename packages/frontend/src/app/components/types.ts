import { Theme } from '@/app/constants'

export type PostSummary = {
  image: string
  title: string
  url: string
  desc: string
  category: string
  subSubcategory: string
  publishedDate: string
  theme: Theme
}
