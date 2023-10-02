import axios from 'axios'
import { notFound } from 'next/navigation'
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
import { API_URL, CMS_URL, Theme } from '@/app/constants'
import './page.scss'

// TODO: remove mockup
import { MOCKUP_TAGS } from '@/app/mockup'

const sections = [
  {
    title: '時時刻刻',
    image: 'topic_pic1.svg',
    titleImg: 'topic_title1.svg',
    link: '/category/news/times/',
    theme: Theme.BLUE, // TODO: get theme from category
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
    heroImage {
      resized {
        medium
      }
      imageFile {
        url
      }
    }
    slug
  }
}
`

const latestPostsGQL = `
query($orderBy: [PostOrderByInput!]!, $take: Int) {
  posts(orderBy: $orderBy, take: $take) {
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
    subSubcategories {
      name
      subcategory {
        name
      }
    }
    publishedDate
  }
}
`

// TODO: fill up filter condition for featured posts query
const featuredPostsGQL = `
query($take: Int) {
  posts(take: $take) {
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
    subSubcategories {
      name
      subcategory {
        name
      }
    }
    publishedDate
  }
}
`

const categoryPostsGQL = `
query($where: CategoryWhereUniqueInput!, $take: Int) {
  category(where: $where) {
    relatedPosts(take: $take) {
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
      subSubcategories {
        name
        subcategory {
          name
        }
      }
      publishedDate
    }
  }
}
`

const subcategoryPostsGQL = `
query($where: SubcategoryWhereUniqueInput!, $take: Int) {
  subcategory(where: $where) {
    relatedPosts(take: $take) {
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
      subSubcategories {
        name
        subcategory {
          name
        }
      }
      publishedDate
    }
  }
}
`

// const tagsGQL = ``

const topicsNum = 5 // TODO: check number
const latestPostsNum = 6
const featuredPostsNum = 5
const sectionPostsNum = 6
const sortOrder = {
  publishedDate: 'desc',
}

export default async function Home() {
  let topicsRes,
    latestPostsRes,
    featuredPostsRes,
    sectionPostsArray: PostSummary[][] = []
  try {
    topicsRes = await axios.post(API_URL, {
      query: topicsGQL,
      variables: {
        orderBy: sortOrder,
        take: topicsNum,
      },
    })

    latestPostsRes = await axios.post(API_URL, {
      query: latestPostsGQL,
      variables: {
        orderBy: sortOrder,
        take: latestPostsNum,
      },
    })

    featuredPostsRes = await axios.post(API_URL, {
      query: featuredPostsGQL,
      variables: {
        take: featuredPostsNum,
      },
    })

    sectionPostsArray = await Promise.all(
      sections.map(async (section): Promise<any> => {
        const targetSlug = section?.category ?? 'times' // TODO: fix subcategory slug
        const targetGQL = section?.category
          ? categoryPostsGQL
          : subcategoryPostsGQL // TODO: fix subcategory slug
        const res = await axios.post(API_URL, {
          query: targetGQL,
          variables: {
            where: {
              slug: targetSlug,
            },
            take: sectionPostsNum,
          },
        })

        return res?.data?.data?.subcategory?.relatedPosts?.map((post: any) => {
          return {
            image: `${CMS_URL}${post.heroImage?.imageFile?.url}`,
            title: post.title,
            url: `/article/${post.slug}`,
            desc: post.ogDescription,
            category: post.subSubcategories?.subcategory?.name,
            subSubcategory: post.subSubcategories.name,
            publishedDate: post.publishedDate,
          }
        })
      })
    )
  } catch (err) {
    console.error('Fetch home data failed!', err)
    notFound()
  }

  const topics = topicsRes?.data?.data?.projects?.map((topic: any) => {
    return {
      url: `/article/${topic.slug}`,
      image: topic?.heroImage?.imageFile?.url
        ? `${CMS_URL}${topic.heroImage.imageFile.url}`
        : '',
      title: topic.title,
    }
  })

  const latestPosts = latestPostsRes?.data?.data?.posts?.map((post: any) => {
    return {
      image: `${CMS_URL}${post.heroImage?.imageFile?.url}`,
      title: post.title,
      url: `/article/${post.slug}`,
      desc: post.ogDescription,
      category: post.subSubcategories?.subcategory?.name,
      subSubcategory: post.subSubcategories.name,
      publishedDate: post.publishedDate,
    }
  })

  const featuredPosts = featuredPostsRes?.data?.data?.posts?.map(
    (post: any) => {
      return {
        image: `${CMS_URL}${post.heroImage?.imageFile?.url}`,
        title: post.title,
        url: `/article/${post.slug}`,
        desc: post.ogDescription,
        category: post.subSubcategories?.subcategory?.name,
        subSubcategory: post.subSubcategories.name,
        publishedDate: post.publishedDate,
      }
    }
  )

  // TODO: wire up tags
  const tags = MOCKUP_TAGS

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
                posts={sectionPostsArray[index]}
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
