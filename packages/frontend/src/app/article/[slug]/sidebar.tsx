import './sidebar.scss'

const shareIcons = [
  'rpjr-icon-color-fb.svg',
  'rpjr-icon-color-twitter.svg',
  'rpjr-icon-color-line.svg',
  'rpjr-icon-color-link.svg',
]

const functionIcons = ['rpjr-icon-color-text.svg', 'rpjr-icon-color-print.svg']

// TODO: add functionality to buttons
export const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="section">
          <span>分享</span>
          {shareIcons.map((icon, index) => {
            return (
              <button key={`share-icon-${index}`}>
                <img alt="" src={`/images/${icon}`} />
              </button>
            )
          })}
        </div>
        <div className="section">
          {functionIcons.map((icon, index) => {
            return (
              <button key={`function-icon-${index}`}>
                <img alt="" src={`/images/${icon}`} />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
