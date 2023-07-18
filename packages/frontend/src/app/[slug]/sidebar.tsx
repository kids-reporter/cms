export const Sidebar = () => {
  return (
    <div className="social-sidebar">
      <div className="share-box">
        <span className="share-box__text">分享</span>
        <button>
          <img
            alt=""
            src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-fb.svg"
          />
        </button>
        <button>
          <img
            alt=""
            src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-twitter.svg"
          />
        </button>
        <button>
          <img
            alt=""
            src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-line.svg"
          />
        </button>
        <button>
          <img
            alt=""
            src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-link.svg"
          />
        </button>
      </div>
      <div className="function-box">
        <button>
          <img
            alt=""
            src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-text.svg"
          />
        </button>
        <button>
          <img
            alt=""
            src="https://kids.twreporter.org/wp-content/themes/blocksy-child/assets/img/icon/rpjr-icon-color-print.svg"
          />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
