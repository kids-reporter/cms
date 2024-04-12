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
      <ul
        style={{
          width: 'fit-content',
          height: 'fit-content',
          border: '1.5px solid #eaeaea',
        }}
        className="menu flex flex-row items-center mt-5 px-8 py-1 plist-none text-lg rounded-3xl"
        role="menubar"
      >
        {NavigationItems.map((item, index) => {
          return (
            <li
              style={{
                padding: 'var(--menu-item-padding, 0px)',
                color: '#232323',
              }}
              key={`header-nav-item-${index}`}
            >
              <Link
                href={item.link}
                onClick={() => {
                  props.onClick?.()
                }}
                className="ct-menu-link px-3"
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
