import Link from 'next/link'
import { PostSummary, Loading } from '@/app/components/types'
import { getFormattedDate } from '@/app/utils'
import { ContentType } from '@/app/constants'

const fallbackImg = '/assets/images/404.png'

export type CardProp = {
  className?: string
  content: PostSummary & { type: ContentType; postCount?: number }
}

export const Card = ({ className, content }: CardProp) => {
  const top = (
    <div className="flex flex-row">
      <span
        style={{ color: 'var(--theme-color)', lineHeight: '160%' }}
        className="text-left font-medium text-base tracking-wider mb-1 pr-1"
      >
        {content.category}
      </span>
      {content.publishedDate && (
        <span style={{ color: '#A3A3A3', letterSpacing: '0.08em' }}>
          {`| ${getFormattedDate(content.publishedDate)}${
            content.type === ContentType.TOPIC ? '最後更新·' : ''
          }`}
        </span>
      )}
      {content?.postCount !== undefined && content.postCount > 0 && (
        <span style={{ color: '#A3A3A3', letterSpacing: '0.08em' }}>
          共{content.postCount}篇文章
        </span>
      )}
    </div>
  )

  const title = (
    <span
      style={{
        minHeight: 'auto',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '2',
        lineHeight: '160%',
        letterSpacing: '0.08em',
      }}
      className="md:min-h-16 overflow-hidden not-italic font-bold md:text-2xl text-xl text-gray-900 text-left"
    >
      {content?.type === ContentType.TAG ? '#' : ''}
      {content?.title}
    </span>
  )

  const desc = (
    <span
      style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '2',
        lineHeight: '160%',
      }}
      className="overflow-hidden text-left not-italic font-medium text-base tracking-wider text-gray-900"
    >
      {content.desc}
    </span>
  )

  const textPart = (
    <div className="flex flex-col justify-start gap-1.5">
      {top}
      {title}
      {desc}
    </div>
  )

  const imagePart = (
    <div
      style={{ aspectRatio: '16/9' }}
      className="max-w-full h-40 relative hover:scale-125"
    >
      <img
        style={{ borderRadius: '20px' }}
        className={`w-full h-full object-cover align-middle overflow-hidden rounded-2xl`}
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
        className={`w-full flex justify-start flex-col-reverse min-[320px]:flex-row gap-6 bg-transparent rounded-2xl theme-${
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
