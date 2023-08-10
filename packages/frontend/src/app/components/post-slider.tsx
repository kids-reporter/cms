'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Theme } from '@/app/constants'
import { GetFormattedDate, GetThemeColor, ShortenParagraph } from '@/app/utils'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './post-slider.scss'

export type PostSliderProp = {
  posts: any[]
  theme: Theme
}

const slidesPerView = 3
const autoPlayInterval = 5000
const titleLengthLimit = 35
const briefLengthLimit = 110

export const PostSlider = (props: PostSliderProp) => {
  const posts = props?.posts
  const postNum = posts?.length
  const themeColor = GetThemeColor(props?.theme)
  console.log(themeColor)

  // Note: swiper loop mode is only available when slideNum >= slidesPerView * 2
  // ref: https://swiperjs.com/swiper-api#param-loop
  const isLoopAvailable = postNum >= slidesPerView * 2

  return (
    postNum > 0 && (
      <div className={`post-slider theme-${props.theme}`}>
        <div className="cards">
          <Swiper
            autoplay={{ delay: autoPlayInterval }}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Autoplay, Navigation, Pagination]}
            loop={isLoopAvailable}
            rewind={!isLoopAvailable}
            spaceBetween={20}
            slidesPerView={slidesPerView}
          >
            {posts.map((post, index) => {
              return (
                <SwiperSlide key={`swiper-slide-${index}`}>
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
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    )
  )
}

export default PostSlider
