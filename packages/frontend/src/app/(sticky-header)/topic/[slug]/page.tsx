import axios from 'axios'
import errors from '@twreporter/errors'
import { API_URL, Theme } from '@/app/constants'
import { PublishedDate, SubTitle } from './styled'
import { Content } from './content'
import { Credits } from './credits'
import { GetFormattedDate, GetPostSummaries } from '@/app/utils'
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
  query GetAProject($where: ProjectWhereUniqueInput!) {
    project(where: $where) {
      title
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
      relatedPosts {
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
      },
    })
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    console.log(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatedErr, {
          withStack: true,
          withPayload: true,
        }),
      })
    )
    // TODO: return 500 error page
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
    console.log(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatedErr, {
          withStack: true,
          withPayload: true,
        }),
      })
    )

    // TODO: return 500 error page
    return notFound()
  }

  const project = axiosRes?.data?.data?.project

  if (project === null) {
    return notFound()
  }

  const relatedPosts = GetPostSummaries(project?.relatedPosts)

  return (
    project && (
      <div>
        <Leading
          title={project.title}
          backgroundImage={project.heroImage}
          mobileBgImage={project.mobileHeroImage}
        />
        {project.subtitle ? <SubTitle>{project.subtitle}</SubTitle> : null}
        {project.publishedDate ? (
          <PublishedDate>
            {GetFormattedDate(project.publishedDate)} 最後更新
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
