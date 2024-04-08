import Tags, { Tag } from '@/app/components/tags'
import { SearchIcon } from '@/app/icons'
import { Theme, SEARCH_PLACEHOLDER } from '@/app/constants'
import './search-and-tags.scss'

type SearchAndTagsProp = {
  tags: Tag[]
}

export const SearchAndTags = (props: SearchAndTagsProp) => {
  const tags = props?.tags
  return (
    <div className={`search-tags theme-${Theme.YELLOW}`}>
      <img decoding="async" src="/assets/images/search_title.svg" />
      <form role="search" method="get" action="/search" aria-haspopup="listbox">
        <input
          type="text"
          placeholder={SEARCH_PLACEHOLDER}
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

export default SearchAndTags
