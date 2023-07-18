const shareIcons = [
  'https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-fb.svg',
  'https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-twitter.svg',
  'https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-line.svg',
  'https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-link.svg',
]

const functionIcons = [
  'https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-text.svg',
  'https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-print.svg',
]

export const Sidebar = () => {
  return (
    <div className="social-sidebar">
      <div className="share-box">
        <span className="share-box__text">分享</span>
        {shareIcons.map((iconURL, index) => {
          return (
            <button key={`share-icon-${index}`}>
              <img alt="" src={iconURL} />
            </button>
          )
        })}
      </div>
      <div className="function-box">
        {functionIcons.map((iconURL, index) => {
          return (
            <button key={`function-icon-${index}`}>
              <img alt="" src={iconURL} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
