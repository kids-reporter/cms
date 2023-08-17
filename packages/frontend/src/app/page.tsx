import axios from 'axios'
import { notFound } from 'next/navigation'
import { Header } from '@/app/components/header'
import MainSlider from '@/app/components/main-slider'
import PostSlider from '@/app/components/post-slider'
import { HomeDivider } from '@/app/components/divider'
import { API_URL, CMS_URL, Theme } from '@/app/constants'
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
    <main>
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
      <h1>TODO: 新聞ing</h1>
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
      <h1>TODO: 搜尋文章</h1>
      {MakeFriend}
      <h1>TODO: CTA</h1>
      {GOTOMainSite}
    </main>
  )
}

const MakeFriend = (
  <div>
    <div className="ugb-inner-block ugb-inner-block--center">
      <div className="ugb-block-content">
        <div className="ugb-columns__item ugb-662249a-content-wrapper">
          <div className="wp-block-ugb-column ugb-column ugb-0c52f71 ugb-column--design-plain ugb-main-block ugb--has-custom-content-width-tablet">
            <div className="ugb-inner-block">
              <div className="ugb-block-content">
                <div className="ugb-column__item ugb-0c52f71-column-wrapper">
                  <div className="ugb-column__content-wrapper">
                    <div>
                      <figure className="stk-img-wrapper stk-image--shape-stretch">
                        <img
                          decoding="async"
                          loading="lazy"
                          className="stk-img wp-image-4155"
                          src="https://kids.twreporter.org/wp-content/uploads/2022/10/home-cat-1.svg"
                          width="255"
                          height="300"
                        />
                      </figure>
                    </div>
                    <div>
                      <p className="stk-block-text__text has-text-color">
                        哈囉，我是「報導仔」！
                      </p>
                    </div>
                    <div>
                      <p className="stk-block-text__text has-text-color">
                        <br />
                        我是《報導者》2022年10月誕生的夥伴，在《少年報導者》擔任管家。天秤座的我重視平等、客觀，個性熱情、觀察力強。有人說我的樣子像大聲公，也有人說我像探照燈。
                        <br />
                        <br />
                        歡迎大家和我交朋友，一起探索世界。有任何想法或觀察請投稿給我，也可以寫信和我分享心得！
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wp-block-ugb-column ugb-column ugb-8a00ea4 ugb-column--design-plain ugb-main-block">
            <div className="ugb-inner-block">
              <div className="ugb-block-content">
                <div className="ugb-column__item ugb-8a00ea4-column-wrapper">
                  <div className="ugb-column__content-wrapper">
                    <div
                      className="wp-block-stackable-image stk-block-image stk--hide-tablet stk--hide-mobile stk-block stk-fdc6d15"
                      data-block-id="fdc6d15"
                    >
                      <figure className="stk-img-wrapper stk-image--shape-stretch">
                        <img
                          decoding="async"
                          loading="lazy"
                          className="stk-img wp-image-5006"
                          src="https://kids.twreporter.org/wp-content/uploads/2022/10/reporter_pic.svg"
                          width="340"
                          height="300"
                        />
                      </figure>
                    </div>
                    <div
                      className="wp-block-stackable-image stk-block-image stk--hide-desktop stk-block stk-0a7ca78"
                      data-block-id="0a7ca78"
                    >
                      <figure className="stk-img-wrapper stk-image--shape-stretch">
                        <img
                          decoding="async"
                          loading="lazy"
                          className="stk-img wp-image-5007"
                          src="https://kids.twreporter.org/wp-content/uploads/2022/10/reporter_RWD_pic.svg"
                          width="340"
                          height="300"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const GOTOMainSite = (
  <div data-block-id="f68be26">
    <div className="stk-row stk-inner-blocks stk-block-content stk-content-align stk-f68be26-column">
      <div
        className="wp-block-stackable-column stk-block-column stk-block-column--v3 stk-column stk-block-column--v2 stk-block stk-194a96e"
        data-block-id="194a96e"
      >
        <div className="stk-column-wrapper stk-block-column__content stk-container stk-194a96e-container stk--no-background stk--no-padding">
          <div className="stk-block-content stk-inner-blocks stk-194a96e-inner-blocks">
            <div
              className="wp-block-stackable-image stk-block-image stk-block stk-cd21f1d"
              data-block-id="cd21f1d"
            >
              <figure className="stk-img-wrapper stk-image--shape-stretch">
                <img
                  decoding="async"
                  loading="lazy"
                  className="stk-img wp-image-6055"
                  src="https://kids.twreporter.org/wp-content/uploads/2022/10/reporter_logo.svg"
                  width="160"
                  height="300"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div
        className="wp-block-stackable-column stk-block-column stk-block-column--v3 stk-column stk-block-column--v2 stk-block stk-9c3358c"
        data-block-id="9c3358c"
      >
        <div className="stk-column-wrapper stk-block-column__content stk-container stk-9c3358c-container stk--no-background stk--no-padding">
          <div className="stk-block-content stk-inner-blocks stk-9c3358c-inner-blocks">
            <div
              className="wp-block-stackable-heading stk-block-heading stk-block-heading--v2 stk-block stk-b2be157"
              id="前往《報導者》主網站"
              data-block-id="b2be157"
            >
              <h2 className="stk-block-heading__text has-text-align-center-mobile stk-block-heading--use-theme-margins">
                前往《報導者》主網站
              </h2>
            </div>
            <div
              className="wp-block-stackable-text stk-block-text stk-block stk-840da0e"
              data-block-id="840da0e"
            >
              <p className="stk-block-text__text">
                <span
                  style={{ color: 'var(--paletteColor4, #232323)' }}
                  className="stk-highlight"
                >
                  如果你是大人，或者還想看更進階、更深度的報導，《報導者》主網站有更多調查採訪和重磅新聞。
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="wp-block-stackable-column stk-block-column stk-block-column--v3 stk-column stk-block-column--v2 stk-block stk-24340df"
        data-block-id="24340df"
      >
        <div className="stk-column-wrapper stk-block-column__content stk-container stk-24340df-container stk--no-background stk--no-padding">
          <div className="has-text-align-center stk-block-content stk-inner-blocks stk-24340df-inner-blocks">
            <div
              className="wp-block-stackable-button-group stk-block-button-group stk-block stk-f369a4c"
              data-block-id="f369a4c"
            >
              <div className="stk-row stk-inner-blocks has-text-align-right-tablet has-text-align-center-mobile stk-block-content stk-button-group">
                <div
                  className="wp-block-stackable-button stk-block-button stk-block stk-d122ff6"
                  data-block-id="d122ff6"
                >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
