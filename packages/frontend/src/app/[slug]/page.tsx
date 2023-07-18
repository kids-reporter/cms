import axios from 'axios'
import PostBody from './postBody'

import '../assets/css/post.css'
import '../assets/css/dot-hr.css'
import '../assets/css/icomoon/style.css'

const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'

export default async function Article({
  params,
}: {
  params: { slug: string }
}) {
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
  // TODO: error handling
  console.log(post.name)

  return (
    <div className="post">
      <h1>Article slug: {params.slug}</h1>
      <h1>Article title: {post?.name}</h1>
      {post && <PostBody post={post} />}
      <hr className="dot-hr mt-18 mb-18" />
    </div>
  )
}
