import StickyHeader, {
  ContributeBtn,
  SubscribeBtn,
  AboutUsBtn,
} from '@/app/components/header'
import { SearchIcon } from '@/app/icons'
import { NavigationItems } from '@/app/constants'
import './main-header.scss'

export const MainHeader = () => {
  const navi = (
    <nav aria-label="頁首選單">
      <ul className="menu" role="menubar">
        {NavigationItems.map((item, index) => {
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
  )

  const searchInput = (
    <form role="search" method="get" action="/search" aria-haspopup="listbox">
      <input
        type="search"
        placeholder="搜尋更多新聞、議題"
        name="q"
        title="Search for..."
        aria-label="Search for..."
      />
      <button type="submit" className="search-submit" aria-label="搜尋按鈕">
        {SearchIcon}
      </button>
      <input type="hidden" name="post_type" value="post" />
    </form>
  )

  return (
    <>
      <div className="main-header-mobile">
        <StickyHeader />
      </div>
      <div className="main-header">
        <div className="left">
          <img src="/images/navbar_pic.svg" width="291" />
        </div>
        <div className="center">
          <a href="/">
            <img
              src="/images/logo-full.svg"
              alt="少年報導者 The Reporter for Kids"
            />
          </a>
          {navi}
        </div>
        <div className="right">
          <div className="content">
            {searchInput}
            <div className="btn-group">
              {ContributeBtn}
              {SubscribeBtn}
              {AboutUsBtn}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainHeader
