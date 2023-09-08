import Tags from '@/app/components/tags'
import PostSlider from '@/app/components/post-slider'
import Pagination from '@/app/components/pagination'
import { Theme } from '@/app/constants'
import { GetFormattedDate, ShortenParagraph } from '@/app/utils'
import './page.scss'

// TODO: remove mockup
import { MOCKUP_TAGS, topicMockup, postMockupsMore } from '@/app/mockup'

const titleLengthLimit = 30
const descLengthLimit = 110

const moreComponent = (
  <div className={`rpjr-btn rpjr-btn-theme-outline theme-blue`}>
    看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
  </div>
)

// TODO: improve '國內專題' logic
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
            {ShortenParagraph(topic.brief, descLengthLimit) ?? ''}
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

export default function Topic() {
  // TODO: fetch data
  const featuredTopic = topicMockup[0]
  const featuredTopics = postMockupsMore
  const topics = topicMockup

  return (
    <main>
      <div className="content">
        <img src={'/images/topic_pic.svg'} />
        <Tags tags={MOCKUP_TAGS} />
        <div className="topic-summary">
          <TopicCard topic={featuredTopic} />
          <PostSlider
            posts={featuredTopics}
            sliderTheme={Theme.BLUE}
            showDesc={false}
          />
        </div>
        {topics?.length > 0 && (
          <div className="topic-list">
            {topics.map((topic, index) => {
              return <TopicCard key={`topic-card-${index}`} topic={topic} />
            })}
          </div>
        )}
        <Pagination pageNum={10} />
      </div>
    </main>
  )
}
