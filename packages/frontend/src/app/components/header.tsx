'use client'
import { useState } from 'react'
import { Navigation } from '@/app/components/Navigation'
import { CrossIcon, HamburgerIcon, SearchIcon } from '@/app/icons'
import { SUBSCRIBE_URL } from '@/app/constants'
import './header.scss'

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
  const [isSearchClicked, setIsSearchClicked] = useState(false)

  const onHamburgerClick = () => {
    setIsHamburgerClicked(!isHamburgerClicked)
  }

  const onSearchClick = () => {
    setIsSearchClicked(!isSearchClicked)
  }

  const onHamburgerOverlayClose = () => {
    setIsHamburgerClicked(false)
  }

  const onSearchOverlayClose = () => {
    setIsSearchClicked(false)
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

  const search = (
    <button
      className="search-btn"
      aria-label="開啟搜尋表單"
      data-label="right"
      onClick={onSearchClick}
    >
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
      action="/search"
      aria-haspopup="listbox"
    >
      <input
        type="text"
        placeholder="搜尋更多新聞、議題"
        name="q"
        title="Search for..."
        aria-label="Search for..."
      />
      <button type="submit" className="search-submit" aria-label="搜尋按鈕">
        {SearchIcon}
      </button>
    </form>
  )

  const searchOverlay = (
    <div className="search-overlay">
      <div className="control">
        <button onClick={onSearchOverlayClose}>{CrossIcon}</button>
      </div>
      <div className="content">{searchInput}</div>
    </div>
  )

  const hamburgerOverlay = (
    <div className="hamburger-overlay-mobile">
      <div className="control">
        <button onClick={onHamburgerOverlayClose}>{CrossIcon}</button>
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
        <Navigation />
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
            <Navigation />
            {search}
            {about}
          </div>
        </div>
        <div className="right-mobile">
          <button className="hamburger" onClick={onHamburgerClick}>
            {HamburgerIcon}
          </button>
          {isHamburgerClicked && hamburgerOverlay}
        </div>
        {isSearchClicked && searchOverlay}
      </div>
    </div>
  )
}

export default StickyHeader
