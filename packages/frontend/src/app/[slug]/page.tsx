import axios from 'axios'
import PostRenderer from './post-renderer'

import '../assets/css/post.css'
import '../assets/css/dot-hr.css'
import '../assets/css/icomoon/style.css'

const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  // TODO: error handling(params.slug, post)
  const response = await axios.post(apiURL, {
    query: `
          query($where: PostWhereUniqueInput!) {
            post(where: $where) {
              name
              brief
              content
              publishedDate
              editors {
                name
              }
            }
          }
        `,
    variables: {
      where: {
        slug: params.slug,
      },
    },
  })

  const getFormattedDate = (date: string): string => {
    const dateObj = new Date(date)
    const year = dateObj?.getFullYear()
    const month = `${dateObj?.getMonth() + 1}`.padStart(2, '0')
    const day = `${dateObj?.getDay() + 1}`.padStart(2, '0')
    return [year, month, day].join('.')
  }

  const post = response?.data?.data?.post
  const postDate = getFormattedDate(post?.publishedDate)

  return (
    post && (
      <div className="post">
        <h1>TODO: header</h1>
        <h1>TODO: 首圖</h1>
        <div className="hero-section" data-type="type-1">
          <header className="entry-header">
            <h1 className="page-title">{post.name}</h1>
            <div className="post_date_category">
              <div className="post_date">刊出日期 {postDate}</div>
              <div className="post_primary_category">
                <a
                  href="/category/university-exploratory-learning-teaching"
                  className="rpjr-btn rpjr-btn-theme"
                >
                  TODO: category
                </a>
              </div>
            </div>
          </header>
        </div>
        <div className="post-intro">
          {post.brief?.blocks?.map(
            (block: any, index: number) =>
              block?.text && (
                <p key={`brief-paragraph-${index}`}>{block.text}</p>
              )
          )}
        </div>
        <h1>TODO: brief author</h1>
        <h1>TODO: sidebar</h1>

        <hr className="dot-hr mt-18 mb-18" />

        {post && <PostRenderer post={post} />}
        <h1>TODO: 關鍵字</h1>
        <h1>TODO: 誰幫我們完成這篇文章</h1>
        <h1>TODO: call to action</h1>
        <h1>TODO: 相關文章</h1>
        <h1>TODO: footer</h1>
      </div>
    )
  )
}
