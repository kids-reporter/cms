import Link from 'next/link'
import { PostCardProp } from '@/app/components/post-card'
import { getFormattedDate } from '@/app/utils'

const fallbackImg = '/assets/images/404.png'

export enum Loading {
  LAZY = 'lazy',
  EAGER = 'eager',
}

export type CardProp = PostCardProp & {
  postCount?: number
}

export const Card = ({
  className,
  post,
  isSimple = false,
  loading = Loading.LAZY,
}: CardProp) => {
  const top = (
    <div className="flex flex-row">
      <span
        style={{ color: 'var(--theme-color)', lineHeight: '160%' }}
        className="text-left font-medium text-base tracking-wider mb-1"
      >
        {post.category}
      </span>
      <span className="text-gray-500 text-xs">
        {(post.publishedDate && getFormattedDate(post.publishedDate)) ?? ''}
      </span>
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
      {post.title}
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
      {post.desc}
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
    <div style={{ aspectRatio: '16/9' }} className="max-w-full h-40">
      <img
        style={{ borderRadius: isSimple ? '20px 20px 0 0' : '20px' }}
        className={`w-full h-full object-cover align-middle overflow-hidden rounded-2xl`}
        src={post.image ?? fallbackImg}
        loading={loading}
      />
    </div>
  )

  return (
    post && (
      <Link
        href={post.url}
        className={`w-full h-40 pl-1 pr-1 flex justify-start flex-row gap-6 bg-transparent rounded-2xl theme-${
          post.theme
        } ${className ?? ''}`}
      >
        {textPart}
        {imagePart}
      </Link>
    )
  )
}

export default Card
