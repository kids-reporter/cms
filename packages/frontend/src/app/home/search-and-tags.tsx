import Tags, { Tag } from '@/app/components/tags'
import { SearchIcon } from '@/app/icons'
import { Theme, SEARCH_PLACEHOLDER } from '@/app/constants'

type SearchAndTagsProp = {
  tags: Tag[]
}

export const SearchAndTags = (props: SearchAndTagsProp) => {
  const tags = props?.tags
  return (
    <div
      className={`w-full flex flex-col justify-center items-center pl-8 pr-8 mb-16 theme-${Theme.YELLOW}`}
    >
      <img
        className="max-w-64 w-full mb-10"
        decoding="async"
        src="/assets/images/search_title.svg"
      />
      <form
        style={{ maxWidth: '50%' }}
        className="w-full h-10 flex flex-row items-center mb-12 relative"
        role="search"
        method="get"
        action="/search"
        aria-haspopup="listbox"
      >
        <input
          className="w-full h-full border-solid border-2 rounded-full text-base bg-white pl-3 pr-10 focus:outline-none"
          style={{
            color: 'var(#A3A3A3, var(--color))',
            borderColor: 'var(--theme-color)',
          }}
          type="text"
          placeholder={SEARCH_PLACEHOLDER}
          name="q"
          title="Search for..."
          aria-label="Search for..."
        />
        <button
          className="w-4 h-4 absolute bg-transparent cursor-pointer border-0 right-2.5"
          type="submit"
          aria-label="搜尋按鈕"
        >
          {SearchIcon}
        </button>
      </form>
      {tags && (
        <div className="max-w-lg">
          <Tags title={'常用關鍵字'} tags={tags} fill={true} />
        </div>
      )}
    </div>
  )
}

export default SearchAndTags
