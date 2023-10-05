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

export default async function Category({ params }: { params: { path: any } }) {
  const path = params.path
  if (!path || !Array.isArray(path) || path.length === 0) {
    console.error('Incorrect category path!', path)
    notFound()
  }

  let category = '',
    subcategory = '',
    currentPage = 1
  if (path.length === 1 && path[0]) {
    category = path[0]
  } else if (path.length === 2 && path[1] && path[1] !== 'page') {
    category = path[0]
    subcategory = path[1]
  } else if (
    path.length === 3 &&
    path[1] === 'page' &&
    Number.isInteger(Number(path[2])) &&
    Number(path[2]) > 0
  ) {
    category = path[0]
    currentPage = Number(path[2])
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
  } else {
    console.error('Incorrect category path!', path)
    notFound()
  }

  let subcategories, posts: PostSummary[], postsCount
  try {
    const subcategoriesRes = await axios.post(API_URL, {
      query: subcategoriesGQL,
      variables: {
        where: {
          slug: category,
        },
      },
    })
    subcategories = subcategoriesRes?.data?.data?.category?.subcategories?.map(
      (sub: any) => {
        return (
          sub && {
            name: sub.name,
            path: `/category/${category}/${sub.slug}`,
          }
        )
      }
    )

    const query = subcategory ? subcategoryPostsGQL : categoryPostsGQL
    const slug = subcategory ? subcategory : category
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
    posts = GetPostSummaries(
      subcategory
        ? postsRes?.data?.data?.subcategory?.relatedPosts
        : postsRes?.data?.data?.category?.relatedPosts
    )
    postsCount = subcategory
      ? postsRes?.data?.data?.subcategory?.relatedPostsCount
      : postsRes?.data?.data?.category?.relatedPostsCount
  } catch (err) {
    console.error('Fetch category data failed!', err)
    notFound()
  }

  const navigationItems = [{ name: '所有文章', path: `/category/${category}` }]
  if (Array.isArray(subcategories)) {
    navigationItems.push(...subcategories)
  }

  const totalPages = Math.ceil(postsCount / POST_PER_PAGE)

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

  // TODO: navigation item style
  return (
    <main className="container">
      <div className={`content theme-${theme}`}>
        <img src={imageURL} />
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
            routingPrefix={
              subcategory
                ? `/category/${category}/${subcategory}/page`
                : `/category/${category}/page`
            }
          />
        )}
      </div>
    </main>
  )
}
