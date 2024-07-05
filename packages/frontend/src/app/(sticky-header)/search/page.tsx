import errors from '@twreporter/errors'
import { LoadMoreResults } from './load-more-results'
import { SearchTitle } from './styled'
import {
  getFilteredSearchResults,
  transferItemsToCards,
  defaultCount,
} from '@/app/api/search/route'
import { EMAIL, SEARCH_PLACEHOLDER } from '@/app/constants'
import { LogLevel, log } from '@/app/utils'

const apiKey = process.env.SEARCH_API_KEY || ''
const cx = process.env.SEARCH_ENGINE_ID || ''

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q: string
  }
}) {
  if (!searchParams.q) {
    return <SearchTitle>請輸入要搜尋的字串。</SearchTitle>
  }

  let data
  try {
    data = await getFilteredSearchResults({
      q: searchParams.q,
      apiKey,
      cx,
      start: 1,
      count: defaultCount,
    })
  } catch (err) {
    const msg = errors.helpers.printAll(
      err,
      { withStack: true, withPayload: true },
      0,
      0
    )
    log(LogLevel.WARNING, msg)
    return (
      <SearchTitle>
        搜尋結果服務異常，請稍候再試。 若持續發生，煩請來信至
        {EMAIL}。
      </SearchTitle>
    )
  }

  const cardItems = Array.isArray(data?.items)
    ? transferItemsToCards(data.items)
    : []

  const searchInput = (
    <form
      className="flex flex-row max-w-md w-full h-10 mb-12"
      role="search"
      method="get"
      action="/search"
      aria-haspopup="listbox"
    >
      <input
        className="w-full h-full border-solid border rounded-full text-base pl-3 pr-10 focus:outline-none"
        style={{
          color: '#232323',
          backgroundColor: '#F5F5F5',
          borderColor: '#A3A3A3',
        }}
        type="search"
        value={searchParams.q}
        placeholder={SEARCH_PLACEHOLDER}
        name="q"
        title="Search for..."
        aria-label="Search for..."
      />
    </form>
  )

  const resultCount = data?.totalResults && (
    <p
      style={{ lineHeight: '36px', letterSpacing: '0.08em' }}
      className="w-full h-9 text-left text-sm text-gray-700 align-bottom border-t-2 border-gray-200"
    >
      找到{data.totalResults}項結果
    </p>
  )

  return (
    <div className="flex flex-col justify-center items-center">
      <img src="/assets/images/search-result.png" loading="lazy" />
      {searchInput}
      {resultCount}
      <LoadMoreResults
        currentCardItems={cardItems}
        nextQuery={data.nextQuery}
      />
    </div>
  )
}
