import { Metadata } from 'next'
import axios from 'axios'
import errors from '@twreporter/errors'
import {
  API_URL,
  KIDS_URL_ORIGIN,
  Theme,
  GENERAL_DESCRIPTION,
  OG_SUFFIX,
} from '@/app/constants'
import { PublishedDate, SubTitle } from './styled'
import { Content } from './content'
import { Credits } from './credits'
import { getFormattedDate, getPostSummaries, log, LogLevel } from '@/app/utils'
import { Leading } from './leading'
import { RelatedPosts } from './related-posts'
import { notFound } from 'next/navigation'

const query = `
  fragment ImageEntity on Photo {
    resized {
      small
      medium
      large
    }
    imageFile {
      url
    }
  }
  query GetAProject($where: ProjectWhereUniqueInput!, $orderBy: [PostOrderByInput!]!) {
    project(where: $where) {
      title
      titlePosition
      subtitle
      content
      credits
      publishedDate
      heroImage {
        ...ImageEntity
      }
      mobileHeroImage {
        ...ImageEntity
      }
      relatedPosts(orderBy: $orderBy) {
        title
        slug
        publishedDate
        heroImage {
          ...ImageEntity
        }
        ogDescription
        subSubcategories {
          name
          slug
          subcategory {
            name
            slug
            category {
              name
              slug
            }
          }
        }
      }
    }
  }
`

const ogGQL = `
query($where: ProjectWhereUniqueInput!) {
  project(where: $where) {
    ogDescription
    ogTitle
    ogImage {
      resized {
        small
      }
    }
  }
}
`

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug

  let topicOG
  try {
    const topicOGRes = await axios.post(API_URL, {
      query: ogGQL,
      variables: {
        where: {
          slug: slug,
        },
      },
    })
    topicOG = topicOGRes?.data?.data?.project
    if (!topicOG) {
      log(LogLevel.WARNING, `Post not found! ${params.slug}`)
    }
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
  }

  return {
    title: `${topicOG?.ogTitle ? topicOG.ogTitle + ' - ' : ''}${OG_SUFFIX}`,
    alternates: {
      canonical: `${KIDS_URL_ORIGIN}/topic/${slug}`,
    },
    openGraph: {
      title: topicOG?.ogTitle ?? OG_SUFFIX,
      description: topicOG?.ogDescription ?? GENERAL_DESCRIPTION,
      images: topicOG?.ogImage?.resized?.small
        ? [topicOG.ogImage.resized.small]
        : [],
    },
  }
}

export default async function TopicPage({
  params,
}: {
  params: { slug: string }
}) {
  if (!params?.slug) {
    return notFound()
  }

  let axiosRes
  try {
    // TODO: maybe we could try apollo-client pkg
    axiosRes = await axios.post(API_URL, {
      query,
      variables: {
        where: {
          slug: params.slug,
        },
        orderBy: {
          publishedDate: 'desc',
        },
      },
    })
  } catch (err) {
    // TODO: return 500 error page
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
    return notFound()
  }

  const gqlErrors = axiosRes.data?.errors

  if (gqlErrors) {
    const annotatedErr = errors.helpers.wrap(
      new Error('Errors occured while executing `GetAProject` query'),
      'GraphQLError',
      'Errors occured in rendering Project page',
      { errors: gqlErrors, slug: params.slug }
    )
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)

    // TODO: return 500 error page
    return notFound()
  }

  const project = axiosRes?.data?.data?.project

  if (project === null) {
    return notFound()
  }

  const relatedPosts = getPostSummaries(project?.relatedPosts)

  return (
    project && (
      <div>
        <Leading
          title={project.title}
          titlePosition={project.titlePosition}
          backgroundImage={project.heroImage}
          mobileBgImage={project.mobileHeroImage}
        />
        {project.subtitle ? <SubTitle>{project.subtitle}</SubTitle> : null}
        {project.publishedDate ? (
          <PublishedDate>
            {getFormattedDate(project.publishedDate)} 最後更新
          </PublishedDate>
        ) : null}
        {project.content ? (
          <Content rawContentState={project.content} theme={Theme.BLUE} />
        ) : null}
        {project.credits ? (
          <Credits rawContentState={project.credits} theme={Theme.BLUE} />
        ) : null}
        <RelatedPosts posts={relatedPosts} />
      </div>
    )
  )
}
