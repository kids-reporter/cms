'use client'
// import { useEffect, useState } from 'react'
// import { ArrowLeft, ArrowRight } from '@/app/icons/arrow'
import { Theme } from '@/app/constants'
// import { GetFormattedDate, GetThemeColor, ShortenParagraph } from '@/app/utils'
import './post-slider.scss'

export type PostSliderProp = {
  posts: any[]
  theme: Theme
}

/*
const autoPlayInterval = 3000
const titleLengthLimit = 35
const briefLengthLimit = 100
*/

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const PostSlider = (props: PostSliderProp) => {
  console.log(props)
  return (
    <div className="post-slider">
      <Swiper
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        loop={true}
        spaceBetween={20}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </Swiper>
    </div>
  )
}

/*
export const PostSlider = (props: PostSliderProp) => {
  const posts = props?.posts
  const postNum = posts?.length
  const themeColor = GetThemeColor(props?.theme)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrent(current => (current === postNum - 1 ? 0 : current + 1))
    }, autoPlayInterval)

    return () => {
      clearInterval(interval)
    }
  }, [postNum])

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
        <a
          key={`post-${index}`}
          href={post.url}
          className={`post-body theme-${post.theme}`}
        >
          <img src={post.image} />
          <span className="post-category">{post.categoryName}</span>
          <span className="post-title">
            {ShortenParagraph(post.name, titleLengthLimit) ?? ''}
          </span>
          <span className="post-brief">
            {ShortenParagraph(post.brief, briefLengthLimit) ?? ''}
          </span>
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
    postNum > 0 && (
      <div className="post-slider">
        <div className="cards">
          {getSlides()}
          <button className="prev-btn" onClick={onPrevClick}>
            <ArrowLeft color={themeColor} />
          </button>
          <button className="next-btn" onClick={onNextClick}>
            <ArrowRight color={themeColor} />
          </button>
        </div>
        <div className="bullets">
          {posts.map((post, index) => {
            return (
              <button
                className={
                  index === current ? `active theme-${props.theme}` : ''
                }
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
*/

export default PostSlider
