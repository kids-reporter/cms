'use client'
import { useState } from 'react'
import { GetFormattedDate } from '@/app/utils'
import './post-slider.scss'

type PostsProp = {
  posts: any[]
}

export const PostSlider = (props: PostsProp) => {
  const posts = props?.posts
  const postNum = posts?.length
  const [current, setCurrent] = useState(0)

  const onPrevClick = () => {
    setCurrent(current - 1 >= 0 ? current - 1 : postNum - 1)
  }

  const onNextClick = () => {
    setCurrent((current + 1) % postNum)
  }

  const onBulletClick = (index: number) => {
    setCurrent(index)
  }

  const getSlides = () => {
    const slides =
      postNum <= 2
        ? [...posts]
        : [
            posts[current],
            posts[(current + 1) % postNum],
            posts[(current + 2) % postNum],
          ]

    return slides.map((post, index) => {
      return (
        <a key={`post-${index}`} href={post.url} className="post-body">
          <img src={`${post.image}`} />
          <span className="post-category">{post.categoryName}</span>
          <span className="post-title">{post.name}</span>
          <span className="post-brief">{post.brief}</span>
          <div className="post-bottom">
            <span className="tag">{post.tag}</span>
            <span className="published-date">
              {GetFormattedDate(post.publishedDate) ?? ''}
            </span>
          </div>
        </a>
      )
    })
  }

  return (
    posts?.length > 0 && (
      <div className="post-slider">
        <div className="cards">
          {getSlides()}
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
          {posts.map((post, index) => {
            return (
              <button
                className={index === current ? 'active' : ''}
                key={`bullet-${index}`}
                onClick={() => onBulletClick(index)}
              />
            )
          })}
        </div>
      </div>
    )
  )
}

export default PostSlider
