'use client'
import Tags from '@/app/components/tags'
import { SearchIcon } from '@/app/icons'
import { MOCKUP_TAGS } from '@/app/mockup'

import './search-tags.scss'

export const SearchTags = () => {
  // TODO: handle search
  const onHandleSearch = () => {
    console.log('search')
  }

  return (
    <div className="search-tags">
      <img decoding="async" src="/images/search_title.svg" width="265" />
      <form
        role="search"
        method="get"
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
        </button>
        <input type="hidden" name="post_type" value="post" />
      </form>
      <Tags tags={MOCKUP_TAGS} />
    </div>
  )
}

export default SearchTags
