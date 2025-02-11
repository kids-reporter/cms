import Link from 'next/link'
import { PostSummary, Loading } from '@/app/components/types'
import { getFormattedDate } from '@/app/utils'
import { ContentType } from '@/app/constants'

import styles from './card.module.css'

const fallbackImg = '/assets/images/404.png'

export type CardProp = {
  className?: string
  content: PostSummary & { type: ContentType; postCount: number }
}

export const Card = ({ className, content }: CardProp) => {
  const top = (
    <div className="flex flex-row">
      <span
        style={{ color: 'var(--theme-color)', lineHeight: '160%' }}
        className="text-left font-medium md:text-base text-sm tracking-wider"
      >
        {content.category}
      </span>
      {content.publishedDate || content.postCount > 0 ? (
        <span
          className="md:text-base text-sm"
          style={{ color: '#A3A3A3', letterSpacing: '0.08em' }}
        >
          ｜
        </span>
      ) : null}
      {content.publishedDate ? (
        <span
          className="md:text-base text-sm"
          style={{ color: '#A3A3A3', letterSpacing: '0.08em' }}
        >
          {`${getFormattedDate(content.publishedDate)}${
            content.type === ContentType.TOPIC ? ' 最後更新·' : ''
          }`}
        </span>
      ) : null}
      {content?.postCount !== undefined && content.postCount > 0 ? (
        <span
          className="md:text-base text-sm"
          style={{ color: '#A3A3A3', letterSpacing: '0.08em' }}
        >
          {`共 ${content.postCount} 篇文章`}
        </span>
      ) : null}
    </div>
  )

  const title = (
    <span
      style={{
        minHeight: 'auto',
        lineHeight: '160%',
        letterSpacing: '0.08em',
      }}
      className={`${styles.title} md:min-h-16 overflow-hidden not-italic font-bold md:text-2xl text-xl text-gray-900 text-left`}
    >
      {content?.type === ContentType.TAG ? '#' : ''}
      {content?.title}
    </span>
  )

  const desc = (
    <span
      style={{
        lineHeight: '160%',
      }}
      className={`${styles.desc} overflow-hidden text-left not-italic font-medium text-base tracking-wider text-gray-900`}
    >
      {content.desc}
    </span>
  )

  const textPart = (
    <div className="flex flex-col justify-start md:gap-1.5 gap-1">
      {top}
      {title}
      {desc}
    </div>
  )

  const imagePart = (
    <div
      style={{ aspectRatio: '16/9' }}
      className="shrink-0 max-w-full md:h-40 h-full relative overflow-hidden rounded-2xl"
    >
      <img
        style={{ borderRadius: '20px' }}
        className={`w-full h-full object-cover align-middle hover:scale-125`}
        src={content.image ?? fallbackImg}
        loading={Loading.LAZY}
      />
      {content?.postCount !== undefined && content.postCount > 0 && (
        <img
          className="absolute top-2 right-2"
          src="/assets/images/multiple_articles.png"
          loading={Loading.LAZY}
        />
      )}
    </div>
  )

  return (
    content && (
      <Link
        href={content.url}
        className={`w-full flex justify-start flex-col-reverse md:flex-row md:gap-6 md:gap-5 gap-3 bg-transparent rounded-2xl theme-${
          content.theme
        } ${className ?? ''}`}
      >
        {textPart}
        {imagePart}
      </Link>
    )
  )
}

export default Card
