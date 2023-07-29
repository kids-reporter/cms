import PostSlider from './post-slider'

const cmsURL = 'https://dev-kids-cms.twreporter.org'
const postMockup = [
  {
    image: `${cmsURL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
  {
    image: `${cmsURL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
  {
    image: `${cmsURL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
  {
    image: `${cmsURL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
  {
    image: `${cmsURL}/images/d98c9c2b-13e6-4923-8aa7-275e7362a292.jpg`,
    categoryName: '校園寶可夢',
    categoryURL: 'https://kids.twreporter.org/category/campus',
    name: '我在動物園上課的3個月，讓我立志想成為設計動物園展場的人',
    brief:
      '台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。',
    tag: '動物',
    publishedDate: '2023-07-06T16:00:00.000Z',
  },
]

export const RelatedPosts = () => {
  return (
    <div className="related-post-container">
      <h3 className="ct-block-title">
        <img
          src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/post-related-post-title.svg"
          alt="相關文章"
        />
      </h3>
      <PostSlider posts={postMockup} />
    </div>
  )
}

export default RelatedPosts
