'use client'
import { useState } from 'react'
import { CrossIcon, HamburgerIcon, SearchIcon } from '@/app/icons/header'
import { SUBSCRIBE_URL } from '@/app/constants'

import './header.scss'
import '../assets/css/button.css'

const navItems = [
  {
    title: '專題',
    link: '/topic/',
  },
  {
    title: '新聞',
    link: '/category/news/',
  },
  {
    title: '讀報',
    link: '/category/listening-news/',
  },
  {
    title: '漫畫',
    link: '/category/comics/',
  },
  {
    title: '校園',
    link: '/category/campus/',
  },
]

const slogan = <img src="/images/header-left-slogan.svg" />

const contributeBtn = (
  <a
    href="/about#post"
    className="header-left__btn-1 rpjr-btn"
    style={{ marginRight: '14px' }}
  >
    投稿
  </a>
)

const subscribeBtn = (
  <a
    href={SUBSCRIBE_URL}
    target="_blank"
    className="header-left__btn-1 rpjr-btn rpjr-btn-orange"
    style={{ marginRight: '15px' }}
  >
    訂閱
  </a>
)

const aboutUsBtn = (
  <a
    href="/about#us"
    className="rpjr-btn rpjr-btn-red"
    aria-label="我們是誰"
    target="_blank"
    rel="noopener noreferrer"
  >
    我們是誰
  </a>
)

export const StickyHeader = () => {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)

  const onHamburgerClick = () => {
    setIsHamburgerClicked(!isHamburgerClicked)
  }

  const onOverlayClose = () => {
    setIsHamburgerClicked(false)
  }

  const brand = (
    <div className="site-branding">
      <a href="/" className="site-logo-container" rel="home">
        <img
          src="/images/LOGO.svg"
          className="default-logo"
          alt="少年報導者 The Reporter for Kids"
        />
      </a>
    </div>
  )

  const navi = (
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
  )

  const search = (
    <button className="search-btn" aria-label="開啟搜尋表單" data-label="right">
      <span>搜尋</span>
      {SearchIcon}
    </button>
  )

  const about = (
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
  )

  const searchInput = (
    <form
      role="search"
      method="get"
      className="search-form"
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
      />
      <button type="submit" className="search-submit" aria-label="搜尋按鈕">
        <svg className="ct-icon" width="15" height="15" viewBox="0 0 15 15">
          <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7zM1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
        </svg>
        <span data-loader="circles">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <input type="hidden" name="post_type" value="post" />
    </form>
  )

  const overlay = (
    <div className="overlay-mobile">
      <div className="control">
        <button onClick={onOverlayClose}>{CrossIcon}</button>
      </div>
      <div className="content">
        <a href="/" className="logo-mobile">
          <img
            src="/images/logo-full.svg"
            alt="少年報導者 The Reporter for Kids"
          />
        </a>
        <div className="btn-group">
          {contributeBtn}
          {subscribeBtn}
          {aboutUsBtn}
        </div>
        {searchInput}
        {navi}
      </div>
    </div>
  )

  return (
    <div className="header">
      <div className="header-container">
        <div className="left">{brand}</div>
        <div className="right">
          <div className="cta">
            {contributeBtn}
            {subscribeBtn}
            {slogan}
          </div>
          <div className="others">
            {navi}
            {search}
            {about}
          </div>
        </div>
        <div className="right-mobile">
          <button className="hamburger" onClick={onHamburgerClick}>
            {HamburgerIcon}
          </button>
          {isHamburgerClicked && overlay}
        </div>
      </div>
    </div>
  )
}

export const Header = () => {
  const handleSearchInputChange = () => {
    // TODO: handle search
    console.log('handleSearchInputChange')
  }

  return (
    <div data-row="top:boxed" data-column-set="3">
      <div className="ct-container">
        <div data-column="start" data-placements="1">
          <div data-items="primary">
            <div
              className="ct-header-text "
              data-id="AWUMVG"
              data-width="stretch"
            >
              <div className="entry-content">
                <p></p>
                <div className="home-header-left">
                  <img
                    src={`/images/navbar_pic.svg`}
                    width="291"
                    className="md:block hidden"
                  />
                  <img
                    src="/images/navbar_RWD_pic.svg"
                    width="163"
                    className="md:hidden block"
                  />
                </div>
                <p></p>{' '}
              </div>
            </div>
          </div>
        </div>
        <div data-column="middle">
          <div data-items="">
            <div
              className="ct-header-text "
              data-id="WvNHyL"
              data-width="stretch"
            >
              <div className="entry-content">
                <div className="home-header-middle">
                  <img src="/images/logo-full.svg?v2" />
                  <nav aria-label="頁首選單">
                    <ul
                      id="menu-header-%e4%b8%bb%e9%81%b8%e5%96%ae"
                      className="menu"
                    >
                      <li
                        id="menu-item-3776"
                        className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-3776"
                      >
                        <a
                          href="/topic/"
                          aria-current="page"
                          className="ct-menu-link"
                        >
                          專題
                        </a>
                      </li>
                      <li
                        id="menu-item-3773"
                        className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3773"
                      >
                        <a
                          href="https://kids.twreporter.org/category/news/"
                          className="ct-menu-link"
                        >
                          新聞
                        </a>
                      </li>
                      <li
                        id="menu-item-3772"
                        className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3772"
                      >
                        <a
                          href="https://kids.twreporter.org/category/listening-news/"
                          className="ct-menu-link"
                        >
                          讀報
                        </a>
                      </li>
                      <li
                        id="menu-item-3775"
                        className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3775"
                      >
                        <a
                          href="https://kids.twreporter.org/category/comics/"
                          className="ct-menu-link"
                        >
                          漫畫
                        </a>
                      </li>
                      <li
                        id="menu-item-3774"
                        className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3774"
                      >
                        <a
                          href="https://kids.twreporter.org/category/campus/"
                          className="ct-menu-link"
                        >
                          校園
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-column="end" data-placements="1">
          <div data-items="primary">
            <div
              className="ct-search-box hidden md:block"
              data-id="search-input"
            >
              <form
                role="search"
                method="get"
                className="search-form"
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
                  onChange={handleSearchInputChange}
                />
                <button
                  type="submit"
                  className="search-submit"
                  aria-label="搜尋按鈕"
                >
                  <svg
                    className="ct-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                  >
                    <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7zM1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
                  </svg>
                  <span data-loader="circles">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
                <input type="hidden" name="post_type" value="post" />
              </form>
            </div>
            <div className="hidden sm:block md:hidden">
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
            </div>
            <div
              className="ct-header-text "
              data-id="text"
              data-width="stretch"
            >
              <div className="entry-content">
                <div className="header-right">
                  <a
                    href="https://kids.twreporter.org/about#post"
                    className="header-left__btn-1 rpjr-btn __mPS2id"
                  >
                    投稿
                  </a>
                  <a
                    href={SUBSCRIBE_URL}
                    target="_blank"
                    className="header-left__btn-1 rpjr-btn rpjr-btn-orange"
                    style={{ marginLeft: '16px' }}
                  >
                    訂閱
                  </a>
                  <a
                    href="https://kids.twreporter.org/about#us"
                    className="header-left__btn-1 rpjr-btn rpjr-btn-red __mPS2id"
                    style={{ marginLeft: '16px' }}
                  >
                    我們是誰
                  </a>
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
