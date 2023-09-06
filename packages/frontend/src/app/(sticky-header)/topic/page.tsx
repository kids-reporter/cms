import Tags from '@/app/components/tags'
import Pagination from '@/app/components/pagination'
import { GetFormattedDate, ShortenParagraph } from '@/app/utils'
import './page.scss'

// TODO: remove mockup
import { MOCKUP_TAGS, topicMockup } from '@/app/mockup'

const titleLengthLimit = 30
const descLengthLimit = 110

const moreComponent = (
  <div className={`rpjr-btn rpjr-btn-theme-outline theme-blue`}>
    看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
  </div>
)

export default function Topic() {
  const topics = topicMockup

  return (
    <main>
      <div className="content">
        <img src={'/images/topic_pic.svg'} />
        <Tags tags={MOCKUP_TAGS} />
        <div className="topic-summary"></div>
        <div className="topic-list">
          {topics.map((topic, index) => {
            return (
              <a key={`topic-${index}`} href={topic.url}>
                <div className="topic-container">
                  <img src={topic.image} />
                  <div className="topic-info">
                    <p>
                      {ShortenParagraph(topic.title, titleLengthLimit) ?? ''}
                    </p>
                    <p>
                      {ShortenParagraph(topic.brief, descLengthLimit) ?? ''}
                    </p>
                    <div className="bottom">
                      <p>
                        {GetFormattedDate(topic.lastUpdateDate) ?? ''} 最後更新
                      </p>
                      {moreComponent}
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
        <Pagination pageNum={10} />
      </div>
    </main>
  )
}
