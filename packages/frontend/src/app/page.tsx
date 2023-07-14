// import styles from './page.module.css'

// TODO: fetch from graphQL
const articles = [
  'metoo-body-boundary-law',
  'university-exploratory-learning-zoo',
]

export default function Home() {
  return (
    <main>
      <h1>少年報導者首頁</h1>
      {articles.map((article, index) => {
        return (
          <div key={`article-${index}`}>
            <a href={`https://dev-kids.twreporter.org/${article}`}>
              https://dev-kids.twreporter.org/{article}
            </a>
          </div>
        )
      })}
    </main>
  )
}
