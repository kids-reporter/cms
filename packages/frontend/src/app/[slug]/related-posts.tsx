type RelatedPostsProp = {
  posts: any[]
}

export const RelatedPosts = (props: RelatedPostsProp) => {
  return (
    props?.posts?.length > 0 && (
      <div>
        <h1>TODO: 相關文章(slider)</h1>
      </div>
    )
  )
}

export default RelatedPosts
