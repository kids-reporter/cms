import errors from '@twreporter/errors'
import { NextResponse } from 'next/server'
import { CardProp } from '@/app/(sticky-header)/search/card'
import { ContentType, Theme } from '@/app/constants'
import { customsearch } from '@googleapis/customsearch'
import { customsearch_v1 } from '@googleapis/customsearch/v1'
import { log, LogLevel, sendGQLRequest } from '@/app/utils'

const topicQuery = `
query Query($where: ProjectWhereUniqueInput!) {
  project(where: $where) {
    relatedPostsCount
  }
}
`

const authorQuery = `
query Query($where: AuthorWhereUniqueInput!) {
  author(where: $where) {
    postsCount
  }
}
`

const tagQuery = `
query Query($where: TagWhereUniqueInput!, $take: Int, $orderBy: [PostOrderByInput!]!) {
  tag(where: $where) {
    posts(take: $take, orderBy: $orderBy) {
      heroImage {
        resized {
          tiny
        }
      }
    }
    postsCount
  }
}
`

const client = customsearch('v1')
const apiKey = process.env.SEARCH_API_KEY || ''
const cx = process.env.SEARCH_ENGINE_ID || ''
export const defaultCount = 10
export const defaultStart = 1

type SearchResult = {
  nextQuery?: {
    count?: number
    startIndex?: number
    q: string
  }
  totalResults?: string
  items: customsearch_v1.Schema$Result[]
}

const validContentTypes = Object.values(ContentType)

export async function transferItemsToCards(
  items: customsearch_v1.Schema$Result[]
): Promise<CardProp[]> {
  if (!Array.isArray(items)) {
    return items
  }

  const cardItems: CardProp[] = []
  for (const item of items) {
    const metaTag = item?.pagemap?.metatags?.[0]
    const contentType = metaTag?.['contenttype']

    if (!validContentTypes.includes(contentType)) {
      continue
    }

    const creativeWork = item?.pagemap?.creativework?.[0]
    const contentSummary = {
      type: contentType,
      image: creativeWork?.image || metaTag?.['og:image'],
      title: creativeWork?.headline || metaTag?.['og:title'],
      desc: metaTag?.['og:description'],
      publishedDate: metaTag?.['publisheddate'] ?? '',
      url: item?.link || metaTag?.['og:url'],
      category: metaTag?.['category'] ?? '',
      subSubcategory: metaTag?.['subSubcategory'] ?? '',
      theme: Theme.BLUE,
      postCount: 0,
    }

    const url = item?.link || metaTag?.['og:url']
    const slug = url.match(/(author|topic|tag)\/([^/]*)\/?/)?.[2]
    if (contentType === ContentType.TOPIC && slug) {
      const topicRes = await sendGQLRequest({
        query: topicQuery,
        variables: {
          where: {
            slug: slug,
          },
        },
      })
      contentSummary.category = '專題'
      contentSummary.postCount =
        topicRes?.data?.data?.project?.relatedPostsCount
    } else if (contentType === ContentType.AUTHOR && slug) {
      const authorRes = await sendGQLRequest({
        query: authorQuery,
        variables: {
          where: {
            slug: slug,
          },
        },
      })
      contentSummary.category = '作者'
      contentSummary.postCount = authorRes?.data?.data?.author?.postsCount
    } else if (contentType === ContentType.TAG && slug) {
      const tagRes = await sendGQLRequest({
        query: tagQuery,
        variables: {
          where: {
            slug: slug,
          },
          take: 1,
          orderBy: {
            publishedDate: 'desc',
          },
        },
      })
      contentSummary.category = '標籤'
      contentSummary.postCount = tagRes?.data?.data?.tag?.postsCount
      contentSummary.image =
        tagRes?.data?.data?.tag?.posts?.[0]?.heroImage?.resized?.tiny
    }

    cardItems.push({ content: contentSummary })
  }

  return cardItems
}

