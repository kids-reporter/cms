import './related-post.scss'

type RelatedPostsProp = {
  posts: any[]
}

const cmsURL = 'https://dev-kids-cms.twreporter.org'

export const RelatedPosts = (props: RelatedPostsProp) => {
  return (
    props?.posts?.length > 0 && (
      <div className="related-post-container">
        <h3 className="ct-block-title">
          <img
            src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/post-related-post-title.svg"
            alt="相關文章"
          />
        </h3>

        <div className="related-post-slider">
          <div className="cards">
            {props.posts.map((post, index) => {
              return (
                <div key={`related-post-${index}`} className="post">
                  <div>
                    <img src={`${cmsURL}${post.heroImage?.imageFile?.url}`} />
                  </div>
                  {post.name}
                  {post.publishedDate}
                </div>
              )
            })}
          </div>
          <div className="bullets">
            <button>&nbsp;</button>
            <button className="active">&nbsp;</button>
            <button>&nbsp;</button>
            <button>&nbsp;</button>
            <button>&nbsp;</button>
            <button>&nbsp;</button>
          </div>
        </div>
      </div>
    )
  )
}

export default RelatedPosts
