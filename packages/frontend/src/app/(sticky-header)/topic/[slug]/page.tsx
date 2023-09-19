import axios from 'axios'
import errors from '@twreporter/errors'
import { API_URL, GetThemeFromCategory, Theme } from '@/app/constants'
import {
  BackgroundImage,
  DownButton,
  PublishedDate,
  SubTitle,
  Title,
} from './styled'
import { Content } from './content'
import { GetFormattedDate } from '@/app/utils'
import { Post } from './type-def'
import { PostSummary } from '@/app/components/types'
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
      publishedDate
      heroImage {
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
            slug
            category {
              title
              slug
            }
          }
        }
      }
    }
  }
`

export default async function PostPage({
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

  const relatedPosts = project.relatedPosts?.map((post: Post) => {
    // @TODO: provide default image
    const imageURL = post.heroImage?.resized?.small || ''
    const subSubcategory = post.subSubcategories?.[0]
    const category = subSubcategory?.subcategory?.category

    const postProps: PostSummary = {
      title: post.title,
      url: `/article/${post.slug}`,
      image: imageURL,
      desc: post.ogDescription || '',
      category: category?.title,
      subSubcategory: subSubcategory?.name,
      publishedDate: post.publishedDate,
      theme: GetThemeFromCategory(category),
    }
    return postProps
  })

  return (
    project && (
      <div>
        <BackgroundImage $imageEntity={project.heroImage}>
          <Title>{project.title}</Title>
          <DownButton />
        </BackgroundImage>
        {project.subtitle && <SubTitle>{project.subtitle}</SubTitle>}
        {project.publishedDate && (
          <PublishedDate>
            {GetFormattedDate(project.publishedDate)} 最後更新
          </PublishedDate>
        )}
        <Content rawContentState={project.content} theme={Theme.BLUE} />
        <RelatedPosts posts={relatedPosts} />
      </div>
    )
  )
}
