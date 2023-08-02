import './sidebar.scss'

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

// TODO: add functionality to buttons
export const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="section">
          <span>分享</span>
          {shareIcons.map((iconURL, index) => {
            return (
              <button key={`share-icon-${index}`}>
                <img alt="" src={iconURL} />
              </button>
            )
          })}
        </div>
        <div className="section">
          {functionIcons.map((iconURL, index) => {
            return (
              <button key={`function-icon-${index}`}>
                <img alt="" src={iconURL} />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
