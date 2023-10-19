import PostCard from '@/app/components/post-card'
import { PostSummary } from '@/app/components/types'
import './post-list.scss'

export const PostList = ({ posts }: { posts: PostSummary[] }) => {
  return (
    <>
      {posts?.length > 0 ? (
        <div className="post-list">
          {posts.map((post, index) => {
            return (
              post && <PostCard key={`author-post-card-${index}`} post={post} />
            )
          })}
        </div>
      ) : (
        <h1>沒有文章</h1>
      )}
    </>
  )
}

export default PostList
