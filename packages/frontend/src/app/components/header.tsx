'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/app/components/navigation'
import { CrossIcon, HamburgerIcon, SearchIcon } from '@/app/icons'
import { SUBSCRIBE_URL } from '@/app/constants'
import './header.scss'

const slogan = <img src="/assets/images/header-left-slogan.svg" />

export const ContributeBtn = (
  <Link
    href="/about#post"
    className="header-left__btn-1 rpjr-btn"
    style={{ marginRight: '14px' }}
  >
    投稿
  </Link>
)

export const SubscribeBtn = (
  <Link
    href={SUBSCRIBE_URL}
    target="_blank"
    className="header-left__btn-1 rpjr-btn rpjr-btn-orange"
    style={{ marginRight: '15px' }}
  >
    訂閱
  </Link>
)

export const AboutUsBtn = (
  <Link
    href="/about#us"
    className="rpjr-btn rpjr-btn-red"
    aria-label="我們是誰"
    target="_blank"
    rel="noopener noreferrer"
  >
    我們是誰
  </Link>
)

export const StickyHeader = () => {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)
  const [isSearchClicked, setIsSearchClicked] = useState(false)

  const onHamburgerOverlayOpen = () => {
    setIsHamburgerClicked(true)
    document.body.classList.add('no-scroll')
  }

  const onSearchOverlayOpen = () => {
    setIsSearchClicked(true)
    document.body.classList.add('no-scroll')
  }

  const onHamburgerOverlayClose = () => {
    setIsHamburgerClicked(false)
    document.body.classList.remove('no-scroll')
  }

  const onSearchOverlayClose = () => {
    setIsSearchClicked(false)
    document.body.classList.remove('no-scroll')
  }

  const brand = (
    <div className="site-branding">
      <Link href="/" className="site-logo-container" rel="home">
        <img
          src="/assets/images/LOGO.svg"
          className="default-logo"
          alt="少年報導者 The Reporter for Kids"
        />
      </Link>
    </div>
  )

  const search = (
    <button
      className="search-btn"
      aria-label="開啟搜尋表單"
      data-label="right"
      onClick={onSearchOverlayOpen}
    >
      <span>搜尋</span>
      {SearchIcon}
    </button>
  )

  const about = (
    <div className="about-us">
      <Link
        href="/about#us"
        className="rpjr-btn rpjr-btn-red"
        aria-label="我們是誰"
        target="_blank"
        rel="noopener noreferrer"
      >
        我們是誰
      </Link>
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
        <Link href="/" className="logo-mobile">
          <img
            src="/assets/images/logo-full.svg"
            alt="少年報導者 The Reporter for Kids"
          />
        </Link>
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
          <button className="hamburger" onClick={onHamburgerOverlayOpen}>
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
