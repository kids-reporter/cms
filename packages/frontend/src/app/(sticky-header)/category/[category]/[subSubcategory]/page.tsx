import axios from 'axios'
import { notFound } from 'next/navigation'
import { API_URL } from '@/app/constants'

const subSubcategoryQueryGQL = `
`

export default async function SubSubCategory({
  params,
}: {
  params: { subSubcategory: string }
}) {
  let response
  try {
    response = params?.subSubcategory
      ? await axios.post(API_URL, {
          query: subSubcategoryQueryGQL,
          variables: {
            where: {
              slug: params.subSubcategory,
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

  return <h1>subSubcategory: {params.subSubcategory}</h1>
}
