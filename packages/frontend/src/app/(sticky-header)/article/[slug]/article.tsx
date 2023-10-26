'use client'
import { useState } from 'react'
import { ArticleContext } from './article-context'
import Title from './title'
import HeroImage from './hero-image'
import { NewsReading } from './news-reading'
import PublishedDate from './published-date'
import SubSubcategory from './subSubcategory'
import { Sidebar, MobileSidebar } from './sidebar'
import Brief, { AuthorGroup } from './brief'
import PostRenderer from './post-renderer'
import CallToAction from './call-to-action'
import RelatedPosts from './related-posts'
import Tags from '@/app/components/tags'
import AuthorCard, { Author } from '@/app/components/author-card'
import Divider from '@/app/components/divider'
import {
  AUTHOR_ROLES_IN_ORDER,
  CMS_URL,
  DEFAULT_AVATAR,
  FontSizeLevel,
} from '@/app/constants'
import { GetPostSummaries, GetThemeFromCategory } from '@/app/utils'
import './article.scss'

const getPostContents = (post: any) => {
  // Assemble authors for brief
  const authorsJSON = post?.authorsJSON
  const authorsInBrief: AuthorGroup[] = []
  let currentAuthorRole = '',
    currentAuthors: { name: string; link: string }[] = []
  authorsJSON?.forEach((authorJSON: any, index: number) => {
    const author = post?.authors?.find((a: any) => a?.id === authorJSON?.id)
    if (index === 0 || authorJSON.role === authorsJSON[index - 1]?.role) {
      currentAuthorRole = authorJSON.role
      currentAuthors.push({
        name: authorJSON.name,
        link: author ? `/author/${author.slug}` : '',
      })
    } else {
      authorsInBrief.push({ title: currentAuthorRole, authors: currentAuthors })
      currentAuthorRole = authorJSON.role
      currentAuthors = [
        { name: authorJSON.name, link: author ? `/author/${author.slug}` : '' },
      ]
    }

    if (index === authorsJSON?.length - 1) {
      authorsInBrief.push({ title: currentAuthorRole, authors: currentAuthors })
    }
  })

  // Assemble ordered authors for AuthorCard
  const authors = post?.authors?.map((author: any) => {
    const authorJSON = authorsJSON.find(
      (authorJSON: any) => authorJSON.id === author?.id
    )
    const avatarURL = author?.avatar?.imageFile?.url
    return author && authorJSON
      ? {
          slug: author.slug,
          name: author.name,
          avatar: avatarURL ? `${CMS_URL}${avatarURL}` : DEFAULT_AVATAR,
          bio: author.bio,
          role: authorJSON.role,
          link:
            authorJSON.type === 'link' ? `/author/${author.slug}` : undefined,
        }
      : undefined
  })
  const orderedAuthors: Author[] = []
  AUTHOR_ROLES_IN_ORDER.forEach((authorRole) => {
    const authorsOfRole = authors?.filter(
      (author: any) =>
        author?.role?.match(new RegExp(`^${authorRole}(、)?`)) && author?.link
    )
    orderedAuthors.push(...(authorsOfRole ?? []))
  })

  // Topic related data
  const topic = post?.projects?.[0]
  const topicURL = topic?.slug ? `/topic/${topic.slug}` : undefined

  // Related posts data: related posts or topic's related post
  let relatedPosts: any[] = []
  if (post?.relatedPosts?.length > 0) {
    relatedPosts = GetPostSummaries(post.relatedPosts)
  } else if (topic?.relatedPosts?.length > 0) {
    relatedPosts = GetPostSummaries(topic.relatedPosts)
  }

  // Subcategory related data
  const subSubcategory = post?.subSubcategories?.[0]
  const subcategory = subSubcategory?.subcategory
  const category = subcategory?.category
  const subSubcategoryURL =
    category?.slug && subcategory?.slug && subSubcategory?.slug
      ? `/category/${category.slug}/${subcategory.slug}/${subSubcategory.slug}`
      : ''
  const theme = GetThemeFromCategory(category?.slug)

  return {
    theme,
    topicURL,
    topic,
    subSubcategory,
    subSubcategoryURL,
    authorsInBrief,
    orderedAuthors,
    relatedPosts,
  }
}

export const Article = ({ post }: { post: any }) => {
  const {
    theme,
    topicURL,
    topic,
    subSubcategory,
    subSubcategoryURL,
    authorsInBrief,
    orderedAuthors,
    relatedPosts,
  } = getPostContents(post)

  const [fontSize, setFontSize] = useState<FontSizeLevel>(FontSizeLevel.NORMAL)
  const onFontSizeChange = () => {
    setFontSize(
      fontSize === FontSizeLevel.NORMAL
        ? FontSizeLevel.LARGE
        : FontSizeLevel.NORMAL
    )
  }

  return (
    <>
      <div className={`post${theme ? ` theme-${theme}` : ''}`}>
        <ArticleContext.Provider value={{ fontSize, onFontSizeChange }}>
          <Sidebar topicURL={topicURL} />
          <MobileSidebar topicURL={topicURL} />
          {topicURL && (
            <div className="topic-breadcrumb">
              <a href={topicURL}>
                <img src="/assets/images/topic-breadcrumb-icon.svg" />
                {topic?.title}
              </a>
            </div>
          )}
          <HeroImage
            url={post?.heroImage?.imageFile?.url} // TODO: fetch image according to RWD
            caption={post?.heroCaption}
          />
          {post && (
            <div className="hero-section">
              <header className="entry-header">
                <Title
                  text={post.title}
                  subtitle={post.subtitle}
                  fontSize={fontSize}
                />
                <div className="post-date-category">
                  <PublishedDate date={post.publishedDate} />
                  <SubSubcategory
                    text={subSubcategory?.name}
                    link={subSubcategoryURL}
                  />
                </div>
              </header>
            </div>
          )}
          {post?.newsReadingGroup && (
            <NewsReading data={post.newsReadingGroup} />
          )}
          <Brief content={post?.brief} authors={authorsInBrief} theme={theme} />
          <Divider />
          <PostRenderer post={post} theme={theme} />
          {post?.tags && <Tags title={'常用關鍵字'} tags={post.tags} />}
          <AuthorCard title="誰幫我們完成這篇文章" authors={orderedAuthors} />
        </ArticleContext.Provider>
      </div>
      <CallToAction />
      <RelatedPosts posts={relatedPosts ?? []} sliderTheme={theme} />
    </>
  )
}

export default Article
