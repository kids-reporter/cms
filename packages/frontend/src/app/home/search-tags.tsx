'use client'
import Tags, { Tag } from '@/app/components/tags'
import { SearchIcon } from '@/app/icons'
import { Theme } from '@/app/constants'
import './search-tags.scss'

type SearchTagsProp = {
  tags: Tag[]
}

export const SearchTags = (props: SearchTagsProp) => {
  const tags = props?.tags

  return (
    <div className={`search-tags theme-${Theme.YELLOW}`}>
      <img decoding="async" src="/images/search_title.svg" />
      <form role="search" method="get" action="/search" aria-haspopup="listbox">
        <input
          type="search"
          placeholder="搜尋更多新聞、議題"
          name="q"
          title="Search for..."
          aria-label="Search for..."
        />
        <button type="submit" className="search-submit" aria-label="搜尋按鈕">
          {SearchIcon}
        </button>
      </form>
      {tags && (
        <div className="tags">
          <Tags title={'常用關鍵字'} tags={tags} fill={true} />
        </div>
      )}
    </div>
  )
}

export default SearchTags
