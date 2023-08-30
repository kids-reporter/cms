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

  return (
    config &&
    posts?.length > 0 && (
      <div className="section">
        <div className="section-head">
          <img className="image-left" src={`/images/${config.image}`} />
          <img
            className="image-title"
            src={`/images/${config.titleImg}`}
            alt={config.title}
          />
          <a
            href={config.link}
            className={`rpjr-btn rpjr-btn-theme-outline theme-${config.theme}`}
          >
            看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
          </a>
        </div>
        <PostSlider posts={posts} sliderTheme={config.theme} />
      </div>
    )
  )
}

export default Section
