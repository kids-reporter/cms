import StickyHeader, {
  ContributeBtn,
  SubscribeBtn,
  AboutUsBtn,
} from '@/app/components/header'
import HomeTopDetector from './home-top-detector'
import { Navigation } from '@/app/components/Navigation'
import { SearchIcon } from '@/app/icons'
import { SEARCH_FEATURE_TOGGLE } from '@/app/constants'
import './main-header.scss'

export const MainHeader = () => {
  const searchInput = (
    <form role="search" method="get" action="/search" aria-haspopup="listbox">
      <input
        disabled={!SEARCH_FEATURE_TOGGLE}
        type="text"
        placeholder="搜尋更多新聞、議題"
        name="q"
        title="Search for..."
        aria-label="Search for..."
      />
      <button
        disabled={!SEARCH_FEATURE_TOGGLE}
        type="submit"
        className="search-submit"
        aria-label="搜尋按鈕"
      >
        {SearchIcon}
      </button>
    </form>
  )

  return (
    <>
      <div className="main-header-mobile">
        <StickyHeader />
      </div>
      <div>
        <div className="main-header">
          <div className="left">
            <img src="/assets/images/navbar_pic.svg" width="291" />
          </div>
          <div className="center">
            <a href="/">
              <img
                src="/assets/images/logo-full.svg"
                alt="少年報導者 The Reporter for Kids"
              />
            </a>
            <Navigation />
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
          <HomeTopDetector />
        </div>
      </div>
    </>
  )
}

export default MainHeader
