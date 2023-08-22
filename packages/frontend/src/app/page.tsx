import axios from 'axios'
import { notFound } from 'next/navigation'
import { Header } from '@/app/components/header'
import MainSlider from '@/app/components/main-slider'
import PostSlider from '@/app/components/post-slider'
import Divider from '@/app/home/divider'
import SearchTags from '@/app/home/search-tags'
import MakeFriends from '@/app/home/make-friend'
import CallToAction from '@/app/home/call-to-action'
import GoToMainSite from '@/app/home/go-to-main-site'
import { API_URL, Theme } from '@/app/constants'
import { postMockups, postMockupsMore } from '@/app/mockup'

import './page.scss'

type Post = {
  title: string
  slug: string
}

const sliderSections = [
  {
    title: '時時刻刻',
    titleURL: 'topic_title1.svg',
    url: 'https://kids.twreporter.org/category/news/times/',
    image: 'topic_pic1.svg',
    theme: Theme.BLUE,
  },
  {
    title: '真的假的',
    titleURL: 'topic_title2.svg',
    url: 'https://kids.twreporter.org/category/news/knowledge/',
    image: 'topic_pic2.svg',
    theme: Theme.BLUE,
  },
  {
    title: '讀報新聞',
    titleURL: 'topic_title3.svg',
    url: 'https://kids.twreporter.org/category/listening-news/',
    image: 'topic_pic3.svg',
    theme: Theme.BLUE,
  },
  {
    title: '他們的故事',
    titleURL: 'topic_title4.svg',
    url: 'https://kids.twreporter.org/category/news/story/',
    image: 'topic_pic4.svg',
    theme: Theme.RED,
  },
  {
    title: '文化看世界',
    titleURL: 'topic_title5.svg',
    url: 'https://kids.twreporter.org/category/news/explore/',
    image: 'topic_pic5.svg',
    theme: Theme.RED,
  },
  {
    title: '小讀者連線',
    titleURL: 'topic_title7.svg',
    url: 'https://kids.twreporter.org/category/campus/joining/',
    image: 'topic_pic7.svg',
    theme: Theme.YELLOW,
  },
  {
    title: '圖解新聞',
    titleURL: 'topic_title8.svg',
    url: 'https://kids.twreporter.org/category/comics/graphic-news/',
    image: 'topic_pic8.svg',
    theme: Theme.YELLOW,
  },
  {
    title: '火線新聞台',
    titleURL: 'topic_title9.svg',
    url: 'https://kids.twreporter.org/category/comics/comic/',
    image: 'topic_pic9.svg',
    theme: Theme.YELLOW,
  },
]

export default async function Home() {
  let response
  try {
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
    <main className="home">
      <Header />
      <MainSlider posts={postMockupsMore} />
      <h1>TODO: 精選文章</h1>
      {posts?.map((post, index) => {
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
                src={`/images/${section.titleURL}`}
                alt={section.title}
              />
              <a href={section.url} className="rpjr-btn rpjr-btn-theme-outline">
                看更多文章 <i className="icon-rpjr-icon-arrow-right"></i>
              </a>
            </div>
            <PostSlider
              posts={
                index % 2
                  ? postMockups
                  : postMockupsMore /* TODO: remove mockup */
              }
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
