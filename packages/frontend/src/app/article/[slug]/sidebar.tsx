'use client'
import { useState } from 'react'
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

const functionIcons = [
  {
    image: 'rpjr-icon-color-text.svg',
    onClick: () => {
      console.log('change font size')
    }, // TODO: change font handler
  },
  {
    image: 'rpjr-icon-color-print.svg',
    onClick: () => window.print(),
  },
]

export const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="section">
          <span>分享</span>
          {shareIcons.map((icon, index) => {
            return (
              <button key={`share-icon-${index}`} onClick={icon.onClick}>
                <img src={`/images/${icon.image}`} />
              </button>
            )
          })}
        </div>
        <div className="section">
          {functionIcons.map((icon, index) => {
            return (
              <button key={`function-icon-${index}`} onClick={icon.onClick}>
                <img src={`/images/${icon.image}`} />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const MobileSidebar = () => {
  const [isShareClicked, setIsShareClicked] = useState(false)

  const onShareClick = () => {
    setIsShareClicked(!isShareClicked)
  }

  const onChangeTextClick = () => {
    // TODO: change font handler
    console.log('onChangeTextClick')
  }

  return (
    <div className="mobile-sidebar-container">
      <div className="sidebar">
        {isShareClicked && (
          <div className="share-buttons">
            {shareIcons.map((icon, index) => {
              return (
                <button key={`share-icon-${index}`} onClick={icon.onClick}>
                  <img src={`/images/${icon.image}`} />
                </button>
              )
            })}
          </div>
        )}
        <div className="section">
          <div className="button-group">
            <button onClick={onShareClick}>
              <img src={`/images/mobile-sidebar-share.svg`} />
            </button>
            <span>分享文章</span>
          </div>
          <div className="button-group">
            <button onClick={onChangeTextClick}>
              <img src={`/images/mobile-sidebar-change-font.svg`} />
            </button>
            <span>文字大小</span>
          </div>
        </div>
      </div>
    </div>
  )
}
