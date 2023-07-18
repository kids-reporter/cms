import axios from 'axios'
import PostRenderer from './post-renderer'
import Title from './title'
import PublishedDate from './published-date'
import Category from './category'
import Brief from './brief'
import Divider from './divider'
import Tags from './tags'

import '../assets/css/post.css'
import '../assets/css/dot-hr.css'
import '../assets/css/icomoon/style.css'

const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'
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
        <Brief content={post.brief} />
        <h1>TODO: sidebar</h1>
        <Divider />

        {post && <PostRenderer post={post} />}

        <Tags tags={post.tags} />
        <h1>TODO: 誰幫我們完成這篇文章</h1>
        <h1>TODO: call to action</h1>
        <h1>TODO: 相關文章</h1>
        <h1>TODO: footer</h1>
      </div>
    )
  )
}
