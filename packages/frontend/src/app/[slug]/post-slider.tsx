'use client'
import './post-slider.scss'

type PostsProp = {
  posts: any[]
}

export const PostSlider = (props: PostsProp) => {
  const onPrevClick = () => {
    console.log('prev')
  }
  const onNextClick = () => {
    console.log('next')
  }

  return (
    props?.posts?.length > 0 && (
      <div className="post-slider">
        <div className="cards">
          {props.posts.map((post, index) => {
            return (
              <div key={`post-${index}`} className="post">
                <div>
                  <img src={`${post.image}`} />
                </div>
                <a href={post.categoryURL}>{post.categoryName}</a>
                {post.name}
                {post.brief}
                {post.tag}
                {post.publishedDate}
              </div>
            )
          })}
          <button className="prev-btn" onClick={onPrevClick}>
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2Z"
                fill="var(--theme-color)"
                stroke="white"
                stroke-width="3"
                stroke-miterlimit="10"
              ></path>
              <path
                d="M29.9297 39.1001L17.9359 27.0002L29.9297 14.9003"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <button className="next-btn" onClick={onNextClick}>
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52Z"
                fill="var(--theme-color)"
                stroke="white"
                stroke-width="3"
                stroke-miterlimit="10"
              ></path>
              <path
                d="M24.0703 14.8999L36.0641 26.9998L24.0703 39.0997"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
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
    )
  )
}

export default PostSlider
