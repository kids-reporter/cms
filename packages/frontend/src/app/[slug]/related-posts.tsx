type RelatedPostsProp = {
  posts: any[]
}

export const RelatedPosts = (props: RelatedPostsProp) => {
  return props?.posts?.length > 0 && <h1>TODO: 相關文章</h1>
}

export default RelatedPosts
