'use client'
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

export default Sidebar
