'use client'
// import styles from './page.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

type Post = {
  name: string
  slug: string
}

const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    axios
      .post(apiURL, {
        query: `
        query {
          posts {
            name
            slug
          }
        }
      `,
      })
      .then((res) => {
        setPosts(res?.data?.posts)
      })
  })

  return (
    <main>
      <h1>少年報導者首頁</h1>
      {posts.map((post, index) => {
        return (
          <div key={`article-${index}`}>
            <a href={`https://dev-kids.twreporter.org/${post.slug}`}>
              {post.name}
            </a>
          </div>
        )
      })}
    </main>
  )
}
