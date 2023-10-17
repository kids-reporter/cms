import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Navigator from './navigator'
import Pagination from '@/app/components/pagination'
import { PostSummary } from '@/app/components/types'
import {
  API_URL,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
  Theme,
} from '@/app/constants'
import { GetPostSummaries } from '@/app/utils'
import './page.scss'

const subcategoriesGQL = `
query($where: CategoryWhereUniqueInput!) {
  category(where: $where) {
    subcategories {
      name
      slug
    }
  }
}
`

const categoryPostsGQL = `
query($where: CategoryWhereUniqueInput!, $take: Int!, $skip: Int!) {
  category(where: $where) {
    relatedPosts(take: $take, skip: $skip) {
      ${POST_CONTENT_GQL}
    }
    relatedPostsCount
  }
}
`

const subcategoryPostsGQL = `
query($where: SubcategoryWhereUniqueInput!, $take: Int!, $skip: Int!) {
  subcategory(where: $where) {
    relatedPosts(take: $take, skip: $skip) {
      ${POST_CONTENT_GQL}
    }
    relatedPostsCount
  }
}
`

const subSubcategoryPostsGQL = `
query($where: SubSubcategoryWhereUniqueInput!, $take: Int!, $skip: Int!) {
  subSubcategory(where: $where) {
    relatedPosts(take: $take, skip: $skip) {
      ${POST_CONTENT_GQL}
    }
    relatedPostsCount
  }
}
`

const getImageAndThemeFromCategory = (category: string) => {
  let imageURL, theme
  if (category === 'news') {
    imageURL = '/images/category_news.svg'
    theme = Theme.BLUE
  } else if (category === 'listening-news') {
    imageURL = '/images/category_listening_news.svg'
    theme = Theme.RED
  } else if (category === 'comics') {
    imageURL = '/images/category_comics.svg'
    theme = Theme.YELLOW
  } else {
    imageURL = '/images/category_campus.svg'
    theme = Theme.YELLOW
  }
  return { imageURL, theme }
}

export default async function Category({ params }: { params: { path: any } }) {
  const path = params.path
  if (!path || !Array.isArray(path) || path.length === 0) {
    console.error('Incorrect category path!', path)
    notFound()
  }

  // Category page routing scenarios:   ex: /category/path[0]/path[1]/path[2]...
  // -------------------------------------------------------------------------------
  // length = 1(category)               ex: /category/news
  // length = 2(subcategory)            ex: /category/news/times
  // length = 3(subSubcategory)         ex: /category/news/times/medical-news
  // length = 3(category, page 2)       ex: /category/news/page/2
  // length = 4(subcategory, page 2)    ex: /category/news/times/page/2
  // length = 5(subSubcategory, page 2) ex: /category/news/times/medical-news/page/2
  let category = '',
    subcategory = '',
    subSubcategory = '',
    currentPage = 1
  if (path.length === 1 && path[0]) {
    category = path[0]
  } else if (path.length === 2 && path[1] && path[1] !== 'page') {
    category = path[0]
    subcategory = path[1]
  } else if (path.length === 3) {
    if (
      path[1] === 'page' &&
      Number.isInteger(Number(path[2])) &&
      Number(path[2]) > 0
    ) {
      category = path[0]
      currentPage = Number(path[2])
    } else {
      category = path[0]
      subcategory = path[1]
      subSubcategory = path[2]
    }
  } else if (
    path.length === 4 &&
    path[1] !== 'page' &&
    path[2] === 'page' &&
    Number.isInteger(Number(path[3])) &&
    Number(path[3]) > 0
  ) {
    category = path[0]
    subcategory = path[1]
    currentPage = Number(path[3])
  } else if (
    path.length === 5 &&
    path[3] === 'page' &&
    Number.isInteger(Number(path[4])) &&
    Number(path[4]) > 0
  ) {
    category = path[0]
    subcategory = path[1]
    subSubcategory = path[2]
    currentPage = Number(path[4])
  } else {
    console.error('Incorrect category path!', path)
    notFound()
  }

  // Fetch subcategories for navigation
  const navigationItems = []
  try {
    const subcategoriesRes = await axios.post(API_URL, {
      query: subcategoriesGQL,
      variables: {
        where: {
          slug: category,
        },
      },
    })
    const categoryData = subcategoriesRes?.data?.data?.category
    if (!categoryData) {
      console.error('Incorrect category!')
      notFound()
    }
    const subcategories = categoryData.subcategories?.map((sub: any) => {
      return (
        sub && {
          name: sub.name,
          path: `/category/${category}/${sub.slug}`,
        }
      )
    })

    navigationItems.push({ name: '所有文章', path: `/category/${category}` })
    if (Array.isArray(subcategories) && subcategories.length > 0) {
      navigationItems.push(...subcategories)
    }
  } catch (err) {
    console.error('Fetch category data failed!', err)
    notFound()
  }

  // Fetch related posts of subSubcategory/subcategory/category
  let posts: PostSummary[], postsCount
  try {
    let query, slug
    if (subSubcategory) {
      query = subSubcategoryPostsGQL
      slug = subSubcategory
    } else if (subcategory) {
      query = subcategoryPostsGQL
      slug = subcategory
    } else {
      query = categoryPostsGQL
      slug = category
    }

    const postsRes = await axios.post(API_URL, {
      query: query,
      variables: {
        where: {
          slug: slug,
        },
        take: POST_PER_PAGE,
        skip: (currentPage - 1) * POST_PER_PAGE,
      },
    })

    let targetCategory
    if (subSubcategory) {
      targetCategory = postsRes?.data?.data?.subSubcategory
    } else if (subcategory) {
      targetCategory = postsRes?.data?.data?.subcategory
    } else {
      targetCategory = postsRes?.data?.data?.category
    }

    if (!targetCategory) {
      console.error('Fetch targetCategory failed!')
      notFound()
    }

    posts = GetPostSummaries(targetCategory.relatedPosts)
    postsCount = targetCategory.relatedPostsCount
  } catch (err) {
    console.error('Fetch posts failed!', err)
    notFound()
  }

  const totalPages = Math.ceil(postsCount / POST_PER_PAGE)
  if (currentPage > totalPages) {
    console.error(
      `Incorrect page! currentPage=${currentPage}, totalPages=${totalPages}`
    )
    notFound()
  }

  let routingPrefix
  if (subSubcategory) {
    routingPrefix = `/category/${category}/${subcategory}/${subSubcategory}/page`
  } else if (subcategory) {
    routingPrefix = `/category/${category}/${subcategory}/page`
  } else {
    routingPrefix = `/category/${category}/page`
  }

  const { imageURL, theme } = getImageAndThemeFromCategory(category)

  return (
    <main className="container">
      <div className={`content theme-${theme}`}>
        <img className="title-image" src={imageURL} />
        <div className="navigation">
          {navigationItems?.map(
            (item, index) =>
              item && (
                <Navigator
                  key={`category-navigation-${index}`}
                  name={item.name}
                  path={item.path}
                  active={
                    item.path ===
                    `/category/${category}${
                      subcategory ? `/${subcategory}` : ''
                    }`
                  }
                />
              )
          )}
        </div>
        {posts?.length > 0 && (
          <div className="post-list">
            {posts.map((post, index) => {
              return (
                post && (
                  <PostCard key={`author-post-card-${index}`} post={post} />
                )
              )
            })}
          </div>
        )}
        {totalPages && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            routingPrefix={routingPrefix}
          />
        )}
      </div>
    </main>
  )
}
