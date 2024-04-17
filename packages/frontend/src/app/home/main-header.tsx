import Link from 'next/link'
import StickyHeader, {
  ContributeBtn,
  SubscribeBtn,
  AboutUsBtn,
} from '@/app/components/header'
import HomeTopDetector from './home-top-detector'
import { Navigation } from '@/app/components/navigation'
import { SearchIcon } from '@/app/icons'
import { SEARCH_PLACEHOLDER } from '@/app/constants'
import styles from './main-header.module.css'

export const MainHeader = () => {
  const searchInput = (
    <form
      className="max-w-64 w-full h-10 flex flex-row items-center relative"
      role="search"
      method="get"
      action="/search"
      aria-haspopup="listbox"
    >
      <input
        className="text-gray-500 w-full h-full text-base bg-gray-200 pl-3 pr-10 border-none rounded-3xl focus:outline-none"
        type="text"
        placeholder={SEARCH_PLACEHOLDER}
        name="q"
        title="Search for..."
        aria-label="Search for..."
      />
      <button
        className="search-submit absolute right-2.5 bg-transparent cursor-pointer border-none"
        type="submit"
        aria-label="搜尋按鈕"
      >
        {SearchIcon}
      </button>
    </form>
  )

  return (
    <>
      <div className="w-screen lg:hidden">
        <StickyHeader />
      </div>
      <div>
        <div
          style={{ width: '90vw', gridTemplateColumns: '1fr auto 1fr' }}
          className="max-w-7xl hidden lg:grid items-end mx-auto mb-16 p-9"
        >
          <div>
            <img
              className="h-auto max-w-full align-middle"
              src="/assets/images/navbar_pic.svg"
              width="291"
            />
          </div>
          <div className={`${styles.menu} h-72 flex flex-col justify-end`}>
            <Link className="flex flex-col items-center" href="/">
              <img
                className="max-w-80 mb-10"
                src="/assets/images/logo-full.svg"
                alt="少年報導者 The Reporter for Kids"
              />
            </Link>
            <Navigation />
          </div>
          <div className="h-56 flex flex-col justify-end items-end">
            <div className="h-full flex flex-col justify-between">
              {searchInput}
              <div className="h-8 flex flex-row items-center">
                {ContributeBtn}
                {SubscribeBtn}
                {AboutUsBtn}
              </div>
            </div>
          </div>
          <HomeTopDetector />
        </div>
      </div>
    </>
  )
}

export default MainHeader
