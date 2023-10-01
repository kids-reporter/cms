import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Tags from '@/app/components/tags'
import Pagination from '@/app/components/pagination'
import { API_URL, POST_PER_PAGE } from '@/app/constants'
import './page.scss'

// TODO: remove mockup
import { postMockupsMore } from '@/app/mockup'

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

// const postQueryGQL = ``

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

  let subcategoriesRes
  try {
    subcategoriesRes = await axios.post(API_URL, {
      query: subcategoriesGQL,
      variables: {
        where: {
          slug: category,
        },
      },
    })

    /*
    postRes = params?.subcategory
      ? await axios.post(API_URL, {
          query: postQueryGQL,
          variables: {
            where: {
              slug: params.subcategory,
            },
          },
        })
      : undefined
    */
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
            slug: `${category}/${subcategory.slug}`,
          }
        )
      }
    )

  const navigationItems = [{ name: '所有文章', slug: category }]
  if (Array.isArray(subcategories)) {
    navigationItems.push(...subcategories)
  }

  const posts = postMockupsMore
  const totalPages = Math.ceil(posts.length / POST_PER_PAGE)

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

  return (
    <main className="container">
      <div className="content">
        <img src={imageURL} />
        <Tags tags={navigationItems} />
        <div className="post-list">
          {posts.map((post, index) => {
            return <PostCard key={`author-post-card-${index}`} post={post} />
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
