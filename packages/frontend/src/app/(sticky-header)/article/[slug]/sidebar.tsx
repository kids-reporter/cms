'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useArticleContext } from './article-context'
import { useScrollLevel, ScrollLevel } from '@/app/utils/custom-hook'

const shareIcons = [
  {
    image: 'rpjr-icon-color-fb.svg',
    onClick: () => {
      const currentURL = window.location.href
      const location =
        'https://www.facebook.com/sharer/sharer.php?' +
        `u=${encodeURIComponent(currentURL)}`
      window.open(location, '_blank')
    },
  },
  {
    image: 'rpjr-icon-color-twitter.svg',
    onClick: () => {
      const currentURL = window.location.href
      const location =
        'https://twitter.com/intent/tweet?' +
        `url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(
          document.title + ' #報導者'
        )}`
      window.open(location, '_blank')
    },
  },
  {
    image: 'rpjr-icon-color-line.svg',
    onClick: () => {
      const currentURL = window.location.href
      const location = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        currentURL
      )}`
      window.open(location, '_blank')
    },
  },
  {
    image: 'rpjr-icon-color-link.svg',
    onClick: () => {
      const currentURL = window.location.href
      navigator.clipboard.writeText(currentURL).then(() => {
        window.alert('已複製文章網址')
      })
    },
  },
]

type SidebarProp = {
  topicURL?: string
}

export const Sidebar = ({ topicURL }: SidebarProp) => {
  const { onFontSizeChange } = useArticleContext()

  return (
    <div
      style={{ zIndex: '900', marginTop: '-430px' }}
      className="hidden lg:block sticky w-16 left-0 top-44"
    >
      <div className="relative flex justify-center flex-col items-center gap-4">
        {topicURL && (
          <div>
            <Link href={topicURL}>
              <img
                src="/assets/images/topic-breadcrumb-sidebar-icon.svg"
                loading="lazy"
              />
            </Link>
          </div>
        )}
        <div className="flex flex-col justify-center items-center text-center p-2 bg-gray-100 rounded-3xl">
          <span
            style={{ lineHeight: '160%', letterSpacing: '0.16em' }}
            className="flex font-normal text-sm text-gray-900"
          >
            分享
          </span>
          {shareIcons.map((icon, index) => {
            return (
              <button
                style={{ aspectRatio: '1/1' }}
                className="w-12 flex flex-col justify-center items-center appearance-none bg-transparent border-none cursor-pointer"
                key={`share-icon-${index}`}
                onClick={icon.onClick}
              >
                <img src={`/assets/images/${icon.image}`} loading="lazy" />
              </button>
            )
          })}
        </div>
        <div className="flex flex-col justify-center text-center p-2 bg-gray-100 rounded-3xl">
          <button
            style={{ aspectRatio: '1/1' }}
            className="w-12 flex flex-col justify-center items-center appearance-none bg-transparent border-none cursor-pointer"
            onClick={onFontSizeChange}
          >
            <img
              src={`/assets/images/rpjr-icon-color-text.svg`}
              loading="lazy"
            />
          </button>
          <button
            style={{ aspectRatio: '1/1' }}
            className="w-12 flex flex-col justify-center items-center appearance-none bg-transparent border-none cursor-pointer"
            onClick={() => window.print()}
          >
            <img
              src={`/assets/images/rpjr-icon-color-print.svg`}
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export const MobileSidebar = ({ topicURL }: SidebarProp) => {
  const [isShareClicked, setIsShareClicked] = useState(false)
  const scrollLevel = useScrollLevel()
  const { onFontSizeChange } = useArticleContext()

  const onShareClick = () => {
    setIsShareClicked(!isShareClicked)
  }

  const shareBtnList = isShareClicked && (
    <div className="flex flex-row items-center pt-2.5 pb-4 gap-2">
      {shareIcons.map((icon, index) => {
        return (
          <button
            style={{ aspectRatio: '1/1' }}
            className="block appearance-none bg-transparent w-12 cursor-pointer border-none"
            key={`share-icon-${index}`}
            onClick={icon.onClick}
          >
            <img src={`/assets/images/${icon.image}`} loading="lazy" />
          </button>
        )
      })}
    </div>
  )

  const topicBtn = topicURL && (
    <div className="h-full flex flex-col items-center justify-between">
      <Link
        style={{ aspectRatio: '1/1' }}
        className="flex flex-col justify-center items-center appearance-none bg-transparent w-12 cursor-pointer border-none"
        href={topicURL}
      >
        <img
          src="/assets/images/topic-breadcrumb-sidebar-mobile-icon.svg"
          loading="lazy"
        />
      </Link>
      {scrollLevel === ScrollLevel.UP && (
        <span
          style={{ lineHeight: '160%', letterSpacing: '0.08em' }}
          className="font-medium whitespace-no-wrap text-center text-gray-900 opacity-100 text-xs"
        >
          前往專題
        </span>
      )}
    </div>
  )

  const shareBtn = (
    <div className="h-full flex flex-col items-center justify-between">
      <button
        style={{ aspectRatio: '1/1' }}
        className="flex flex-col justify-center items-center appearance-none bg-transparent w-12 cursor-pointer border-none"
        onClick={onShareClick}
      >
        <img src="/assets/images/mobile-sidebar-share.svg" loading="lazy" />
      </button>
      {scrollLevel === ScrollLevel.UP && (
        <span
          style={{ lineHeight: '160%', letterSpacing: '0.08em' }}
          className="font-medium whitespace-no-wrap text-center text-gray-900 opacity-100 text-xs"
        >
          分享文章
        </span>
      )}
    </div>
  )

  const fontBtn = (
    <div className="h-full flex flex-col items-center justify-between">
      <button
        style={{ aspectRatio: '1/1' }}
        className="flex flex-col justify-center items-center appearance-none bg-transparent w-12 cursor-pointer border-none"
        onClick={onFontSizeChange}
      >
        <img
          src="/assets/images/mobile-sidebar-change-font.svg"
          loading="lazy"
        />
      </button>
      {scrollLevel === ScrollLevel.UP && (
        <span
          style={{ lineHeight: '160%', letterSpacing: '0.08em' }}
          className="font-medium whitespace-no-wrap text-center text-gray-900 opacity-100 text-xs"
        >
          文字大小
        </span>
      )}
    </div>
  )

  return (
    <div
      style={{ zIndex: '900', width: 'inherit' }}
      className="sm:block md:block lg:hidden flex flex-col items-center fixed bottom-2.5"
    >
      <div className="relative flex justify-center flex-col items-center">
        {shareBtnList}
        <div
          style={{ boxShadow: 'rgba(35, 35, 35, 0.2) 0px 1px 8px 0px' }}
          className="max-h-20 flex flex-row justify-around items-center text-center bg-white px-7 pb-2 gap-10 rounded-3xl"
        >
          {topicBtn}
          {shareBtn}
          {fontBtn}
        </div>
      </div>
    </div>
  )
}
