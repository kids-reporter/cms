import './header.scss'
import '../../assets/css/button.css'

const navItems = [
  {
    title: '專題',
    link: '/topic/',
  },
  {
    title: '新聞',
    link: 'https://kids.twreporter.org/category/news/',
  },
  {
    title: '讀報',
    link: 'https://kids.twreporter.org/category/listening-news/',
  },
  {
    title: '漫畫',
    link: 'https://kids.twreporter.org/category/comics/',
  },
  {
    title: '校園',
    link: 'https://kids.twreporter.org/category/campus/',
  },
]

export const StickyHeader = () => {
  return (
    <div className="header-container">
      <div className="left">
        <div className="site-branding">
          <a
            href="https://kids.twreporter.org/"
            className="site-logo-container"
            rel="home"
          >
            <img
              src="https://kids.twreporter.org/wp-content/uploads/2022/10/LOGO.svg"
              className="default-logo"
              alt="少年報導者 The Reporter for Kids"
            />
          </a>
        </div>
        <div className="ct-header-text ">
          <div className="entry-content">
            <div className="cta">
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
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <nav className="header-menu-1" aria-label="頁首選單">
          <ul className="menu" role="menubar">
            {navItems.map((item, index) => {
              return (
                <li key={`header-nav-item-${index}`}>
                  <a href={item.link} className="ct-menu-link" role="menuitem">
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <button
          className="search-btn"
          aria-label="開啟搜尋表單"
          data-label="right"
        >
          <span>搜尋</span>
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
        <div className="about-us">
          <a
            href="/about#us"
            className="rpjr-btn rpjr-btn-red"
            aria-label="我們是誰"
            target="_blank"
            rel="noopener noreferrer"
          >
            我們是誰
          </a>
        </div>
      </div>
    </div>
  )
}

export const Header = () => {
  return null
}
