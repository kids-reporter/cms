'use client'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from '@/app/icons/arrow'
import { Theme, DEFAULT_THEME_COLOR } from '@/app/constants'
import { GetFormattedDate, GetThemeColor, ShortenParagraph } from '@/app/utils'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './post-slider.scss'

type Post = {
  image: string
  name: string
  url: string
  brief: string
  tag: string
  publishedDate: string
  categoryName: string
  theme: Theme
}

export type PostSliderProp = {
  posts: Post[]
  sliderTheme: Theme
}

const slidesPerView = 3
const autoPlayInterval = 5000
const titleLengthLimit = 35
const briefLengthLimit = 110

export const PostSlider = (props: PostSliderProp) => {
  const posts = props?.posts
  const postNum = posts?.length
  const themeColor = GetThemeColor(props?.sliderTheme) ?? DEFAULT_THEME_COLOR

  // Note: swiper loop mode is only available when slideNum >= slidesPerView * 2
  // ref: https://swiperjs.com/swiper-api#param-loop
  const isLoopAvailable = postNum >= slidesPerView * 2

  // Note: for swiper custom navigation buttons
  // https://github.com/nolimits4web/swiper/issues/3855#issuecomment-1287871054
  const swiperRef = useRef<SwiperCore>()

  return (
    postNum > 0 && (
      <div className={`post-slider theme-${props.sliderTheme}`}>
        <div className="cards">
          <Swiper
            autoplay={{ delay: autoPlayInterval }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Navigation, Pagination]}
            loop={isLoopAvailable}
            rewind={!isLoopAvailable}
            spaceBetween={20}
            slidesPerView={slidesPerView}
          >
            {posts.map((post, index) => {
              return (
                post && (
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
              )
            })}
          </Swiper>
          <button
            className="prev-btn"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeft color={themeColor} />
          </button>
          <button
            className="next-btn"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRight color={themeColor} />
          </button>
        </div>
      </div>
    )
  )
}

export default PostSlider
