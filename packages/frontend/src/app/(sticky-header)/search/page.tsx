import errors from '@twreporter/errors'
import { LoadMoreResults } from './load-more-results'
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
    ? transferItemsToCards(data.items)
    : []

  return (
    <div>
      <SearchTitle>搜尋結果 {searchParams.q}</SearchTitle>
      <LoadMoreResults
        currentCardItems={cardItems}
        nextQuery={data.nextQuery}
      />
    </div>
  )
}
