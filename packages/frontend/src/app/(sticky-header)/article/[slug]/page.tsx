import { promises as fs } from 'fs'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { TOC, TOCIndex } from './table-of-content'
import Article from './article'
import {
  KIDS_URL_ORIGIN,
  GENERAL_DESCRIPTION,
  POST_CONTENT_GQL,
  OG_SUFFIX,
  ContentType,
  PREVIEW_SECRET_PATH,
} from '@/app/constants'
import { sendGQLRequest, log, LogLevel } from '@/app/utils'

const topicRelatedPostsNum = 5

const heroImageGQL = `
  heroImage {
    imageFile {
      width
      height
    }
    resized {
      small
      medium
      large
    }
  }
`

const categoryGQL = `
  subSubcategoriesOrdered {
    name
    slug
    subcategory {
      name
      slug
      category {
        name
        slug
        themeColor
      }
    }
  }
`

const postGQL = `
  query($where: PostWhereUniqueInput!, $orderBy: [NewsReadingGroupItemOrderByInput!]!, $take: Int, $relatedPostsWhere: PostWhereInput!) {
    post(where: $where) {
      title
      newsReadingGroup {
        items (orderBy: $orderBy){
          name
          embedCode
        }
      }
      brief
      content
      publishedDate
      ${heroImageGQL}
      heroCaption
      authors {
        avatar {
          resized {
            tiny
          }
        }
        bio
        id
        name
        slug
      }
      authorsJSON
      tagsOrdered {
        name
        slug
      }
      relatedPostsOrdered {
        title
        slug
        publishedDate
        ${heroImageGQL}
        ogDescription
        ${categoryGQL}
      }
      subtitle
      ${categoryGQL}
      mainProject {
        title
        slug
      }
      projects {
        title
        slug
        relatedPosts(take: $take, where: $relatedPostsWhere) {
          ${POST_CONTENT_GQL}
        }
      }
    }
  }
`

const metaGQL = `
query($where: PostWhereUniqueInput!) {
  post(where: $where) {
    publishedDate
    ogDescription
    ogTitle
    ogImage {
      resized {
        small
      }
    }
    ${categoryGQL}
  }
}
`

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug

  const postMetaRes = await sendGQLRequest({
    query: metaGQL,
    variables: {
      where: {
        slug: slug,
      },
    },
  })
  const postMeta = postMetaRes?.data?.data?.post
  if (!postMeta) {
    log(LogLevel.WARNING, `Post meta not found! ${params.slug}`)
  }

  return {
    title: `${postMeta?.ogTitle ? postMeta.ogTitle + ' - ' : ''}${OG_SUFFIX}`,
    alternates: {
      canonical: `${KIDS_URL_ORIGIN}/article/${slug}`,
    },
    openGraph: {
      title: postMeta?.ogTitle ?? OG_SUFFIX,
      description: postMeta?.ogDescription ?? GENERAL_DESCRIPTION,
      images: postMeta?.ogImage?.resized?.small
        ? [postMeta.ogImage.resized.small]
        : [],
      type: ContentType.ARTICLE,
    },
    other: {
      // Since we can't inject <!-- <PageMap>...</PageMap> --> to <head> section with Next metadata API,
      // so handle google seo with extra <meta> tag here, but be awared there are limitations(maximum 50 tags):
      // https://developers.google.com/custom-search/docs/structured_data?hl=zh-tw#limitations
      publishedDate: postMeta?.publishedDate ?? '',
      category:
        postMeta?.subSubcategoriesOrdered?.[0]?.subcategory?.category?.name ??
        '',
      subcategory:
        postMeta?.subSubcategoriesOrdered?.[0]?.subcategory?.name ?? '',
      subSubcategory: postMeta?.subSubcategoriesOrdered?.[0]?.name ?? '',
      contentType: ContentType.ARTICLE,
    },
  }
}

const getPost = async (slug: string) => {
  const data = {
    query: postGQL,
    variables: {
      where: {
        slug: slug,
      },
      relatedPostsWhere: {
        slug: {
          notIn: slug,
        },
      },
      orderBy: [{ order: 'asc' }],
      take: topicRelatedPostsNum,
    },
  }
  const { isEnabled } = draftMode()

  if (isEnabled) {
    let secretValue
    try {
      secretValue = await fs.readFile(PREVIEW_SECRET_PATH, {
        encoding: 'utf8',
      })
    } catch (err) {
      console.error('Failed to read secret!', err)
    }
    console.log('Get preview post', slug)
    return await sendGQLRequest(data, {
      headers: {
        Authorization: `Basic preview_${secretValue}`,
      },
    })
  } else {
    return await sendGQLRequest(data)
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug
  if (!slug) {
    log(LogLevel.WARNING, 'Invalid post slug!')
    notFound()
  }

  const postRes = await getPost(slug)
  const post = postRes?.data?.data?.post
  if (!post) {
    log(LogLevel.WARNING, `Post not found! ${slug}`)
    notFound()
  }

  // Traverse entityMap to find indexes of TOC
  const entityMap = post.content?.entityMap
  const tocIndexes: TOCIndex[] = []
  Object.keys(entityMap)?.forEach((key) => {
    const entity = entityMap[key]
    const data = entity?.data
    if (entity && entity.type === 'TOC_ANCHOR' && data?.anchorKey) {
      tocIndexes.push({
        key: data.anchorKey,
        label: data.anchorLabel ?? '',
      })
    }
  })

  return (
    <main className="flex flex-col items-center max-w-screen-2xl">
      {tocIndexes.length > 0 && <TOC indexes={tocIndexes} />}
      {post && <Article post={post} />}
    </main>
  )
}
