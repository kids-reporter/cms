import axios from 'axios'
import { notFound } from 'next/navigation'
import Title from './title'
import HeroImage from './hero-image'
import { NewsReading } from './news-reading'
import PublishedDate from './published-date'
import Category from './category'
import { Sidebar, MobileSidebar } from './sidebar'
import Brief, { AuthorGroup } from './brief'
import PostRenderer from './post-renderer'
import CallToAction from './call-to-action'
import RelatedPosts from './related-posts'
import Tags from '@/app/components/tags'
import AuthorCard, { Author } from '@/app/components/author-card'
import Divider from '@/app/components/divider'
import { API_URL, AUTHOR_ROLES_IN_ORDER, CMS_URL } from '@/app/constants'
import { GetThemeFromCategory } from '@/app/utils'
import './page.scss'

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

const categoryGQL = `
  subSubcategories {
    name
    slug
    subcategory {
      slug
      category {
        name
        slug
      }
    }
  }
`

const postQueryGQL = `
  query($where: PostWhereUniqueInput!) {
    post(where: $where) {
      title
      newsReadingGroup {
        items {
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
          imageFile {
            url
          }
        }
        bio
        id
        name
        slug
      }
      authorsJSON
      tags {
        name
        slug
      }
      relatedPosts {
        title
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

// TODO: add pageMap for google indexing/search
export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  let response
  try {
    response = params?.slug
      ? await axios.post(API_URL, {
          query: postQueryGQL,
          variables: {
            where: {
              slug: params.slug,
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

  // TODO: show authors according to json
  // Assemble ordered authors
  const authorsJSON = post?.authorsJSON
  const authors = post?.authors?.map((author: any) => {
    const authorJSON = authorsJSON.find((a: any) => a.id === author?.id)
    return author && authorJSON
      ? {
          id: author.id,
          name: author.name,
          avatar: author.avatar?.imageFile?.url,
          bio: author.bio,
          role: authorJSON.role,
          link: authorJSON.type === 'link' ? `/staff/${author.id}` : undefined,
        }
      : undefined
  })
  const orderedAuthors: Author[] = []
  const orderedAuthorsInBrief: AuthorGroup[] = []
  AUTHOR_ROLES_IN_ORDER.forEach((authorRole) => {
    const authorsOfRole = authors.filter(
      (author: any) => authorRole === author?.role && author?.link
    )
    orderedAuthors.push(...(authorsOfRole ?? []))
    authorsOfRole?.length > 0 &&
      orderedAuthorsInBrief.push({
        title: authorRole,
        authors: [...(authorsOfRole ?? [])],
      })
  })

  const relatedPosts = post?.relatedPosts?.map((post: any) => {
    const imageURL = post?.heroImage?.imageFile?.url
      ? `${CMS_URL}${post.heroImage.imageFile.url}`
      : undefined
    const subSubcategory = post?.subSubcategories?.[0]
    const category = subSubcategory?.subcategory?.category

    return post
      ? {
          title: post.title,
          url: `/article/${post.slug}`,
          image: imageURL,
          desc: post.ogDescription,
          category: category?.name,
          subSubcategory: subSubcategory?.name,
          publishedDate: post.publishedDate,
          theme: GetThemeFromCategory(category),
        }
      : undefined
  })

  const subSubcategory = post.subSubcategories?.[0]
  const subcategory = subSubcategory?.subcategory
  const category = subcategory?.category
  const subSubcategoryURL =
    category?.slug && subcategory?.slug && subSubcategory?.slug
      ? `/category/${category.slug}/${subcategory.slug}/${subSubcategory.slug}`
      : ''
  const theme = GetThemeFromCategory(subSubcategory?.slug)

  return (
    post && (
      <main className="container">
        <div className={`post theme-${theme}`}>
          <Sidebar />
          <MobileSidebar />
          <HeroImage
            url={post.heroImage?.imageFile?.url} // TODO: fetch image according to RWD
            caption={post.heroCaption}
          />
          <div className="hero-section">
            <header className="entry-header">
              <Title text={post.title} subtitle={post.subtitle} />
              <div className="post-date-category">
                <PublishedDate date={post.publishedDate} />
                <Category
                  text={subSubcategory?.name}
                  link={subSubcategoryURL}
                />
              </div>
            </header>
          </div>
          {post.newsReadingGroup && (
            <NewsReading data={post.newsReadingGroup} />
          )}
          <Brief
            content={post.brief}
            authors={orderedAuthorsInBrief}
            theme={theme}
          />
          <Divider />
          <PostRenderer post={post} theme={theme} />
          <Tags title={'常用關鍵字'} tags={post.tags} />
          <AuthorCard title="誰幫我們完成這篇文章" authors={orderedAuthors} />
        </div>
        <CallToAction />
        <RelatedPosts posts={relatedPosts ?? []} sliderTheme={theme} />
      </main>
    )
  )
}
