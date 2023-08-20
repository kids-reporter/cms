import axios from 'axios'
import { notFound } from 'next/navigation'
import { Header } from '@/app/components/header'
import MainSlider from '@/app/components/main-slider'
import PostSlider from '@/app/components/post-slider'
import Tags from '@/app/components/tags'
import { HomeDivider } from '@/app/components/divider'
import { API_URL, CMS_URL, Theme } from '@/app/constants'
import { MOCKUP_TAGS } from './mockup'

import './page.scss'

type Post = {
  name: string
  slug: string
}

const sliderSections = [
  {
    title: '時時刻刻',
    titleURL: 'topic_title1.svg',
    url: 'https://kids.twreporter.org/category/news/times/',
    image: 'topic_pic1.svg',
    theme: Theme.BLUE,
  },
  {
    title: '真的假的',
    titleURL: 'topic_title2.svg',
    url: 'https://kids.twreporter.org/category/news/knowledge/',
    image: 'topic_pic2.svg',
    theme: Theme.BLUE,
  },
  {
    title: '讀報新聞',
    titleURL: 'topic_title3.svg',
    url: 'https://kids.twreporter.org/category/listening-news/',
    image: 'topic_pic3.svg',
    theme: Theme.BLUE,
  },
  {
    title: '他們的故事',
    titleURL: 'topic_title4.svg',
    url: 'https://kids.twreporter.org/category/news/story/',
    image: 'topic_pic4.svg',
    theme: Theme.RED,
  },
  {
    title: '文化看世界',
    titleURL: 'topic_title5.svg',
    url: 'https://kids.twreporter.org/category/news/explore/',
    image: 'topic_pic5.svg',
    theme: Theme.RED,
  },
  {
    title: '小讀者連線',
    titleURL: 'topic_title7.svg',
    url: 'https://kids.twreporter.org/category/campus/joining/',
    image: 'topic_pic7.svg',
    theme: Theme.YELLOW,
  },
  {
    title: '圖解新聞',
    titleURL: 'topic_title8.svg',
    url: 'https://kids.twreporter.org/category/comics/graphic-news/',
    image: 'topic_pic8.svg',
    theme: Theme.YELLOW,
  },
  {
    title: '火線新聞台',
    titleURL: 'topic_title9.svg',
    url: 'https://kids.twreporter.org/category/comics/comic/',
    image: 'topic_pic9.svg',
    theme: Theme.YELLOW,
  },
]

// TODO: remove mockups
const postMockups = [
  {
    url: '',
    image: `${CMS_URL}/images/112526a8-9bae-4985-9d37-ec67705bd706.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '1我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
  {
    url: '',
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '2我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.YELLOW,
  },
  {
    url: '',
    image: `${CMS_URL}/images/112526a8-9bae-4985-9d37-ec67705bd706.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '3我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.RED,
  },
  {
    url: '',
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '4我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
]

const postMockupsMore = [
  {
    url: '',
    image: `${CMS_URL}/images/112526a8-9bae-4985-9d37-ec67705bd706.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '1我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
  {
    url: '',
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '2我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.YELLOW,
  },
  {
    url: '',
    image: `${CMS_URL}/images/112526a8-9bae-4985-9d37-ec67705bd706.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '3我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.RED,
  },
  {
    url: '',
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '4我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
  {
    url: '',
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '4我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
  {
    url: '',
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    category: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '4我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    desc: '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    subSubcategory: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
]

export default async function Home() {
  let response
  try {
    response = await axios.post(API_URL, {
      query: `
      query {
        posts {
          name
          slug
        }
      }
    `,
    })
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }
  const posts: Post[] = response?.data?.data?.posts

  return (
    <main className="home">
      {
        /* TODO: remove list */ false &&
          posts?.map((post, index) => {
            const siteURL = 'https://dev-kids.twreporter.org' // 'http://localhost:3000'
            return (
              <div key={`article-${index}`}>
                <a href={`${siteURL}/article/${post.slug}`}>{post.name}</a>
                <p>{post.slug}</p>
                <br />
              </div>
            )
          })
      }
      <Header />
      <MainSlider posts={postMockupsMore} />
      <h1>TODO: 精選文章</h1>
      {sliderSections.map((section, index) => {
        return (
          <div className="section" key={`home-section-${index}`}>
            <div className="section-head">
              <img className="image-left" src={`/images/${section.image}`} />
              <img
                className="image-title"
                src={`/images/${section.titleURL}`}
                alt={section.title}
              />
              <a href={section.url} className="rpjr-btn rpjr-btn-theme-outline">
                看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
              </a>
            </div>
            <PostSlider
              posts={
                index % 2
                  ? postMockups
                  : postMockupsMore /* TODO: remove mockup */
              }
              sliderTheme={section.theme}
            />
            {index < sliderSections.length - 1 ? <HomeDivider /> : null}
          </div>
        )
      })}
      <div className="search">
        <img
          decoding="async"
          src="/images/search_title.svg"
          width="265"
          height="300"
        />
        <form
          role="search"
          method="get"
          className="search-form"
          action="https://kids.twreporter.org/"
          aria-haspopup="listbox"
        >
          <input
            type="search"
            placeholder="搜尋更多新聞、議題"
            value=""
            name="s"
            title="Search for..."
            aria-label="Search for..."
          />
          <button type="submit" className="search-submit" aria-label="搜尋按鈕">
            <svg className="ct-icon" width="15" height="15" viewBox="0 0 15 15">
              <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7zM1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
            </svg>
            <span data-loader="circles">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <input type="hidden" name="post_type" value="post" />
        </form>
        <Tags tags={MOCKUP_TAGS} />
      </div>
      <div className="make-friend">
        <div className="content">
          <h3>和報導仔交朋友</h3>
          <p className="stk-block-text__text has-text-color">
            哈囉，我是「報導仔」！
          </p>
          <p className="stk-block-text__text has-text-color">
            <br />
            我是《報導者》2022年10月誕生的夥伴，在《少年報導者》擔任管家。天秤座的我重視平等、客觀，個性熱情、觀察力強。有人說我的樣子像大聲公，也有人說我像探照燈。
            <br />
            <br />
            歡迎大家和我交朋友，一起探索世界。有任何想法或觀察請投稿給我，也可以寫信和我分享心得！
          </p>
        </div>
      </div>
      <h1>TODO: CTA</h1>
      <div className="goto">
        <img
          decoding="async"
          loading="lazy"
          className="stk-img wp-image-6055"
          src="https://kids.twreporter.org/wp-content/uploads/2022/10/reporter_logo.svg"
          width="160"
          height="300"
        />
        <div>
          <h2 className="stk-block-heading__text has-text-align-center-mobile stk-block-heading--use-theme-margins">
            前往《報導者》主網站
          </h2>
          <p className="stk-block-text__text">
            <span
              style={{ color: 'var(--paletteColor4, #232323)' }}
              className="stk-highlight"
            >
              如果你是大人，或者還想看更進階、更深度的報導，《報導者》主網站有更多調查採訪和重磅新聞。
            </span>
          </p>
        </div>
        <a
          className="stk-link stk-button stk--hover-effect-darken"
          href="https://www.twreporter.org/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className="has-text-color stk-button__inner-text">
            前往報導者
          </span>
        </a>
      </div>
    </main>
  )
}
