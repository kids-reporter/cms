'use client'
import Link from 'next/link'
import { TOPIC_PAGE_ROUTE } from '@/app/constants'

const NavigationItems = [
  {
    title: '專題',
    link: TOPIC_PAGE_ROUTE,
  },
  {
    title: '新聞',
    link: '/category/news',
  },
  {
    title: '漫畫',
    link: '/category/comics',
  },
  {
    title: '教案',
    link: '/category/campus/news-classroom',
  },
  {
    title: 'Podcast',
    link: '/category/listening-news',
  },
]

export const Navigation = (props: { onClick?: () => void }) => {
  return (
    <nav aria-label="頁首選單">
      <ul role="menubar">
        {NavigationItems.map((item, index) => {
          return (
            <li key={`header-nav-item-${index}`}>
              <Link
                href={item.link}
                onClick={() => {
                  props.onClick?.()
                }}
                role="menuitem"
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
