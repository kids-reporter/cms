import Link from 'next/link'
import PostSlider from '@/app/components/post-slider'
import { PostSummary } from '@/app/components/types'
import { Theme, DEFAULT_THEME_COLOR } from '@/app/constants'

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
  const theme = props?.config.theme || DEFAULT_THEME_COLOR

  return (
    config && (
      <div
        style={{ width: 'min(var(--normal-container-max-width), 100%)' }}
        className="flex flex-col items-center mb-2"
      >
        <div
          style={{ width: '95%' }}
          className="flex flex-row justify-between items-center mb-12 pt-10"
        >
          <div style={{ flex: '1' }} className="hidden lg:flex">
            <img
              className="max-w-sm"
              src={`/assets/images/${config.image}`}
              loading="lazy"
            />
          </div>
          <div style={{ flex: '1' }} className="flex flex-row justify-center">
            <img
              className="w-full flex h-24 items-center justify-center"
              src={`/assets/images/${config.titleImg}`}
              alt={config.title}
              loading="lazy"
            />
          </div>
          <div
            style={{ flex: '1' }}
            className="hidden md:flex flex-row justify-end"
          >
            <Link
              href={config.link}
              className={`rpjr-btn rpjr-btn-theme-outline theme-${theme} text-xl pt-2 px-5 pb-3`}
            >
              看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
            </Link>
          </div>
        </div>
        {posts?.length > 0 && <PostSlider posts={posts} sliderTheme={theme} />}
        <div style={{ width: '90%' }} className="flex md:hidden p-2.5">
          <Link
            href={config.link}
            className={`rpjr-btn rpjr-btn-theme-outline theme-${theme} w-full flex flex-row justify-center items-center p-2 text-sm gap-1 rounded-2xl`}
          >
            看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
          </Link>
        </div>
      </div>
    )
  )
}

export default Section
