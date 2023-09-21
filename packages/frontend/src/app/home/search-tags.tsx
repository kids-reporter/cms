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

  // TODO: handle search
  const onHandleSearch = () => {
    console.log('search')
  }

  return (
    <div className={`search-tags theme-${Theme.YELLOW}`}>
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
      {tags && (
        <div className="tags">
          <Tags title={'常用關鍵字'} tags={tags} fill={true} />
        </div>
      )}
    </div>
  )
}

export default SearchTags
