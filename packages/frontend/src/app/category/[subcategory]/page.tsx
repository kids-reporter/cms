import axios from 'axios'
import { notFound } from 'next/navigation'
import { API_URL } from '@/app/constants'

const subcategoryQueryGQL = `
`

export default async function SubCategory({
  params,
}: {
  params: { subcategory: string }
}) {
  let response
  try {
    response = params?.subcategory
      ? await axios.post(API_URL, {
          query: subcategoryQueryGQL,
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

  const post = response?.data?.data?.post
  if (!post) {
    notFound()
  }

  return <h1>subcategory: {params.subcategory}</h1>
}
