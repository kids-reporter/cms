import Link from 'next/link'
import dynamic from 'next/dynamic'
import { PostSummary, Loading } from '@/app/components/types'
import { getFormattedDate } from '@/app/utils'
import { FALLBACK_IMG } from '@/app/constants'

const ImageWithFallback = dynamic(
  () => import('@/app/components/image-with-fallback'),
  { ssr: false }
)

export type PostCardProp = {
  className?: string
  post: PostSummary
  isSimple?: boolean
  loading?: Loading
}

export const PostCard = ({
  className,
  post,
  isSimple = false,
  loading = Loading.LAZY,
}: PostCardProp) => {
  return (
    post && (
      <Link
        href={post.url}
        className={`w-full h-full pl-1 pr-1 flex justify-start flex-col bg-transparent rounded-2xl theme-${
          post.theme
        } ${className ?? ''}`}
      >
        <div
          style={{ height: 'calc(100% / 16 * 9)', aspectRatio: '16/9' }}
          className="max-w-full"
        >
          <ImageWithFallback
            style={{ borderRadius: isSimple ? '20px 20px 0 0' : '20px' }}
            className={`w-full h-full object-cover align-middle overflow-hidden rounded-2xl`}
            src={post.image ?? FALLBACK_IMG}
            loading={loading}
          />
        </div>
        <div
          style={{ borderRadius: isSimple ? '0 0 20px 20px' : '' }}
          className={`h-full flex flex-col justify-between pt-5 pb-1 md:pb-5 ${
            isSimple ? 'px-5' : ''
          } bg-white`}
        >
          <div className="flex flex-col justify-start">
            <span
              style={{ color: 'var(--theme-color)', lineHeight: '160%' }}
              className="text-left font-medium text-base tracking-wider mb-1"
            >
              {post.category}
            </span>
            <span
              style={{
                minHeight: 'auto',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '2',
                lineHeight: '160%',
                letterSpacing: '0.08em',
              }}
              className="md:min-h-16 overflow-hidden not-italic font-bold text-xl text-gray-900 text-left mb-5"
            >
              {post.title}
            </span>
            {!isSimple && (
              <span
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: '3',
                  lineHeight: '160%',
                }}
                className="overflow-hidden text-left not-italic font-medium text-base tracking-wider text-gray-900 mb-5"
              >
                {post.desc}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            {post.subSubcategory && (
              <span
                style={{ background: 'var(--theme-color)', lineHeight: '160%' }}
                className="text-center text-white font-normal text-xs tracking-wider pointer-events-none rounded-3xl px-3 py-1"
              >
                {post.subSubcategory}
              </span>
            )}
            <span className="text-gray-500 text-xs">
              {(post.publishedDate && getFormattedDate(post.publishedDate)) ??
                ''}
            </span>
          </div>
        </div>
      </Link>
    )
  )
}

export default PostCard
