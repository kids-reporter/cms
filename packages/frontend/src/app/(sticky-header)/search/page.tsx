import errors from '@twreporter/errors'
import { LoadMoreResults } from './load-more-results'
import { SearchInput } from './search-input'
import { SearchTitle } from './styled'
import {
  getFilteredSearchResults,
  transferItemsToCards,
  defaultCount,
} from '@/app/api/search/route'
import { EMAIL } from '@/app/constants'
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
    ? await transferItemsToCards(data.items)
    : []

  const resultCount = data?.totalResults && (
    <p
      style={{ letterSpacing: '0.08em', color: '#595959' }}
      className="w-full text-left text-sm font-medium pt-4 border-t-2 border-gray-200"
    >
      找到{data.totalResults}項結果
    </p>
  )

  return (
    <div className="flex flex-col justify-center items-center pt-8 px-4">
      <img
        className="min-[320px]:px-4 px-3"
        src="/assets/images/search-result.png"
        loading="lazy"
      />
      <SearchInput value={searchParams.q} />
      {resultCount}
      <LoadMoreResults
        currentCardItems={cardItems}
        nextQuery={data.nextQuery}
      />
    </div>
  )
}
