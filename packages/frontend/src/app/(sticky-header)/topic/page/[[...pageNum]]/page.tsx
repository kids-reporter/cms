import axios from 'axios'
import { notFound } from 'next/navigation'
import PostSlider from '@/app/components/post-slider'
import Pagination from '@/app/components/pagination'
import {
  API_URL,
  CMS_URL,
  POST_PER_PAGE,
  TOPIC_PAGE_ROUTE,
  Theme,
} from '@/app/constants'
import { GetFormattedDate, ShortenParagraph } from '@/app/utils'
import './page.scss'

// TODO: remove mockup
import { topicMockup, postMockupsMore } from '@/app/mockup'

const titleLengthLimit = 30
const descLengthLimit = 110

const topicsGQL = `
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
  }
  projectsCount
}
`

const moreComponent = (
  <div className={`rpjr-btn rpjr-btn-theme-outline theme-blue`}>
    看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
  </div>
)

// TODO: integrate 專題 logic
const TopicCard = (props: any) => {
  const topic = props.topic
  return (
    <a href={topic.url}>
      <div className="topic-container">
        <img src={topic.image} />
        <div className="topic-info">
          <img
            src={
              topic.type === '國內專題'
                ? '/images/topic-local.png'
                : '/images/topic-international.png'
            }
          />
          <p className="title">
            {ShortenParagraph(topic.title, titleLengthLimit) ?? ''}
          </p>
          <p className="desc">
            {ShortenParagraph(topic.desc, descLengthLimit) ?? ''}
          </p>
          <div className="bottom">
            <p>{GetFormattedDate(topic.lastUpdateDate) ?? ''} 最後更新</p>
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
      query: topicsGQL,
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

  // TODO: fetch 1st topic
  const featuredTopic = topicMockup[0]
  const featuredTopics = postMockupsMore

  const topicSummaries: any[] = Array.isArray(topics)
    ? topics.map((topic: any) => {
        return topic
          ? {
              image: topic.heroImage?.imageFile?.url
                ? `${CMS_URL}${topic.heroImage.imageFile.url}`
                : undefined, // TODO: fallback image
              title: topic.title,
              url: `/topic/${topic.slug}`,
              desc: topic.ogDescription,
              publishedDate: topic.publishedDate,
            }
          : undefined
      })
    : []

  return (
    <main>
      <div className="content">
        <img className="topic-image" src={'/images/topic_pic.svg'} />
        <div className="topic-summary">
          <TopicCard topic={featuredTopic} />
          <div className="topic-slider">
            <PostSlider
              posts={featuredTopics}
              sliderTheme={Theme.BLUE}
              showDesc={false}
            />
          </div>
        </div>
        {topicSummaries?.length > 0 && (
          <div className="topic-list">
            {topicSummaries.map((topic, index) => {
              return <TopicCard key={`topic-card-${index}`} topic={topic} />
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
