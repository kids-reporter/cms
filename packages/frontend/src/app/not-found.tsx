import { SearchIcon } from '@/app/icons'

export default function NotFound() {
  // TODO: fix style
  return (
    <div>
      <img src="/images/404.png" alt="" width="320px" />
      <h1>很抱歉，找不到符合條件的頁面。</h1>
      <div className="page-description">
        看起來在這個位置找不到東西。也許可以試著找其他的？
      </div>
      <div className="entry-content">
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
            <span data-loader="circles">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
