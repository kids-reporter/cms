'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { ArrowLeft, ArrowRight } from '@/app/icons/arrow'
import { Theme, DEFAULT_THEME_COLOR } from '@/app/constants'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './main-slider.scss'

type SliderProp = {
  topics: { url: string; image: string; title: string; subtitle: string }[]
}

const autoPlayInterval = 5000

export const MainSlider = (props: SliderProp) => {
  const topics = props?.topics
  const swiperRef = useRef<SwiperCore>()

  return (
    <div className={`main-slider theme-${Theme.YELLOW}`}>
      <div className="topics">
        <Swiper
          autoplay={{ delay: autoPlayInterval }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          loop={true}
          slidesPerView={1}
          effect={'coverflow'}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            scale: 0.8,
            slideShadows: false,
          }}
          breakpoints={{
            1000: {
              slidesPerView: 2,
            },
          }}
        >
          {topics.map((topic, index) => {
            return (
              <SwiperSlide key={`swiper-main-slide-${index}`}>
                <Link
                  key={`topic-${index}`}
                  className="topic-body"
                  href={topic.url}
                >
                  <div className="icon">
                    <img src={'/assets/images/topic_icon.svg'} />
                    <span>專題</span>
                  </div>
                  <div className="slide">
                    <div className="hero-image-container">
                      <img src={topic.image} />
                    </div>
                    <span className="topic-title">
                      {topic.title}
                      <br />
                      {topic.subtitle}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <button
          className="prev-btn"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeft color={DEFAULT_THEME_COLOR} />
        </button>
        <button
          className="next-btn"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRight color={DEFAULT_THEME_COLOR} />
        </button>
      </div>
    </div>
  )
}

export default MainSlider
