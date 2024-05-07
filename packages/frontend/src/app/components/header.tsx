'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/app/components/navigation'
import { CrossIcon, HamburgerIcon, SearchIcon } from '@/app/icons'
import { SUBSCRIBE_URL, SEARCH_PLACEHOLDER } from '@/app/constants'
import styles from './header.module.css'

const slogan = (
  <img src="/assets/images/header-left-slogan.svg" loading="eager" />
)

const ContributeBtn = (
  <Link
    href="/about#post"
    className="header-left__btn-1 rpjr-btn leading-6 text-sm font-medium px-3"
    style={{ marginRight: '14px', fontFamily: 'Noto Sans TC, Sans-Serif' }}
  >
    投稿
  </Link>
)

const SubscribeBtn = (
  <Link
    href={SUBSCRIBE_URL}
    target="_blank"
    className="header-left__btn-1 rpjr-btn rpjr-btn-orange leading-6 text-sm font-medium px-3"
    style={{ marginRight: '15px', fontFamily: 'Noto Sans TC, Sans-Serif' }}
  >
    訂閱
  </Link>
)

const AboutUsBtn = (
  <Link
    href="/about#us"
    style={{ fontFamily: 'Noto Sans TC, Sans-Serif' }}
    className="rpjr-btn rpjr-btn-red leading-6 text-sm font-medium px-3"
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
    <div className="pr-2.5">
      <Link href="/" className="max-h-full" rel="home">
        <img
          src="/assets/images/LOGO.svg"
          className="h-8 object-contain"
          alt="少年報導者 The Reporter for Kids"
          loading="eager"
        />
      </Link>
    </div>
  )

  const search = (
    <button
      className={`${styles['search-icon']} cursor-pointer border-none mx-2.5`}
      aria-label="開啟搜尋表單"
      data-label="right"
      onClick={onSearchOverlayOpen}
    >
      {SearchIcon}
    </button>
  )

  const about = (
    <div className="h-8 flex items-stretch ml-2.5">{AboutUsBtn}</div>
  )

  const searchInput = (
    <form role="search" method="get" action="/search" aria-haspopup="listbox">
      <input
        type="text"
        placeholder={SEARCH_PLACEHOLDER}
        name="q"
        title="Search for..."
        aria-label="Search for..."
      />
      <button
        className="flex flex-row justify-center items-center"
        type="submit"
        aria-label="搜尋按鈕"
      >
        {SearchIcon}
      </button>
    </form>
  )

  const searchOverlay = (
    <div
      style={{ zIndex: '999' }}
      className="fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-white flex flex-col justify-center items-center"
    >
      <div
        style={{ padding: 'var(--panel-padding, 30px)' }}
        className="w-full flex flex-row justify-end pb-0"
      >
        <button
          className="bg-transparent w-10 cursor-pointer border-none p-1"
          onClick={onSearchOverlayClose}
        >
          {CrossIcon}
        </button>
      </div>
      <div
        style={{ padding: 'var(--panel-padding, 35px)' }}
        className={`${styles['search-overlay']} flex-grow w-full flex flex-col justify-center items-center`}
      >
        {searchInput}
      </div>
    </div>
  )

  const hamburgerOverlay = (
    <div
      className={`${styles['hamburger-overlay-mobile']} fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-white flex flex-col justify-center items-center`}
    >
      <div
        style={{ padding: 'var(--panel-padding, 30px)' }}
        className="w-full flex flex-row justify-end pb-0"
      >
        <button
          style={{ padding: '6px 5px' }}
          className="bg-transparent w-10 cursor-pointer border-none"
          onClick={onHamburgerOverlayClose}
        >
          {CrossIcon}
        </button>
      </div>
      <div
        style={{ padding: 'var(--panel-padding, 35px)' }}
        className="flex-grow w-full flex flex-col justify-center items-center"
      >
        <Link href="/" className={`${styles['logo-mobile']} h-0 md:h-24`}>
          <img
            style={{
              maxWidth: 'initial',
              height: 'inherit',
              verticalAlign: 'initial',
            }}
            className="w-auto object-contain"
            src="/assets/images/logo-full.svg"
            alt="少年報導者 The Reporter for Kids"
            loading="eager"
          />
        </Link>
        <div className="flex flex-row flex-wrap justify-center sm:mt-10 md:mt-10 mt-16 mb-10">
          {ContributeBtn}
          {SubscribeBtn}
          {AboutUsBtn}
        </div>
        {searchInput}
        <div className={`${styles['mobile-menu']}`}>
          <Navigation onClick={onHamburgerOverlayClose} />
        </div>
      </div>
    </div>
  )

  return (
    <div
      style={{ zIndex: '999' }}
      className="w-screen flex justify-between fixed top-0 bg-white"
      id="sticky-header"
    >
      <div
        style={{
          width: 'var(--container-width)',
          maxWidth: 'var(--normal-container-max-width)',
          minHeight: 'var(--shrink-height, var(--height))',
        }}
        className="flex justify-between h-16 ml-auto mr-auto bg-white"
      >
        <div className="flex items-center">{brand}</div>
        <div className="hidden lg:flex flex-grow justify-between items-center">
          <div
            style={{ margin: 'var(--margin, 0 10px)' }}
            className="flex flex-row items-center"
          >
            {ContributeBtn}
            {SubscribeBtn}
            {slogan}
          </div>
          <div className={'flex flex-row items-center'}>
            <div className={`${styles.menu}`}>
              <Navigation />
            </div>
            {search}
            {about}
          </div>
        </div>
        <div className="lg:hidden flex flex-row justify-center">
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
