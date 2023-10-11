import axios from 'axios'
import StickyHeader from '@/app/components/header'
import MainHeader from '@/app/home/main-header'
import HomeTopDetector from '@/app/home/home-top-detector'
import MainSlider from '@/app/home/main-slider'
import PostSelection from '@/app/home/post-selection'
import Section from '@/app/home/section'
import Divider from '@/app/home/divider'
import SearchTags from '@/app/home/search-tags'
import MakeFriends from '@/app/home/make-friend'
import CallToAction from '@/app/home/call-to-action'
import GoToMainSite from '@/app/home/go-to-main-site'
import { PostSummary } from './components/types'
import { API_URL, CMS_URL, POST_CONTENT_GQL, Theme } from '@/app/constants'
import { GetPostSummaries } from '@/app/utils'
import './page.scss'

const sections = [
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
    category: 'listening-news',
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

const topicsGQL = `
query Query($orderBy: [ProjectOrderByInput!]!, $take: Int) {
  projects(orderBy: $orderBy, take: $take) {
    title
    subtitle
    slug
    heroImage {
      resized {
        medium
      }
      imageFile {
        url
      }
    }
  }
}
`

const latestPostsGQL = `
query($orderBy: [PostOrderByInput!]!, $take: Int) {
  posts(orderBy: $orderBy, take: $take) {
    ${POST_CONTENT_GQL}
  }
}
`

const editorPicksGQL = `
query($take: Int) {
  editorPicksSettings {
    editorPicksOfPosts(take: $take) {
      ${POST_CONTENT_GQL}
    }
    editorPicksOfTags {
      name
      slug
    }
  }
}
`

const categoryPostsGQL = `
query($where: CategoryWhereUniqueInput!, $take: Int) {
  category(where: $where) {
    relatedPosts(take: $take) {
      ${POST_CONTENT_GQL}
    }
  }
}
`

const subcategoryPostsGQL = `
query($where: SubcategoryWhereUniqueInput!, $take: Int) {
  subcategory(where: $where) {
    relatedPosts(take: $take) {
      ${POST_CONTENT_GQL}
    }
  }
}
`

const topicsNum = 9
const latestPostsNum = 6
const featuredPostsNum = 5
const sectionPostsNum = 6
const sortOrder = {
  publishedDate: 'desc',
}

export default async function Home() {
  let topics,
    latestPosts: PostSummary[] = [],
    featuredPosts: PostSummary[] = [],
    sectionPostsArray: PostSummary[][] = [],
    tags

  // 1. Fetch topics
  try {
    const topicsRes = await axios.post(API_URL, {
      query: topicsGQL,
      variables: {
        orderBy: sortOrder,
        take: topicsNum,
      },
    })
    topics = topicsRes?.data?.data?.projects?.map((topic: any) => {
      return {
        url: `/topic/${topic.slug}`,
        image: topic?.heroImage?.imageFile?.url
          ? `${CMS_URL}${topic.heroImage.imageFile.url}`
          : '',
        title: topic.title,
        subtitle: topic.subtitle,
      }
    })
  } catch (err) {
    console.error('Fetch topics failed!', err)
  }

  // 2. Fetch latest posts
  try {
    const latestPostsRes = await axios.post(API_URL, {
      query: latestPostsGQL,
      variables: {
        orderBy: sortOrder,
        take: latestPostsNum,
      },
    })
    latestPosts = GetPostSummaries(latestPostsRes?.data?.data?.posts)
  } catch (err) {
    console.error('Fetch latest posts failed!', err)
  }

  // 3. Fetch featured posts & tags
  try {
    const editorPicksRes = await axios.post(API_URL, {
      query: editorPicksGQL,
      variables: {
        take: featuredPostsNum,
      },
    })
    featuredPosts = GetPostSummaries(
      editorPicksRes?.data?.data?.editorPicksSettings?.[0]?.editorPicksOfPosts
    )
    tags =
      editorPicksRes?.data?.data?.editorPicksSettings?.[0]?.editorPicksOfTags
  } catch (err) {
    console.error('Fetch featured posts & tags failed!', err)
  }

  // 4. Fetch posts for each section
  try {
    sectionPostsArray = await Promise.all(
      sections.map(async (section): Promise<any> => {
        // Get category/subcategory name from link.
        // ex: '/category/listening-news/' => split to ['category', 'listening-news'] => pop 'listening-news'
        const categoryTokens = section.link
          .replace(/(^\/)|(\/$)/g, '')
          .split('/')
        const targetGQL =
          categoryTokens.length === 3 ? subcategoryPostsGQL : categoryPostsGQL
        const targetSlug = categoryTokens.pop()
        const res = await axios.post(API_URL, {
          query: targetGQL,
          variables: {
            where: {
              slug: targetSlug,
            },
            take: sectionPostsNum,
          },
        })
        return GetPostSummaries(res?.data?.data?.subcategory?.relatedPosts)
      })
    )
  } catch (err) {
    console.error('Fetch posts for each section failed!', err)
  }

  return (
    <>
      <StickyHeader />
      <main>
        <MainHeader />
        <HomeTopDetector />
        {topics?.length > 0 && <MainSlider topics={topics} />}
        <PostSelection
          latestPosts={latestPosts}
          featuredPosts={featuredPosts}
        />
        {sections.map((sectionConfig, index) => {
          return (
            <>
              <Section
                key={`section-${index}`}
                config={sectionConfig}
                posts={sectionPostsArray?.[index]}
              />
              {index < sections.length - 1 ? <Divider /> : null}
            </>
          )
        })}
        <SearchTags tags={tags} />
        <MakeFriends />
        <CallToAction />
        <GoToMainSite />
      </main>
    </>
  )
}
