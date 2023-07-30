// import styles from './page.module.css'
import axios from 'axios'
import PostSlider from './article/[slug]/post-slider'
import './page.scss'

type Post = {
  name: string
  slug: string
}

const siteURL = 'https://dev-kids.twreporter.org' // 'http://localhost:3000'
const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'
const cmsURL = 'https://dev-kids-cms.twreporter.org'

const sliderSections = [
  {
    title: '時時刻刻',
    titleURL:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_title1.svg',
    url: 'https://kids.twreporter.org/category/news/times/',
    image:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_pic1.svg',
  },
  {
    title: '真的假的',
    titleURL:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_title2.svg',
    url: 'https://kids.twreporter.org/category/news/knowledge/',
    image:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_pic2.svg',
  },
  {
    title: '讀報新聞',
    titleURL:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_title3.svg',
    url: 'https://kids.twreporter.org/category/listening-news/',
    image:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_pic3.svg',
  },
  {
    title: '他們的故事',
    titleURL:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_title4.svg',
    url: 'https://kids.twreporter.org/category/news/story/',
    image:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_pic4.svg',
  },
  {
    title: '文化看世界',
    titleURL:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_title5.svg',
    url: 'https://kids.twreporter.org/category/news/explore/',
    image:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_pic5.svg',
  },
  {
    title: '小讀者連線',
    titleURL:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_title7.svg',
    url: 'https://kids.twreporter.org/category/campus/joining/',
    image:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_pic7.svg',
  },
  {
    title: '圖解新聞',
    titleURL:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_title8.svg',
    url: 'https://kids.twreporter.org/category/comics/graphic-news/',
    image:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_pic8.svg',
  },
  {
    title: '火線新聞台',
    titleURL:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_title9.svg',
    url: 'https://kids.twreporter.org/category/comics/comic/',
    image:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/topic_pic9.svg',
  },
]

const postMockups = [
  {
    image: `${cmsURL}/images/112526a8-9bae-4985-9d37-ec67705bd706.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '1我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
  {
    image: `${cmsURL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '2我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
  {
    image: `${cmsURL}/images/112526a8-9bae-4985-9d37-ec67705bd706.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '3我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
  {
    image: `${cmsURL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '4我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
]

export default async function Home() {
  const response = await axios.post(apiURL, {
    query: `
    query {
      posts {
        name
        slug
      }
    }
  `,
  })
  const posts: Post[] = response?.data?.data?.posts
  // TODO: error handling

  return (
    <main>
      {posts?.map((post, index) => {
        return (
          <div key={`article-${index}`}>
            <a href={`${siteURL}/article/${post.slug}`}>{post.name}</a>
            <p>{post.slug}</p>
            <br />
          </div>
        )
      })}
      <h1>TODO: none sticky header</h1>
      <h1>TODO: main slider</h1>
      <h1>TODO: 新聞ing</h1>
      {sliderSections.map((section, index) => {
        return (
          <div key={`home-section-${index}`}>
            <div className="section-head">
              <img className="image-left" src={section.image} />
              <img
                className="image-title"
                src={section.titleURL}
                alt={section.title}
              />
              <a href={section.url} className="rpjr-btn rpjr-btn-theme-outline">
                看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
              </a>
            </div>
            <PostSlider posts={postMockups} />
            {/* TODO: divider */}
          </div>
        )
      })}
      <h1>TODO: 搜尋文章</h1>
      <h1>TODO: 和報導仔交朋友</h1>
      <h1>TODO: CTA</h1>
      <h1>TODO: 前往主網站</h1>
    </main>
  )
}
