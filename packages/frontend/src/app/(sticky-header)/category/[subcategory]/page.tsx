import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Tags from '@/app/components/tags'
import Pagination from '@/app/components/pagination'
import { API_URL } from '@/app/constants'
import './page.scss'

// TODO: remove mockup
import { postMockupsMore } from '@/app/mockup'
import { MOCKUP_TAGS } from '@/app/mockup'

const categoryGQL = `
`

const postQueryGQL = `
`

export default async function SubCategory({
  params,
}: {
  params: { subcategory: string }
}) {
  let categoryRes, postRes
  try {
    categoryRes = params?.subcategory
      ? await axios.post(API_URL, {
          query: categoryGQL,
          variables: {
            where: {
              slug: params.subcategory,
            },
          },
        })
      : undefined

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
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }

  const categoryTags = categoryRes?.data?.map((category: any) => {
    return {
      name: category.name,
      slug: category.slug,
    }
  })
  const post = postRes?.data?.data?.post
  if (!categoryTags || !post) {
    notFound()
  }

  return (
    <main className="container">
      <div className="content">
        <img src={'/images/category_news.svg'} />
        <Tags tags={MOCKUP_TAGS} />
        <div className="post-list">
          {postMockupsMore.map((post, index) => {
            return <PostCard key={`author-post-card-${index}`} post={post} />
          })}
        </div>
        <Pagination currentPage={1} totalPages={10} />
      </div>
    </main>
  )
}
