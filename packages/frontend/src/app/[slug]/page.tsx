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
  console.log(post?.name)

  return (
    <div className="post">
      <h1>Slug: {params.slug}</h1>
      <h1>Title: {post?.name}</h1>
      <hr className="dot-hr mt-18 mb-18" />
      {post && <PostRenderer post={post} />}
    </div>
  )
}
