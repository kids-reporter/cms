import axios from 'axios'
import PostRenderer from './post-renderer'
import Title from './title'
import PublishedDate from './published-date'
import Category from './category'
import Brief from './brief'
import Divider from './divider'
import Tags from './tags'
import AuthorCard from './author-card'

import '../assets/css/post.css'
import '../assets/css/dot-hr.css'
import '../assets/css/icomoon/style.css'

const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'

// mockups
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
const tagsMockup = [
  {
    link:
      'https://kids.twreporter.org/tag/%e5%8b%95%e7%89%a9%e4%bf%9d%e8%ad%b7/',
    text: '動物保護',
  },
  {
    link:
      'https://kids.twreporter.org/tag/%e5%a4%a7%e5%ad%b8%e5%a5%bd%e5%a5%bd%e7%8e%a9/',
    text: '大學好好玩',
  },
  { link: 'https://kids.twreporter.org/tag/%e6%95%99%e8%82%b2/', text: '教育' },
  { link: 'https://kids.twreporter.org/tag/%e7%94%9f%e5%91%bd/', text: '生命' },
]

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  // TODO: error handling(params.slug, post)
  const response = await axios.post(apiURL, {
    query: `
          query($where: PostWhereUniqueInput!) {
            post(where: $where) {
              name
              brief
              content
              publishedDate
              editors {
                name
              }
            }
          }
        `,
    variables: {
      where: {
        slug: params.slug,
      },
    },
  })
  const post = response?.data?.data?.post
  post.tags = tagsMockup // TODO: find tags source
  post.editors = editorsMockup // TODO: find editors source

  return (
    post && (
      <div className="post">
        <h1>TODO: header</h1>
        <h1>TODO: 首圖</h1>
        <div className="hero-section" data-type="type-1">
          <header className="entry-header">
            <Title text={post.name as string} />
            <div className="post_date_category">
              <PublishedDate date={post?.publishedDate} />
              <Category
                text={'TODO: category'}
                link={'/category/university-exploratory-learning-teaching'}
              />
            </div>
          </header>
        </div>
        <Brief content={post.brief} editors={post.editors} />
        <h1>TODO: sidebar</h1>
        <Divider />

        {post && <PostRenderer post={post} />}
        <Tags tags={post.tags} />

        <AuthorCard />
        <h1>TODO: call to action</h1>
        <h1>TODO: 相關文章</h1>
        <h1>TODO: footer</h1>
      </div>
    )
  )
}
