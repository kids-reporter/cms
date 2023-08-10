'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './main-slider.scss'

type SliderProp = {
  posts: any[]
}

const autoPlayInterval = 5000

export const MainSlider = (props: SliderProp) => {
  const posts = props?.posts

  return (
    <div className="main-slider">
      <div className="posts">
        <Swiper
          autoplay={{ delay: autoPlayInterval }}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          loop={true}
          spaceBetween={20}
          slidesPerView={'auto'}
          effect={'coverflow'}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {posts.map((post, index) => {
            return (
              <SwiperSlide key={`swiper-main-slide-${index}`}>
                <div key={`post-${index}`} className="post-body">
                  <img src={`${post.image}`} />
                  <span className="post-title">{post.name}</span>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default MainSlider
