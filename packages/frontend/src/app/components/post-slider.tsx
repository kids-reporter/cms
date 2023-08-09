'use client'
// import { ArrowLeft, ArrowRight } from '@/app/icons/arrow'
import { Theme } from '@/app/constants'
import { GetFormattedDate, GetThemeColor, ShortenParagraph } from '@/app/utils'
import './post-slider.scss'

export type PostSliderProp = {
  posts: any[]
  theme: Theme
}

// const autoPlayInterval = 3000
const titleLengthLimit = 35
const briefLengthLimit = 100

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const PostSlider = (props: PostSliderProp) => {
  const posts = props?.posts
  const postNum = posts?.length
  const themeColor = GetThemeColor(props?.theme)
  console.log(themeColor)

  return (
    postNum > 0 && (
      <div className="post-slider">
        <div className="cards">
          <Swiper
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            loop={true}
            spaceBetween={20}
            slidesPerView={3}
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
