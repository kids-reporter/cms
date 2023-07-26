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
          {props.posts.map((post, index) => {
            return (
              <div key={`related-post-${index}`} className="related-post">
                <div>
                  <img src={`${cmsURL}${post.heroImage?.imageFile?.url}`} />
                </div>
                {post.name}
                {post.publishedDate}
              </div>
            )
          })}

          <div className="bullets">
            <button className="bullet">&nbsp;</button>
            <button className="bullet active">&nbsp;</button>
            <button className="bullet">&nbsp;</button>
            <button className="bullet">&nbsp;</button>
            <button className="bullet">&nbsp;</button>
            <button className="bullet">&nbsp;</button>
          </div>
        </div>
      </div>
    )
  )
}

export default RelatedPosts
