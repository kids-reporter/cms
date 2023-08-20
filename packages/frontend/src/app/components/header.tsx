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
    <div className="sticky-header">
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

  return (
    <div className="home-header">
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
        <div className="btn-group">
          {contributeBtn}
          {subscribeBtn}
          {aboutUsBtn}
        </div>
      </div>
    </div>
  )
}
