'use client'
import { useState } from 'react'
import { CrossIcon, HamburgerIcon, SearchIcon } from '@/app/icons'
import { SUBSCRIBE_URL } from '@/app/constants'

import './header.scss'
import '../assets/css/button.css'

export const NavItems = [
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

export const ContributeBtn = (
  <a
    href="/about#post"
    className="header-left__btn-1 rpjr-btn"
    style={{ marginRight: '14px' }}
  >
    投稿
  </a>
)

export const SubscribeBtn = (
  <a
    href={SUBSCRIBE_URL}
    target="_blank"
    className="header-left__btn-1 rpjr-btn rpjr-btn-orange"
    style={{ marginRight: '15px' }}
  >
    訂閱
  </a>
)

export const AboutUsBtn = (
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

  // TODO: handle search
  const onHandleSearch = () => {
    console.log('search')
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
        onChange={onHandleSearch}
      />
      <button type="submit" className="search-submit" aria-label="搜尋按鈕">
        {SearchIcon}
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
          {ContributeBtn}
          {SubscribeBtn}
          {AboutUsBtn}
        </div>
        {searchInput}
        {navi}
      </div>
    </div>
  )

  return (
    <div className="sticky-header" id="sticky-header">
      <div className="header-container">
        <div className="left">{brand}</div>
        <div className="right">
          <div className="cta">
            {ContributeBtn}
            {SubscribeBtn}
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

export default StickyHeader
