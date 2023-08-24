import axios from 'axios'
import { notFound } from 'next/navigation'
import { Header } from '@/app/components/header'
import PostSlider from '@/app/components/post-slider'
import MainSlider from '@/app/home/main-slider'
import PostSelection from '@/app/home/post-selection'
import Divider from '@/app/home/divider'
import SearchTags from '@/app/home/search-tags'
import MakeFriends from '@/app/home/make-friend'
import CallToAction from '@/app/home/call-to-action'
import GoToMainSite from '@/app/home/go-to-main-site'
import { API_URL, Theme } from '@/app/constants'

// TODO: remove mockup
import { postMockups, postMockupsMore } from '@/app/mockup'

import './page.scss'

type Post = {
  title: string
  slug: string
}

const sliderSections = [
  {
    title: '時時刻刻',
    image: 'topic_pic1.svg',
    titleImg: 'topic_title1.svg',
    link: '/category/news/times/',
    theme: Theme.BLUE,
  },
  {
    title: '真的假的',
    image: 'topic_pic2.svg',
    titleImg: 'topic_title2.svg',
    link: '/category/news/knowledge/',
    theme: Theme.BLUE,
  },
  {
    title: '讀報新聞',
    image: 'topic_pic3.svg',
    titleImg: 'topic_title3.svg',
    link: '/category/listening-news/',
    theme: Theme.BLUE,
  },
  {
    title: '他們的故事',
    image: 'topic_pic4.svg',
    titleImg: 'topic_title4.svg',
    link: '/category/news/story/',
    theme: Theme.RED,
  },
  {
    title: '文化看世界',
    image: 'topic_pic5.svg',
    titleImg: 'topic_title5.svg',
    link: '/category/news/explore/',
    theme: Theme.RED,
  },
  {
    title: '小讀者連線',
    image: 'topic_pic7.svg',
    titleImg: 'topic_title7.svg',
    link: '/category/campus/joining/',
    theme: Theme.YELLOW,
  },
  {
    title: '圖解新聞',
    image: 'topic_pic8.svg',
    titleImg: 'topic_title8.svg',
    link: '/category/comics/graphic-news/',
    theme: Theme.YELLOW,
  },
  {
    title: '火線新聞台',
    image: 'topic_pic9.svg',
    titleImg: 'topic_title9.svg',
    link: '/category/comics/comic/',
    theme: Theme.YELLOW,
  },
]

export default async function Home() {
  let response
  try {
    // TODO: fetch date from cms
    response = await axios.post(API_URL, {
      query: `
      query {
        posts {
          title
          slug
        }
      }
    `,
    })
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }
  const posts: Post[] = response?.data?.data?.posts

  return (
    <main>
      <Header />
      <MainSlider posts={postMockupsMore} />
      <PostSelection
        latestPosts={postMockupsMore}
        featuredPosts={postMockupsMore}
      />
      {false &&
        posts?.map((post, index) => {
          return (
            <div key={`article-${index}`}>
              <a href={`/article/${post.slug}`}>{post.title}</a>
              <br />
            </div>
          )
        })}
      {sliderSections.map((section, index) => {
        return (
          <div className="section" key={`home-section-${index}`}>
            <div className="section-head">
              <img className="image-left" src={`/images/${section.image}`} />
              <img
                className="image-title"
                src={`/images/${section.titleImg}`}
                alt={section.title}
              />
              <a
                href={section.link}
                className="rpjr-btn rpjr-btn-theme-outline"
              >
                看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
              </a>
            </div>
            <PostSlider
              posts={index % 2 ? postMockups : postMockupsMore}
              sliderTheme={section.theme}
            />
            {index < sliderSections.length - 1 ? <Divider /> : null}
          </div>
        )
      })}
      <SearchTags />
      <MakeFriends />
      <CallToAction />
      <GoToMainSite />
    </main>
  )
}
