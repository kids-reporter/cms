import Link from 'next/link'
import PostCard from '@/app/components/post-card'
import { PostSummary } from '@/app/components/types'
import { getFormattedDate } from '@/app/utils'
import styles from './post-selection.module.css'

type PostSelectionProp = {
  latestPosts: PostSummary[]
  featuredPosts: PostSummary[]
}

const PostBrick = ({ post }: { post: PostSummary }) => {
  return (
    post && (
      <Link className={`${styles['post-brick']} flex flex-col`} href={post.url}>
        <div className="flex flex-row justify-between items-center">
          <p
            style={{ lineHeight: '160%', letterSpacing: '.2em' }}
            className="font-medium text-sm text-gray-500 text-left"
          >{`${post.category ?? ''}/${post.subSubcategory ?? ''}`}</p>
          <p
            style={{ letterSpacing: '.05em', color: 'var(--paletteColor6)' }}
            className="font-bold text-sm text-right items-center"
          >
            {post.publishedDate ? getFormattedDate(post.publishedDate) : ''}
          </p>
        </div>
        <p
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '2',
            lineHeight: '160%',
            letterSpacing: '.08em',
          }}
          className="overflow-hidden font-bold text-lg text-gray-900 text-left mt-5"
        >
          {post.title}
        </p>
      </Link>
    )
  )
}

export const PostSelection = (props: PostSelectionProp) => {
  const latestPosts = props?.latestPosts
  const featuredPosts = props?.featuredPosts

  return (
    <div
      style={{ backgroundColor: '#fff9ec' }}
      className="w-full flex flex-col items-center py-5"
    >
      <img
        className="max-w-52 w-full my-8 mx-auto"
        src={'/assets/images/selected_news.png'}
        alt="精選文章"
      />
      <div className="max-w-screen-xl flex flex-col lg:flex-row p-6 gap-10">
        <div
          style={{ flexGrow: '8', flexBasis: '25%' }}
          className="flex flex-col justify-between flex-shrink gap-5"
        >
          <div className="flex flex-row justify-between items-center bg-white rounded-3xl pt-2.5 pb-3 pl-3.5 pr-5">
            <span
              style={{ lineHeight: '160%', letterSpacing: '.08em' }}
              className="flex items-center font-bold text-xl text-gray-900 gap-2.5"
            >
              <img src={'/assets/images/home-icon-clock.svg'} />
              最新文章
            </span>
            <Link
              style={{ lineHeight: '160%', letterSpacing: '.08em' }}
              className="flex items-center font-medium text-lg text-gray-900 gap-1"
              href={'/all'}
            >
              更多
              <i className="icon-rpjr-icon-arrow-right" />
            </Link>
          </div>
          <div
            style={{ flex: '1' }}
            className="sm:hidden md:grid lg:grid md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-6 bg-white rounded-3xl px-7 py-5 gap-8"
          >
            {latestPosts?.map((post, index) => {
              return <PostBrick key={`latest-post-${index}`} post={post} />
            })}
          </div>
        </div>
        {featuredPosts?.length > 0 && (
          <div
            style={{ flexGrow: '25', flexBasis: '75%' }}
            className="flex flex-col flex-shrink rounded-3xl gap-5"
          >
            <div
              style={{ rowGap: '20px' }}
              className="inline-flex justify-between flex-wrap"
            >
              <div className={`${styles['card-child-1']}`}>
                {featuredPosts?.[0] && (
                  <PostCard post={featuredPosts[0]} isSimple={true} />
                )}
              </div>
              <div className={`${styles['card-child-2']}`}>
                {featuredPosts?.[1] && (
                  <PostCard post={featuredPosts[1]} isSimple={true} />
                )}
              </div>
              <div className={`${styles['card-child-rest']}`}>
                {featuredPosts?.[2] && (
                  <PostCard post={featuredPosts[2]} isSimple={true} />
                )}
              </div>
              <div className={`${styles['card-child-rest']}`}>
                {featuredPosts?.[3] && (
                  <PostCard post={featuredPosts[3]} isSimple={true} />
                )}
              </div>
              <div className={`${styles['card-child-rest']}`}>
                {featuredPosts?.[4] && (
                  <PostCard post={featuredPosts[4]} isSimple={true} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostSelection
