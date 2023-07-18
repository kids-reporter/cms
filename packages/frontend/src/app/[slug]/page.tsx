import axios from 'axios'
import PostRenderer from './post-renderer'

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

type TitleProp = {
  text: string
}

const Title = (props: TitleProp) => {
  return <h1 className="page-title">{props.text}</h1>
}

type DateProp = {
  date: string
}

const PublishedDate = (props: DateProp) => {
  const getFormattedDate = (date: string): string => {
    const dateObj = new Date(date)
    const year = dateObj?.getFullYear()
    const month = `${dateObj?.getMonth() + 1}`.padStart(2, '0')
    const day = `${dateObj?.getDay() + 1}`.padStart(2, '0')
    return [year, month, day].join('.')
  }
  return (
    <div className="post_date">刊出日期 {getFormattedDate(props.date)}</div>
  )
}

type CategoryProp = {
  text: string
  link: string
}

const Category = (props: CategoryProp) => {
  return (
    <div className="post_primary_category">
      <a className="rpjr-btn rpjr-btn-theme" href={props.link}>
        {props.text}
      </a>
    </div>
  )
}

type BriefProp = {
  content: any
}

const Brief = (props: BriefProp) => {
  // TODO: brief author
  return (
    <div className="post-intro">
      {props.content?.blocks?.map(
        (block: any, index: number) =>
          block?.text && <p key={`brief-paragraph-${index}`}>{block.text}</p>
      )}
    </div>
  )
}

const Divider = () => {
  return <hr className="dot-hr mt-18 mb-18" />
}

type Tag = {
  text: string
  link: string
}

type TagsProp = {
  tags: Tag[]
}

const Tags = (props: TagsProp) => {
  return (
    <div className="rpjr-post-tags">
      <h3 className="rpjr-post-tags__heading">
        <i className="icon-rpjr-icon-tag">
          <i className="path1 text-color-theme"></i>
          <i className="path2"></i>
        </i>
        &nbsp;&nbsp;常用關鍵字
      </h3>
      <div className="rpjr-post-tags__box">
        {props?.tags.map((tag, index) => {
          return (
            <a
              key={`post-tag-${index}`}
              className="rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag"
              href={tag.link}
            >
              #&nbsp;{tag.text}
            </a>
          )
        })}
      </div>
    </div>
  )
}
