// import styles from './page.module.css'
import axios from 'axios'
import Header from './[slug]/header'
import Footer from './[slug]/footer'

type Post = {
  name: string
  slug: string
}

const siteURL = 'https://dev-kids.twreporter.org' // 'http://localhost:3000'
const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'

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
      <Header />
      {posts?.map((post, index) => {
        return (
          <div key={`article-${index}`}>
            <a href={`${siteURL}/${post.slug}`}>{post.name}</a>
            <p>{post.slug}</p>
            <br />
          </div>
        )
      })}
      <h1>TODO: none sticky header</h1>
      <h1>TODO: main slider</h1>
      <h1>TODO: 新聞ing</h1>
      <h1>TODO: 時時刻刻</h1>
      <h1>TODO: 真的假的</h1>
      <h1>TODO: 讀報新聞</h1>
      <h1>TODO: 他們的故事</h1>
      <h1>TODO: 文化看世界</h1>
      <h1>TODO: 小讀者連線</h1>
      <h1>TODO: 圖解新聞</h1>
      <h1>TODO: 火線新聞台</h1>
      <h1>TODO: 搜尋文章</h1>
      <h1>TODO: 和報導仔交朋友</h1>
      <h1>TODO: CTA</h1>
      <h1>TODO: 前往主網站</h1>
      <Footer />
    </main>
  )
}
