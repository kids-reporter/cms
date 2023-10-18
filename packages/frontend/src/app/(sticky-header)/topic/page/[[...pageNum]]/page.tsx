import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import PostSlider from '@/app/components/post-slider'
import Pagination from '@/app/components/pagination'
import {
  API_URL,
  CMS_URL,
  GENERAL_DESCRIPTION,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
  TOPIC_PAGE_ROUTE,
  Theme,
} from '@/app/constants'
import {
  GetFormattedDate,
  ShortenParagraph,
  GetPostSummaries,
} from '@/app/utils'
import './page.scss'

export const metadata: Metadata = {
  title: '彙整: 專題 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

const titleLengthLimit = 30
const descLengthLimit = 60

const genTopicsGQL = (hasRelatedPosts: boolean): string => {
  const relatedPostsGQL = `
    relatedPosts {
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
        imageFile {
          url
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

// TODO: integrate 專題 logic
const TopicCard = (props: { topic: TopicSummary }) => {
  const moreComponent = (
    <div className={`rpjr-btn rpjr-btn-theme-outline theme-blue`}>
      看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
    </div>
  )

  const topic = props.topic
  return (
    <a href={topic.url}>
      <div className="topic-container">
        <img src={topic.image} />
        <div className="icon-image">
          <img src={'/images/topic_icon.svg'} />
          <span>專題</span>
        </div>
        <div className="topic-info">
          <div className="icon">
            <img src={'/images/topic_icon.svg'} />
            <span>專題</span>
          </div>
          <p className="title">
            {ShortenParagraph(topic.title, titleLengthLimit) ?? ''}
          </p>
          <p className="desc">
            {ShortenParagraph(topic.desc, descLengthLimit) ?? ''}
          </p>
          <div className="bottom">
            <p>{GetFormattedDate(topic.publishedDate) ?? ''} 最後更新</p>
            {moreComponent}
          </div>
        </div>
      </div>
    </a>
  )
}

// Topic's routing path: /topic/page/[page num], ex: /topic/page/1
export default async function Topic({
  params,
}: {
  params: { pageNum: string }
}) {
  if (params.pageNum?.length > 1) {
    console.error('Incorrect routing path!', params.pageNum)
    notFound()
  }

  const currentPage = !params.pageNum ? 1 : Number(params.pageNum)
  if (!(currentPage > 0)) {
    console.error('Incorrect page!', currentPage)
    notFound()
  }

  let topicsCount, topics, totalPages
  try {
    // Fetch projects of specific page
    const projectsRes = await axios.post(API_URL, {
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

    topics = projectsRes?.data?.data?.projects
    topicsCount = projectsRes?.data?.data?.projectsCount
    totalPages = Math.ceil(topicsCount / POST_PER_PAGE)
    if (currentPage > totalPages) {
      console.error(
        `Request page(${currentPage}) exceeds total pages(${totalPages}!`
      )
      notFound()
    }
  } catch (err) {
    console.error('Fetch project data failed!', err)
    notFound()
  }

  const topicSummaries: (TopicSummary | undefined)[] = Array.isArray(topics)
    ? topics.map((topic: any) => {
        return topic
          ? {
              image: topic.heroImage?.imageFile?.url
                ? `${CMS_URL}${topic.heroImage.imageFile.url}`
                : '', // TODO: fallback image
              title: topic.title,
              url: `/topic/${topic.slug}`,
              desc: topic.ogDescription,
              publishedDate: topic.publishedDate,
              relatedPosts: topic.relatedPosts,
            }
          : undefined
      })
    : []

  const featuredTopic =
    currentPage === 1 && topicSummaries?.[0] ? topicSummaries[0] : null
  const featuredTopicPosts =
    featuredTopic?.relatedPosts &&
    GetPostSummaries(featuredTopic.relatedPosts.filter((post) => post))

  // If has featuredTopic, list topics like [featuredTopic(topicSummaries[0])], topicSummaries[1], topicSummaries[2]...
  const topicsForListing = featuredTopic
    ? topicSummaries.slice(1)
    : topicSummaries

  return (
    <main>
      <div className="content">
        <img className="topic-image" src={'/images/topic_pic.svg'} />
        {featuredTopic && (
          <div className="topic-summary">
            <TopicCard topic={featuredTopic} />
            <div className="topic-slider">
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
          <div className="topic-list">
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
