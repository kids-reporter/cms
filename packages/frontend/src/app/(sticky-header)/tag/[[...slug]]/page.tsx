import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import { PostSummary } from '@/app/components/types'
import {
  API_URL,
  CMS_URL,
  POST_PER_PAGE,
  GetThemeFromCategory,
} from '@/app/constants'
import './page.scss'

const tagGQL = `
query($where: TagWhereUniqueInput!, $take: Int, $skip: Int!, $orderBy: [PostOrderByInput!]!) {
  tag(where: $where) {
    posts(orderBy: $orderBy, take: $take, skip: $skip) {
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
    postsCount
    name
  }
}
`
// Tag's routing path: /tag/[slug]/[page num], ex: /tag/life/1
export default async function Tag({ params }: { params: { slug: any } }) {
  const slug = params.slug?.[0]
  const currentPage = !params.slug?.[1] ? 1 : Number(params.slug[1])

  if (params.slug?.length > 2 || !slug || !(currentPage > 0)) {
    console.error('Incorrect tag routing!')
    notFound()
  }

  let tag, posts, postsCount
  try {
    const response = await axios.post(API_URL, {
      query: tagGQL,
      variables: {
        where: {
          slug: slug,
        },
        orderBy: [
          {
            publishedDate: 'desc',
          },
        ],
        take: POST_PER_PAGE,
        skip: (currentPage - 1) * POST_PER_PAGE,
      },
    })

    tag = response?.data?.data?.tag
    if (!tag) {
      console.error('Tag not found!')
      notFound()
    }
    posts = tag.posts
    postsCount = tag.postsCount
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }

  const totalPages = Math.ceil(postsCount / POST_PER_PAGE)
  if (currentPage > totalPages) {
    console.error(
      `Request page(${currentPage}) exceeds total pages(${totalPages}!`
    )
    notFound()
  }

  const postSummeries: (PostSummary | undefined)[] = Array.isArray(posts)
    ? posts.map((post: any) => {
        return post
          ? {
              image: `${CMS_URL}${post.heroImage?.imageFile?.url}`,
              title: post.title,
              url: `/article/${post.slug}`,
              desc: post.ogDescription,
              category: post.subSubcategories?.subcategory?.name,
              subSubcategory: post.subSubcategories.name,
              publishedDate: post.publishedDate,
              theme: GetThemeFromCategory(
                post.subSubcategories?.subcategory?.name
              ),
            }
          : undefined
      })
    : []

  return (
    <main>
      <div className="info">
        <h1>#{tag.name}</h1>
      </div>
      <div className="post-list">
        {postSummeries.length > 0 ? (
          postSummeries.map((post, index) => {
            return (
              post && <PostCard key={`author-post-card-${index}`} post={post} />
            )
          })
        ) : (
          <h1>沒有文章</h1>
        )}
      </div>
      {totalPages && totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          routingPrefix={`/tag/${slug}`}
        />
      )}
    </main>
  )
}
