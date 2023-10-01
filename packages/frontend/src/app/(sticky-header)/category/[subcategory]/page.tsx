import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Tags from '@/app/components/tags'
import Pagination from '@/app/components/pagination'
import { API_URL } from '@/app/constants'
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

export default async function SubCategory({
  params,
}: {
  params: { subcategory: string }
}) {
  const category = params?.subcategory

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

  const subCategories = [{ name: '所有文章', slug: category }]
  subCategories.push(
    ...subcategoriesRes?.data?.data?.category?.subcategories?.map(
      (subcategory: any) => {
        return {
          name: subcategory.name,
          slug: `${category}/${subcategory.slug}`,
        }
      }
    )
  )

  return (
    <main className="container">
      <div className="content">
        <img src={'/images/category_news.svg'} />
        <Tags tags={subCategories} />
        <div className="post-list">
          {postMockupsMore.map((post, index) => {
            return <PostCard key={`author-post-card-${index}`} post={post} />
          })}
        </div>
        <Pagination currentPage={1} totalPages={10} routingPrefix={``} />
      </div>
    </main>
  )
}
