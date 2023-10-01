import PostSlider from '@/app/components/post-slider'
import { PostSummary } from '@/app/components/types'
import { Theme } from '@/app/constants'

import './section.scss'

export type SectionConfig = {
  image: string
  titleImg: string
  title: string
  link: string
  theme: Theme
}

type SectionProp = {
  config: SectionConfig
  posts: PostSummary[]
}

export const Section = (props: SectionProp) => {
  const config = props?.config
  const posts = props?.posts

  const moreBtn = config && (
    <a
      href={config.link}
      className={`rpjr-btn rpjr-btn-theme-outline theme-${config.theme}`}
    >
      看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
    </a>
  )

  return (
    config && (
      <div className="section">
        <div className="section-head">
          <div className="image-left">
            <img src={`/images/${config.image}`} />
          </div>
          <div className="image-title">
            <img src={`/images/${config.titleImg}`} alt={config.title} />
          </div>
          <div className="more">{moreBtn}</div>
        </div>
        {posts?.length > 0 && (
          <PostSlider posts={posts} sliderTheme={config.theme} />
        )}
        <div className="more-mobile">{moreBtn}</div>
      </div>
    )
  )
}

export default Section
