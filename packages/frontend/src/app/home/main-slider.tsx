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
import './main-slider.css'

type SliderProp = {
  topics: { url: string; image: string; title: string; subtitle: string }[]
}

const autoPlayInterval = 5000

export const MainSlider = (props: SliderProp) => {
  const topics = props?.topics
  const swiperRef = useRef<SwiperCore>()

  return (
    <div
      style={{
        backgroundPosition: 'bottom right 15%',
        backgroundSize: '317px',
      }}
      className={`main-slider max-w-7xl w-screen flex items-center justify-center flex-col ml-auto mr-auto mb-5 pt-20 lg:pt-10 bg-no-repeat theme-${Theme.YELLOW}`}
    >
      <div className="w-full flex items-center justify-center flex-row relative">
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
                  className="max-w-3xl mb-0 md:mb-16 flex relative justify-center flex-col cursor-pointer"
                  href={topic.url}
                >
                  <div
                    style={{
                      width: 'fit-content',
                      height: 'fit-content',
                      zIndex: '2',
                    }}
                    className="absolute top-5 left-5 flex flex-row items-center bg-white rounded-3xl px-3 md:px-4 py-1 gap-1"
                  >
                    <img
                      className="w-8 md:w-10"
                      src={'/assets/images/topic_icon.svg'}
                    />
                    <span
                      style={{ lineHeight: '160%', letterSpacing: '0.08em' }}
                      className="font-bold text-base md:text-xl"
                    >
                      專題
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div
                      style={{
                        height: 'calc(100% / 16 * 9)',
                        aspectRatio: '16/9',
                      }}
                      className="max-w-full"
                    >
                      <img
                        className="w-full h-full object-cover rounded-none md:rounded-2xl"
                        src={topic.image}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily:
                          'SweiMarkerSansCJKtc-Regular,noto sans tc,Sans-Serif,serif',
                        lineHeight: '160%',
                        letterSpacing: '.08em',
                      }}
                      className="w-full not-italic font-bold text-xl md:text-3xl p-8 text-gray-900 text-center"
                    >
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
          className="prev-btn w-14 bg-transparent cursor-pointer absolute top-1/4 border-none"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeft color={DEFAULT_THEME_COLOR} />
        </button>
        <button
          className="next-btn w-14 bg-transparent cursor-pointer absolute top-1/4 border-none"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRight color={DEFAULT_THEME_COLOR} />
        </button>
      </div>
    </div>
  )
}

export default MainSlider
