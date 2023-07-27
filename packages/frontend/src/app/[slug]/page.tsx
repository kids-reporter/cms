import axios from 'axios'
import PostRenderer from './post-renderer'
import Header from './header'
import Title from './title'
import HeroImage from './hero-image'
import PublishedDate from './published-date'
import Category from './category'
import Sidebar from './sidebar'
import Brief from './brief'
import Divider from './divider'
import Tags from './tags'
import AuthorCard from './author-card'
import CallToAction from './call-to-action'
import RelatedPosts from './related-posts'
import BackToTop from './back-to-top'
import Footer from './footer'

import './post.scss'
import '../assets/css/button.css'
import '../assets/css/icomoon/style.css'

const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'
const cmsURL = 'https://dev-kids-cms.twreporter.org'

// mockups
const categoryMockup = {
  text: '大學好好玩',
  link: '/category/university-exploratory-learning-teaching',
}
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
const authorsMockup = [
  {
    name: '張恩瑋',
    group: '文字',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/預設頭像_2.png',
    desc:
      '就讀台大動物科學技術學系並雙主修創新領域學士學位學程。因為高中時期與台大乳牛們的相遇，從此步入動物領域這條不歸路，在大一下藉由探索學習計畫前往六福村及原野馬場實習，並進入分子生物研究室向學長姐學習，重新調整面對動物時的心態。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '王家琛',
    group: '設計',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/預設頭像_2.png',
    desc:
      '設計系畢業的插畫及手刺繡工作者，喜歡將生活中的見聞以不同媒材紀錄。理性設計；感性創作。透過雙手把模糊的感知化作具體圖像進行溝通，引導觀者走進故事。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '黃禹禛',
    group: '設計',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_4_黃禹禛.png',
    desc:
      '從新聞系半路出家的設計師，主要任務是把複雜的資訊變成好懂、好讀的圖像。轉化故事不太容易，但我會繼續努力！',
    link: '/staff/chang-en-wei',
  },
  {
    name: '楊惠君',
    group: '總監',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_1_楊惠君.png',
    desc:
      '從沒有手機和電腦的時代開始當記者。記者是挖礦人、是點燈人、是魔術師──要挖掘世界的不堪，為喪志的人點燈，將悲傷的事幻化成美麗的彩虹⋯⋯常常會失敗，但不能放棄去做到。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '陳韻如',
    group: '編輯',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_6_陳韻如.png',
    desc:
      '新聞系畢業後，就投入編輯這份工作，非常努力讓每一篇報導都美美的呈現在讀者面前，希望你也喜歡這篇文章。',
    link: '/staff/chang-en-wei',
  },
]

const postQuery = `
  query($where: PostWhereUniqueInput!) {
    post(where: $where) {
      name
      brief
      content
      publishedDate
      editors {
        name
      }
      heroImage {
        imageFile {
          url
        }
      }
      heroCaption
      relatedPosts {
        name
        slug
        publishedDate
        brief
        heroImage {
          imageFile {
            url
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
  const response = params?.slug
    ? await axios.post(apiURL, {
        query: postQuery,
        variables: {
          where: {
            slug: params.slug,
          },
        },
      })
    : undefined

  const post = response?.data?.data?.post
  post.category = categoryMockup // TODO: find category source
  post.tags = tagsMockup // TODO: find tags source
  post.editors = editorsMockup // TODO: find editors source
  post.theme = 'yellow'
  post.authors = authorsMockup // TODO: find editors source

  return (
    post && (
      <div className="page">
        <Header />
        <Sidebar />
        <div className={`post theme-${post.theme}`}>
          {true && (
            <>
              <HeroImage
                url={`${cmsURL}${post.heroImage?.imageFile?.url}`}
                caption={post.heroCaption}
              />
              <div className="hero-section" data-type="type-1">
                <header className="entry-header">
                  <Title text={post.name as string} />
                  <div className="post_date_category">
                    <PublishedDate date={post?.publishedDate} />
                    <Category
                      text={post.category.text}
                      link={post.category.link}
                    />
                  </div>
                </header>
              </div>
              <Brief content={post.brief} editors={post.editors} />

              <Divider />

              <PostRenderer post={post} />
              <Tags tags={post.tags} />
              <AuthorCard authors={post.authors} />
            </>
          )}
        </div>

        <CallToAction />
        <RelatedPosts posts={post.relatedPosts} />
        <Footer />
        <BackToTop />
      </div>
    )
  )
}
