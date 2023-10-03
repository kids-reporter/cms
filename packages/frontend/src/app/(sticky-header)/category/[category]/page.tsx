import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Navigator from './navigator'
import Pagination from '@/app/components/pagination'
import { PostSummary } from '@/app/components/types'
import { API_URL, POST_PER_PAGE } from '@/app/constants'
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

// TODO: replace post content GQL
const categoryPostsGQL = `
query($where: CategoryWhereUniqueInput!, $take: Int!, $skip: Int!) {
  category(where: $where) {
    relatedPosts(take: $take, skip: $skip) {
      title
      slug
      ogDescription
      heroImage {
        resized {
          medium
        }
        imageFile {
          url
        }
      }
      subSubcategories {
        name
        subcategory {
          name
        }
      }
      publishedDate
    }
  }
}
`

export default async function Category({
  params,
}: {
  params: { category: string }
}) {
  const category = params?.category

  if (!category) {
    console.error('Incorrect category!', category)
    notFound()
  }

  let subcategoriesRes, postsRes
  try {
    subcategoriesRes = await axios.post(API_URL, {
      query: subcategoriesGQL,
      variables: {
        where: {
          slug: category,
        },
      },
    })

    postsRes = await axios.post(API_URL, {
      query: categoryPostsGQL,
      variables: {
        where: {
          slug: category,
        },
        take: POST_PER_PAGE,
        skip: 0, // TODO: pagination (currentPage - 1) * POST_PER_PAGE,
      },
    })
  } catch (err) {
    console.error('Fetch category data failed!', err)
    notFound()
  }

  const subcategories =
    subcategoriesRes?.data?.data?.category?.subcategories?.map(
      (subcategory: any) => {
        return (
          subcategory && {
            name: subcategory.name,
            path: `${category}/${subcategory.slug}`,
          }
        )
      }
    )

  const navigationItems = [{ name: '所有文章', path: category }]
  if (Array.isArray(subcategories)) {
    navigationItems.push(...subcategories)
  }

  const posts: PostSummary[] = GetPostSummaries(
    postsRes?.data?.data?.category?.relatedPosts
  )
  const totalPages = Math.ceil(posts?.length / POST_PER_PAGE)

  let imageURL
  if (category === 'news') {
    imageURL = '/images/category_news.svg'
  } else if (category === 'listening-news') {
    imageURL = '/images/category_listening_news.svg'
  } else if (category === 'comics') {
    imageURL = '/images/category_comics.svg'
  } else {
    imageURL = '/images/category_campus.svg'
  }

  // TODO: navigation item style
  return (
    <main className="container">
      <div className="content">
        <img src={imageURL} />
        <div className="navigation">
          {navigationItems?.map(
            (item, index) =>
              item && (
                <Navigator
                  key={`category-navigation-${index}`}
                  name={item.name}
                  path={item.path}
                  active={item.name === category}
                />
              )
          )}
        </div>
        <div className="post-list">
          {posts.map((post, index) => {
            return (
              post && <PostCard key={`author-post-card-${index}`} post={post} />
            )
          })}
        </div>
        {totalPages && totalPages > 0 && (
          <Pagination
            currentPage={1}
            totalPages={10}
            routingPrefix={`/category/${category}`}
          />
        )}
      </div>
    </main>
  )
}
