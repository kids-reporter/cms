'use client'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from '@/app/icons/arrow'
import { ThemeColor } from '@/app/constants'
import './main-slider.scss'

type SliderProp = {
  posts: any[]
}

export const MainSlider = (props: SliderProp) => {
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

  return (
    <div className="main-slider">
      <div className="posts">
        {posts.map((post, index) => {
          return (
            <div key={`post-${index}`} className="post-body">
              <img src={`${post.image}`} />
              <span className="post-title">{post.name}</span>
            </div>
          )
        })}

        <button className="prev-btn" onClick={onPrevClick}>
          <ArrowLeft color={ThemeColor.YELLOW} />
        </button>
        <button className="next-btn" onClick={onNextClick}>
          <ArrowRight color={ThemeColor.YELLOW} />
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
}

export default MainSlider
