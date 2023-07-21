import '../assets/css/button.css'

export const Header = () => {
  return (
    <div className="ct-container">
      <div data-column="start" data-placements="1">
        <div data-items="primary">
          <div className="site-branding" data-id="logo">
            <a
              href="https://kids.twreporter.org/"
              className="site-logo-container"
              rel="home"
            >
              <img
                width="592"
                height="120"
                src="https://kids.twreporter.org/wp-content/uploads/2022/10/LOGO.svg"
                className="default-logo"
                alt="少年報導者 The Reporter for Kids"
              />
            </a>
          </div>
          <div
            className="ct-header-text "
            data-id="p89zlD"
            data-width="stretch"
          >
            <div className="entry-content">
              <div className="header-left">
                <a
                  href="https://kids.twreporter.org/about#post"
                  className="header-left__btn-1 rpjr-btn __mPS2id"
                  style={{ marginRight: '14px' }}
                >
                  投稿
                </a>
                <a
                  href="http://eepurl.com/idk8VH"
                  target="_blank"
                  className="header-left__btn-1 rpjr-btn rpjr-btn-orange"
                  style={{ marginRight: '15px' }}
                >
                  訂閱
                </a>
                <img
                  src="https://kids.twreporter.org/wp-content/uploads/2022/10/header-left-slogan.svg"
                  className="header-left__slogan"
                />
              </div>{' '}
            </div>
          </div>
        </div>
      </div>
      <div data-column="end" data-placements="1">
        <div data-items="primary">
          <nav
            id="header-menu-1"
            className="header-menu-1"
            data-id="menu"
            data-interaction="hover"
            data-menu="type-1"
            data-dropdown="type-1:simple"
            aria-label="頁首選單"
          >
            <ul
              id="menu-header-%e4%b8%bb%e9%81%b8%e5%96%ae"
              className="menu"
              role="menubar"
            >
              <li
                id="menu-item-3776"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3776"
                role="none"
              >
                <a
                  href="/topic/"
                  className="ct-menu-link"
                  role="menuitem"
                  data-ps2id-api="true"
                >
                  專題
                </a>
              </li>
              <li
                id="menu-item-3773"
                className="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor menu-item-3773"
                role="none"
              >
                <a
                  href="https://kids.twreporter.org/category/news/"
                  className="ct-menu-link"
                  role="menuitem"
                  data-ps2id-api="true"
                >
                  新聞
                </a>
              </li>
              <li
                id="menu-item-10010"
                className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-10010"
                role="none"
              >
                <a
                  href="https://kids.twreporter.org/category/listening-news/"
                  className="ct-menu-link"
                  role="menuitem"
                  data-ps2id-api="true"
                >
                  讀報
                </a>
              </li>
              <li
                id="menu-item-3775"
                className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3775"
                role="none"
              >
                <a
                  href="https://kids.twreporter.org/category/comics/"
                  className="ct-menu-link"
                  role="menuitem"
                  data-ps2id-api="true"
                >
                  漫畫
                </a>
              </li>
              <li
                id="menu-item-3774"
                className="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor menu-item-3774"
                role="none"
              >
                <a
                  href="https://kids.twreporter.org/category/campus/"
                  className="ct-menu-link"
                  role="menuitem"
                  data-ps2id-api="true"
                >
                  校園
                </a>
              </li>
            </ul>
          </nav>
          <button
            data-toggle-panel="#search-modal"
            className="ct-header-search ct-toggle "
            aria-label="開啟搜尋表單"
            data-label="right"
            data-id="search"
          >
            <span className="ct-label ct-hidden-sm ct-hidden-md ct-hidden-lg">
              搜尋
            </span>
            <svg
              className="ct-icon"
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 15 15"
            >
              <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7z M1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
            </svg>
          </button>
          <a
            data-id="account"
            className="ct-header-account"
            data-state="in"
            data-label="right"
            href="https://kids.twreporter.org/wp-login.php?action=logout&amp;redirect_to=https%3A%2F%2Fkids.twreporter.org%2Funiversity-exploratory-learning-zoo%2F&amp;_wpnonce=c5cf087865"
            aria-label="登出"
          >
            <span className="ct-label">登出</span>
            <div className="ct-image-container">
              <img
                loading="lazy"
                src="https://secure.gravatar.com/avatar/ee11385c5582e8ed4fb83f236d1992aa?s=48&amp;d=mm&amp;r=r"
                width="24"
                height="24"
                aria-hidden="true"
                style={{ aspectRatio: '1/1' }}
                alt="預設圖片"
              />
            </div>
          </a>
          <div className="ct-header-cta" data-id="button">
            <a
              href="/about#us"
              className="ct-button __mPS2id"
              data-size="small"
              aria-label="我們是誰"
              target="_blank"
              rel="noopener noreferrer"
            >
              我們是誰{' '}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
