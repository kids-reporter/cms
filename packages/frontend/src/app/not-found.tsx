import { SearchIcon } from '@/app/icons'
import './not-found.scss'

export default function NotFound() {
  return (
    <div className="not-found">
      <img src="/images/404.png" alt="Not found" width="320px" />
      <h1>很抱歉，找不到符合條件的頁面。</h1>
      <div className="desc">
        看起來在這個位置找不到東西。也許可以試著找其他的？
      </div>
      <form
        role="search"
        method="get"
        className="search-form"
        action="https://kids.twreporter.org/"
        aria-haspopup="listbox"
        data-live-results="thumbs"
      >
        <input
          type="search"
          placeholder="搜尋"
          value=""
          name="s"
          title="Search for..."
          aria-label="Search for..."
        />
        <button type="submit" className="search-submit" aria-label="搜尋按鈕">
          {SearchIcon}
        </button>
      </form>
    </div>
  )
}
