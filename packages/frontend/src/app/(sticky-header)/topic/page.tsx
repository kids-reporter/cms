import Tags from '@/app/components/tags'
import Pagination from '@/app/components/pagination'
import './page.scss'

// TODO: remove mockup
import { MOCKUP_TAGS } from '@/app/mockup'

export default function Topic() {
  return (
    <main>
      <div className="content">
        <img src={'/images/topic_pic.svg'} />
        <Tags tags={MOCKUP_TAGS} />
        <div className="topic-summary"></div>
        <div className="topic-list"></div>
        <Pagination pageNum={10} />
      </div>
    </main>
  )
}