async function getSearchResults({
  cx,
  apiKey,
  q,
  start = defaultStart,
  count = defaultCount,
}: {
  cx: string
  apiKey: string
  q: string
  start?: number
  count?: number
}) {
  let searchRes
  try {
    searchRes = await client.cse.list({
      cx,
      q,
      auth: apiKey,
      start,
      num: count,
    })
  } catch (err) {
    const annotatedError = errors.helpers.wrap(
      errors.helpers.annotateAxiosError(err),
      'SearchAPIError',
      'Errors occured in quering Google Custom Search JSON API',
      { q, start, num: count }
    )
    throw annotatedError
  }

  if (!searchRes) {
    return {
      nextQuery: undefined,
      items: [],
    }
  }

  const nextPage = searchRes.data.queries?.nextPage?.[0]

  const nextQuery = nextPage
    ? {
        startIndex: nextPage.startIndex,
        count: nextPage.count,
        totalResults: nextPage.totalResults,
        q,
      }
    : undefined

  const items = searchRes?.data?.items ?? []

  return {
    // if `data.nextQuery` is `undefined`,
    // and then it means there is no more items to load.
    nextQuery,
    items,
  }
}

const filterItems = (items?: customsearch_v1.Schema$Result[]) => {
  return Array.isArray(items)
    ? items.filter((item) => {
        const contentType = item?.pagemap?.metatags?.[0]?.['contenttype']
        return validContentTypes.includes(contentType)
      })
    : items
}

export async function getFilteredSearchResults({
  cx,
  apiKey,
  q,
  start = defaultStart,
  count = defaultCount,
  accumulatedItems = [],
}: {
  cx: string
  apiKey: string
  q: string
  start?: number
  count?: number
  accumulatedItems?: customsearch_v1.Schema$Result[]
}): Promise<SearchResult> {
  let searchResults
  try {
    searchResults = await getSearchResults({
      cx,
      apiKey,
      q,
      start,
      count,
    })
  } catch (err) {
    const msg = errors.helpers.printAll(
      err,
      { withStack: true, withPayload: true },
      0,
      0
    )
    log(LogLevel.WARNING, msg)

    // Return accumulated items for workaround.
    // Google Custom Search JSON API sometimes returns different results,
    // such as `nextPage` information, for the same request API arguments.
    // Therefore, we might encounter some unexpected errors.
    // For example, `nexPage` contains `count` and `start` fields, and we take
    // those fields to query API, but the API returns error response as no further items could be requested.
    return {
      items: accumulatedItems,
    }
  }
  let _accItems = accumulatedItems
  const items = filterItems(searchResults?.items)
  if (Array.isArray(items)) {
    _accItems = _accItems.concat(items)
    // repeatedly request API to get enough items
    if (_accItems.length < count && searchResults?.nextQuery) {
      const nextCount = searchResults.nextQuery.count
      const nextStart = searchResults.nextQuery.startIndex
      return getFilteredSearchResults({
        cx,
        apiKey,
        q,
        start: nextStart,
        count: nextCount,
        accumulatedItems: _accItems,
      })
    }
  }

  return {
    nextQuery: searchResults.nextQuery,
    totalResults: searchResults.nextQuery?.totalResults,
    items: _accItems,
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  const startStr = searchParams.get('start') ?? ''
  const countStr = searchParams.get('count') ?? ''
  const postCardFormatStr = searchParams.get('post_card_format')

  const start = parseInt(startStr, 10) || defaultStart
  const count = parseInt(countStr, 10) || defaultCount
  const postCardFormat = postCardFormatStr !== 'false'

  if (!q) {
    return NextResponse.json({
      items: [],
    })
  }

  try {
    const searchResults = await getFilteredSearchResults({
      cx,
      apiKey,
      q,
      start,
      count,
    })
    if (postCardFormat) {
      const items = await transferItemsToCards(searchResults.items)
      return NextResponse.json({
        status: 'success',
        data: Object.assign(searchResults, { items }),
      })
    }

    return NextResponse.json({
      status: 'success',
      data: searchResults,
    })
  } catch (err) {
    const msg = errors.helpers.printAll(err, {
      withPayload: true,
      withStack: true,
    })
    log(LogLevel.WARNING, msg)

    return NextResponse.json(
      {
        status: 'error',
        message: errors.helper.printOne(err),
      },
      {
        status: 500,
      }
    )
  }
}
