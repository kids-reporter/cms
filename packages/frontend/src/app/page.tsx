// import styles from './page.module.css'
import axios from 'axios'

type Post = {
  name: string
  slug: string
}

const siteURL = 'http://localhost:3000' // 'https://dev-kids.twreporter.org'
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
  console.log(response, posts)

  return (
    <main>
      <h1>少年報導者首頁</h1>
      {posts?.map((post, index) => {
        return (
          <div key={`article-${index}`}>
            <a href={`${siteURL}/${post.slug}`}>{post.name}</a>
            <p>{post.slug}</p>
            <br />
          </div>
        )
      })}
    </main>
  )
}
