import { CMS_URL, Theme } from '@/app/constants'
export const editorsMockup = [
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
export const categoryMockup = {
  text: '大學好好玩',
  link: '/category/university-exploratory-learning-teaching',
}
export const authorsMockup = [
  {
    name: '張恩瑋',
    group: '文字',
    theme: 'theme-blue',
    img: 'https://kids.twreporter.org/wp-content/uploads/2022/10/預設頭像_2.png',
    desc: '就讀台大動物科學技術學系並雙主修創新領域學士學位學程。因為高中時期與台大乳牛們的相遇，從此步入動物領域這條不歸路，在大一下藉由探索學習計畫前往六福村及原野馬場實習，並進入分子生物研究室向學長姐學習，重新調整面對動物時的心態。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '王家琛',
    group: '設計',
    theme: 'theme-yellow',
    img: 'https://kids.twreporter.org/wp-content/uploads/2022/10/預設頭像_2.png',
    desc: '設計系畢業的插畫及手刺繡工作者，喜歡將生活中的見聞以不同媒材紀錄。理性設計；感性創作。透過雙手把模糊的感知化作具體圖像進行溝通，引導觀者走進故事。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '黃禹禛',
    group: '設計',
    theme: 'theme-yellow',
    img: 'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_4_黃禹禛.png',
    desc: '從新聞系半路出家的設計師，主要任務是把複雜的資訊變成好懂、好讀的圖像。轉化故事不太容易，但我會繼續努力！',
    link: '/staff/chang-en-wei',
  },
  {
    name: '楊惠君',
    group: '核稿',
    theme: 'theme-blue',
    img: 'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_1_楊惠君.png',
    desc: '從沒有手機和電腦的時代開始當記者。記者是挖礦人、是點燈人、是魔術師──要挖掘世界的不堪，為喪志的人點燈，將悲傷的事幻化成美麗的彩虹⋯⋯常常會失敗，但不能放棄去做到。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '陳韻如',
    group: '責任編輯',
    theme: 'theme-red',
    img: 'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_6_陳韻如.png',
    desc: '新聞系畢業後，就投入編輯這份工作，非常努力讓每一篇報導都美美的呈現在讀者面前，希望你也喜歡這篇文章。',
    link: '/staff/chang-en-wei',
  },
]
export const tagsMockup = [
  {
    link: 'https://kids.twreporter.org/tag/%e5%8b%95%e7%89%a9%e4%bf%9d%e8%ad%b7/',
    text: '動物保護',
  },
  {
    link: 'https://kids.twreporter.org/tag/%e5%a4%a7%e5%ad%b8%e5%a5%bd%e5%a5%bd%e7%8e%a9/',
    text: '大學好好玩',
  },
  { link: 'https://kids.twreporter.org/tag/%e6%95%99%e8%82%b2/', text: '教育' },
  { link: 'https://kids.twreporter.org/tag/%e7%94%9f%e5%91%bd/', text: '生命' },
]
export const relatedPostMockup = [
  {
    image: `${CMS_URL}/images/112526a8-9bae-4985-9d37-ec67705bd706.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    title: '1我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
  {
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    title: '2我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.YELLOW,
  },
  {
    image: `${CMS_URL}/images/112526a8-9bae-4985-9d37-ec67705bd706.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    title: '3我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.RED,
  },
  {
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    title: '4我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
  {
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    title: '4我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
  {
    image: `${CMS_URL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    title: '4我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
    theme: Theme.BLUE,
  },
]

export const MOCKUP_TAGS = [
  {
    name: '兒少',
    slug: '兒少',
  },
  {
    name: '國際',
    slug: '國際',
  },
  {
    name: 'HPV',
    slug: 'HPV',
  },
  {
    name: '兒少',
    slug: '兒少',
  },
  {
    name: '國際',
    slug: '國際',
  },
  {
    name: 'HPV',
    slug: 'HPV',
  },
  {
    name: '兒少',
    slug: '兒少',
  },
  {
    name: '國際',
    slug: '國際',
  },
  {
    name: 'HPV',
    slug: 'HPV',
  },
]
