import errors from '@twreporter/errors'
import { LoadMoreResults } from './load-more-results'
import { SearchInput } from './search-input'
import { SearchTitle } from './styled'
import {
  getFilteredSearchResults,
  transferItemsToCards,
  defaultCount,
} from '@/app/api/search/route'
import { EMAIL, ContentType } from '@/app/constants'
import { LogLevel, log } from '@/app/utils'

const apiKey = process.env.SEARCH_API_KEY || ''
const cx = process.env.SEARCH_ENGINE_ID || ''

// Filtering search output: https://developers.google.com/custom-search/docs/structured_search
const filterParams = Object.values(ContentType)
  .map((type) => `more:pagemap:metatags-contenttype:${type}`)
  .join(' OR ')

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
      q: `${searchParams.q} ${filterParams}`,
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

  const searchImg = (
    <img
      className="md:px-4 px-3"
      src="/assets/images/search-result.png"
      loading="lazy"
    />
  )

  const resultCount = data?.totalResults && (
    <p
      style={{ letterSpacing: '0.08em', color: '#595959' }}
      className="w-full text-left text-sm font-medium pt-4 border-t-2 border-gray-200"
    >
      找到 {data.totalResults} 項結果
    </p>
  )

  const cardItems = Array.isArray(data?.items)
    ? await transferItemsToCards(data.items)
    : []

  return (
    <div className="xl:max-w-4xl md:max-w-2xl max-w-full flex flex-col justify-center items-center pt-8 mx-4">
      {searchImg}
      <SearchInput value={searchParams.q} />
      {resultCount}
      <LoadMoreResults
        currentCardItems={cardItems}
        nextQuery={data.nextQuery}
      />
    </div>
  )
}
