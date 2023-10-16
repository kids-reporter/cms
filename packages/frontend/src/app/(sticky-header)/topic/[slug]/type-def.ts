export type Photo = {
  imageFile?: {
    url: string
  }
  resized?: {
    small: string
    medium: string
    large: string
  }
}

type Category = {
  name: string
  slug: string
}

type Subcategory = {
  slug: string
  category: Category
}

type SubSubcategory = {
  name: string
  slug: string
  subcategory: Subcategory
}

export type Post = {
  title: string
  slug: string
  publishedDate: string
  ogDescription?: string
  heroImage: Photo | null
  subSubcategories: SubSubcategory[]
}
