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
            <svg
              className="ct-icon"
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 15 15"
            >
              <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7z M1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
            </svg>
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
