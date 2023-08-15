import axios from 'axios'
import Title from './title'
import HeroImage from './hero-image'
import PublishedDate from './published-date'
import Category from './category'
import Sidebar from './sidebar'
import Brief, { AuthorGroup } from './brief'
import Tags from './tags'
import PostRenderer from './post-renderer'
import AuthorCard, { Author } from './author-card'
import CallToAction from './call-to-action'
import RelatedPosts from './related-posts'
import { Divider } from '@/app/components/divider'
import {
  API_URL,
  CMS_URL,
  AUTHOR_GROUPS,
  AUTHOR_GROUP_LABEL,
  GetThemeFromCategory,
} from '@/app/constants'

import './post.scss'
import '../../assets/css/button.css'
import '../../assets/css/icomoon/style.css'

const inputOrderSuffix = 'InInputOrder'

const heroImageGQL = `
  heroImage {
    resized {
      medium
    }
    imageFile {
      url
    }
  }
`

const authorsGQL = AUTHOR_GROUPS.reduce(
  (gqlStr, authorGroup) =>
    gqlStr +
    `
  ${authorGroup}${inputOrderSuffix} {
    id
    name
    bio
    avatar {
      imageFile {
        url
      }
    }
  }`,
  ''
)

const categoryGQL = `
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
`

const postQueryGQL = `
  query($where: PostWhereUniqueInput!) {
    post(where: $where) {
      name
      brief
      content
      publishedDate
      ${heroImageGQL}
      heroCaption
      ${authorsGQL}
      tags {
        name
        slug
      }
      relatedPosts${inputOrderSuffix} {
        name
        slug
        publishedDate
        ${heroImageGQL}
        ogDescription
        ${categoryGQL}
      }
      subtitle
      ${categoryGQL}
    }
  }
`

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const response = params?.slug
    ? await axios.post(API_URL, {
        query: postQueryGQL,
        variables: {
          where: {
            slug: params.slug,
          },
        },
      })
    : undefined

  const post = response?.data?.data?.post

  /* TODO: error handling
  if (!post) {
    return 404
  }
  */

  const authors = AUTHOR_GROUPS.reduce((allAuthors: Author[], authorGroup) => {
    const orderedAuthorField = `${authorGroup}${inputOrderSuffix}`
    const authorConfigArray = post?.[orderedAuthorField]?.map((author: any) => {
      return author
        ? {
            id: author.id,
            name: author.name,
            avatar: author.avatar?.imageFile?.url,
            group: authorGroup,
            bio: author.bio,
          }
        : undefined
    })
    return [...allAuthors, ...(authorConfigArray ?? [])]
  }, [])

  const authorsInBrief = AUTHOR_GROUPS.reduce(
    (allAuthors: AuthorGroup[], authorGroup) => {
      const orderedAuthorField = `${authorGroup}${inputOrderSuffix}`
      const authorConfigArray = post?.[orderedAuthorField]?.map(
        (author: any) => {
          return author
            ? {
                name: author.name,
                link: `/staff/${author.id}`,
              }
            : undefined
        }
      )
      const groupName = AUTHOR_GROUP_LABEL.get(authorGroup) ?? '其他'
      return authorConfigArray?.length > 0
        ? [...allAuthors, { title: groupName, authors: authorConfigArray }]
        : allAuthors
    },
    []
  )

  const relatedPosts = post?.[`relatedPosts${inputOrderSuffix}`]?.map(
    (post: any) => {
      const imageURL = post?.heroImage?.imageFile?.url
        ? `${CMS_URL}${post.heroImage.imageFile.url}`
        : undefined
      const subSubcategory = post?.subSubcategories?.[0]
      const category = subSubcategory?.subcategory?.category

      return post
        ? {
            name: post.name,
            url: `/article/${post.slug}`,
            image: imageURL,
            desc: post.ogDescription,
            category: category?.title,
            subSubcategory: subSubcategory?.name,
            publishedDate: post.publishedDate,
            theme: GetThemeFromCategory(category),
          }
        : undefined
    }
  )

  const subSubcategory = post.subSubcategories?.[0]
  const subcategory = subSubcategory?.subcategory
  const category = subcategory?.category
  const subSubcategoryURL =
    category?.slug && subcategory?.slug && subSubcategory?.slug
      ? `/${category.slug}/${subcategory.slug}/${subSubcategory.slug}`
      : ''
  const theme = GetThemeFromCategory(subSubcategory?.slug)

  return (
    post && (
      <main className="main-container">
        <div className={`post theme-${theme}`}>
          <Sidebar />
          <HeroImage
            url={post.heroImage?.imageFile?.url} // TODO: fetch image according to RWD
            caption={post.heroCaption}
          />
          <div className="hero-section">
            <header className="entry-header">
              <Title text={post.name} subtitle={post.subtitle} />
              <div className="post-date-category">
                <PublishedDate date={post.publishedDate} />
                <Category
                  text={subSubcategory?.name}
                  link={subSubcategoryURL}
                />
              </div>
            </header>
          </div>
          <Brief content={post.brief} authors={authorsInBrief} theme={theme} />
          <Divider />
          <PostRenderer post={post} theme={theme} />
          <Tags tags={post.tags} />
          <AuthorCard authors={authors} />
        </div>
        <CallToAction />
        <RelatedPosts posts={relatedPosts ?? []} sliderTheme={theme} />
      </main>
    )
  )
}
