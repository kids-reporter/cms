'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useArticleContext } from './article-context'
import './sidebar.scss'

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
    <div className="sidebar-container">
      <div className="sidebar">
        {topicURL && (
          <div>
            <Link href={topicURL}>
              <img src="/assets/images/topic-breadcrumb-sidebar-icon.svg" />
            </Link>
          </div>
        )}
        <div className="section">
          <span>分享</span>
          {shareIcons.map((icon, index) => {
            return (
              <button
                className="flex flex-col justify-center items-center"
                key={`share-icon-${index}`}
                onClick={icon.onClick}
              >
                <img src={`/assets/images/${icon.image}`} />
              </button>
            )
          })}
        </div>
        <div className="section">
          <button
            className="flex flex-col justify-center items-center"
            onClick={onFontSizeChange}
          >
            <img src={`/assets/images/rpjr-icon-color-text.svg`} />
          </button>
          <button
            className="flex flex-col justify-center items-center"
            onClick={() => window.print()}
          >
            <img src={`/assets/images/rpjr-icon-color-print.svg`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export const MobileSidebar = ({ topicURL }: SidebarProp) => {
  const [isShareClicked, setIsShareClicked] = useState(false)
  const { onFontSizeChange } = useArticleContext()

  const onShareClick = () => {
    setIsShareClicked(!isShareClicked)
  }

  return (
    <div className="mobile-sidebar-container">
      <div className="sidebar">
        {isShareClicked && (
          <div className="share-buttons">
            {shareIcons.map((icon, index) => {
              return (
                <button key={`share-icon-${index}`} onClick={icon.onClick}>
                  <img src={`/assets/images/${icon.image}`} />
                </button>
              )
            })}
          </div>
        )}
        <div className="section">
          {topicURL && (
            <div className="button-group">
              <Link href={topicURL}>
                <img src="/assets/images/topic-breadcrumb-sidebar-mobile-icon.svg" />
              </Link>
              <span>前往專題</span>
            </div>
          )}
          <div className="button-group">
            <button onClick={onShareClick}>
              <img src={`/assets/images/mobile-sidebar-share.svg`} />
            </button>
            <span>分享文章</span>
          </div>
          <div className="button-group">
            <button onClick={onFontSizeChange}>
              <img src={`/assets/images/mobile-sidebar-change-font.svg`} />
            </button>
            <span>文字大小</span>
          </div>
        </div>
      </div>
    </div>
  )
}
