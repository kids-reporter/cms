import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostSlider from '@/app/components/post-slider'
import Pagination from '@/app/components/pagination'
import {
  GENERAL_DESCRIPTION,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
  TOPIC_PAGE_ROUTE,
  Theme,
} from '@/app/constants'
import {
  getFormattedDate,
  getPostSummaries,
  sendGQLRequest,
  log,
  LogLevel,
} from '@/app/utils'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '彙整: 專題 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

const genTopicsGQL = (hasRelatedPosts: boolean): string => {
  const relatedPostsGQL = `
    relatedPostsOrdered {
      ${POST_CONTENT_GQL}
    }
  `

  return `
  query ($orderBy: [ProjectOrderByInput!]!, $take: Int, $skip: Int!) {
    projects(orderBy: $orderBy, take: $take, skip: $skip) {
      title
      slug
      ogDescription
      heroImage {
        resized {
          medium
        }
      }
      publishedDate
      ${hasRelatedPosts ? relatedPostsGQL : ''}
    }
    projectsCount
  }
  `
}

type TopicSummary = {
  image: string
  title: string
  url: string
  desc: string
  publishedDate: string
  relatedPosts?: any[]
}

const topicIcon = '/assets/images/topic_icon.svg'

const TopicCard = (props: { topic: TopicSummary }) => {
  const moreComponent = (
    <div className={`rpjr-btn rpjr-btn-theme-outline theme-blue`}>
      看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
    </div>
  )

  const topic = props.topic
  return (
    <Link href={topic.url}>
      <div className="flex relative flex-col lg:flex-row items-stretch">
        <div className={styles['hero-image-container']}>
          <img
            className="w-full h-full object-cover align-middle"
            src={topic.image}
            loading="lazy"
          />
        </div>
        <div
          style={{ width: 'fit-content', height: 'fit-content', zIndex: '2' }}
          className="absolute top-5 left-5 bg-white lg:hidden flex flex-row items-center rounded-3xl px-4 py-1 gap-1"
        >
          <img className="w-10" src={topicIcon} loading="lazy" />
          <span
            style={{ lineHeight: '160%', letterSpacing: '0.08em' }}
            className="font-bold text-xl"
          >
            專題
          </span>
        </div>
        <div
          className={`${styles['topic-info']} flex flex-col justify-between items-start bg-white border-solid border-gray-300`}
        >
          <div className="w-full hidden lg:flex flex-row items-center gap-1">
            <img className="max-w-10" src={topicIcon} loading="lazy" />
            <span
              style={{ lineHeight: '160%', letterSpacing: '0.08em' }}
              className="font-bold text-xl"
            >
              專題
            </span>
          </div>
          <p
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '2',
              lineHeight: '160%',
              letterSpacing: '0.08em',
            }}
            className="overflow-hidden font-bold text-2xl mb-4"
          >
            {topic.title}
          </p>
          <p
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '5',
              lineHeight: '160%',
              letterSpacing: '0.08em',
            }}
            className="overflow-hidden font-normal text-base mb-4"
          >
            {topic.desc}
          </p>
          <div className="w-full flex flex-row justify-between items-end">
            <p className="font-medium text-base tracking-wider text-gray-500">
              {getFormattedDate(topic.publishedDate) ?? ''} 最後更新
            </p>
            {moreComponent}
          </div>
        </div>
      </div>
    </Link>
  )
}

// Topic's routing path: /topic/page/[page num], ex: /topic/page/1
export default async function Topic({
  params,
}: {
  params: { pageNum: string }
}) {
  if (params.pageNum?.length > 1) {
    log(LogLevel.WARNING, `Incorrect routing path! ${params.pageNum}`)
    notFound()
  }

  const currentPage = !params.pageNum ? 1 : Number(params.pageNum)
  if (!(currentPage > 0)) {
    log(LogLevel.WARNING, `Incorrect page! ${currentPage}`)
    notFound()
  }

  // Fetch projects of specific page
  const projectsRes = await sendGQLRequest({
    query: genTopicsGQL(currentPage === 1),
    variables: {
      orderBy: [
        {
          publishedDate: 'desc',
        },
      ],
      take: POST_PER_PAGE,
      skip: (currentPage - 1) * POST_PER_PAGE,
    },
  })
  if (!projectsRes) {
    log(LogLevel.WARNING, 'Emptyp topic response!')
    notFound()
  }

  const topics = projectsRes?.data?.data?.projects
  const topicsCount = projectsRes?.data?.data?.projectsCount
  const totalPages = Math.ceil(topicsCount / POST_PER_PAGE)
  if (currentPage > 1 && currentPage > totalPages) {
    log(
      LogLevel.WARNING,
      `Request page(${currentPage}) exceeds total pages(${totalPages})!`
    )
    notFound()
  }

  const topicSummaries: (TopicSummary | undefined)[] = Array.isArray(topics)
    ? topics.map((topic: any) => {
        return topic
          ? {
              image: topic.heroImage?.resized?.medium ?? '', // TODO: fallback image
              title: topic.title,
              url: `/topic/${topic.slug}`,
              desc: topic.ogDescription,
              publishedDate: topic.publishedDate,
              relatedPosts: topic.relatedPostsOrdered,
            }
          : undefined
      })
    : []

  const featuredTopic =
    currentPage === 1 && topicSummaries?.[0] ? topicSummaries[0] : null
  const featuredTopicPosts =
    featuredTopic?.relatedPosts &&
    getPostSummaries(featuredTopic.relatedPosts.filter((post) => post))

  // If has featuredTopic, list topics like [featuredTopic(topicSummaries[0])], topicSummaries[1], topicSummaries[2]...
  const topicsForListing = featuredTopic
    ? topicSummaries.slice(1)
    : topicSummaries

  return (
    <main
      className={`${styles.main} flex flex-col justify-center items-center mb-10`}
    >
      <div className="max-w-7xl w-full flex flex-col justify-center items-center gap-10">
        <img
          className="max-w-xl w-full"
          src={'/assets/images/topic_pic.svg'}
          loading="lazy"
        />
        {featuredTopic && (
          <div className="w-full flex flex-col justify-center bg-white lg:bg-gray-100 p-0 lg:p-5 gap-5 rounded-3xl">
            <TopicCard topic={featuredTopic} />
            <div className="hidden lg:block">
              {featuredTopicPosts && featuredTopicPosts.length > 0 && (
                <PostSlider
                  posts={featuredTopicPosts}
                  sliderTheme={Theme.BLUE}
                  isSimple={true}
                  enablePagination={false}
                />
              )}
            </div>
          </div>
        )}
        {topicsForListing.length > 0 && (
          <div className="w-full flex flex-col justify-center items-center gap-10">
            {topicsForListing.map((topic, index) => {
              return (
                topic && <TopicCard key={`topic-card-${index}`} topic={topic} />
              )
            })}
          </div>
        )}
        {totalPages && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            routingPrefix={TOPIC_PAGE_ROUTE}
          />
        )}
      </div>
    </main>
  )
}
