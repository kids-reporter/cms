import axios from 'axios'
import PostRenderer from './postRenderer'

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
            }
          }
        `,
    variables: {
      where: {
        slug: params.slug,
      },
    },
  })
  const post = response?.data?.data?.post

  return (
    <div className="post">
      <h1>TODO: header</h1>
      <h1>TODO: 首圖</h1>
      <h1>TODO: {post?.name}</h1>
      <h1>TODO: brief</h1>
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
}
