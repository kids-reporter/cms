import axios from 'axios'
import Title from './title'
import HeroImage from './hero-image'
import PublishedDate from './published-date'
import Category from './category'
import Sidebar from './sidebar'
import Brief from './brief'
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
  GetThemeFromCategory,
} from '@/app/constants'

import './post.scss'
import '../../assets/css/button.css'
import '../../assets/css/icomoon/style.css'

// TODO: remove mockups
const editorsMockup = [
  {
    title: '文字',
    editors: [
      {
        name: '張恩瑋',
        link: 'https://kids.twreporter.org/staff/chang-en-wei/',
      },
    ],
  },
  {
    title: '設計',
    editors: [
      {
        name: '王家琛',
        link: 'https://kids.twreporter.org/staff/wang-chia-chen/',
      },
      {
        name: '黃禹禛',
        link: 'https://kids.twreporter.org/staff/hychen/',
      },
    ],
  },
  {
    title: '核稿',
    editors: [
      {
        name: '楊惠君',
        link: 'https://kids.twreporter.org/staff/jill718/',
      },
    ],
  },
  {
    title: '責任編輯',
    editors: [
      {
        name: '陳韻如',
        link: 'https://kids.twreporter.org/staff/yunruchen/',
      },
    ],
  },
]

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

  const authorsInBrief = editorsMockup

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
