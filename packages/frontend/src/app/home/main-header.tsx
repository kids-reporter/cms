'use client'
import { SearchIcon } from '@/app/icons'
import {
  NavItems,
  ContributeBtn,
  SubscribeBtn,
  AboutUsBtn,
} from '@/app/components/header'
import './main-header.scss'

export const MainHeader = () => {
  // TODO: handle search
  const onHandleSearch = () => {
    console.log('search')
  }

  const navi = (
    <nav aria-label="頁首選單">
      <ul className="menu" role="menubar">
        {NavItems.map((item, index) => {
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

  return (
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
        <div>
          <form
            role="search"
            method="get"
            action="https://kids.twreporter.org/"
            aria-haspopup="listbox"
          >
            <input
              type="search"
              placeholder="搜尋更多新聞、議題"
              value=""
              name="s"
              title="Search for..."
              aria-label="Search for..."
              onChange={onHandleSearch}
            />
            <button
              type="submit"
              className="search-submit"
              aria-label="搜尋按鈕"
            >
              {SearchIcon}
              <span data-loader="circles">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <input type="hidden" name="post_type" value="post" />
          </form>
        </div>
        <div className="btn-group">
          {ContributeBtn}
          {SubscribeBtn}
          {AboutUsBtn}
        </div>
      </div>
    </div>
  )
}

export default MainHeader
