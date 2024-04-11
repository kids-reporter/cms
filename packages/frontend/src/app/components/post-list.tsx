import PostCard from '@/app/components/post-card'
import { PostSummary } from '@/app/components/types'
import './post-list.css'

export const PostList = ({ posts }: { posts: PostSummary[] }) => {
  return (
    <>
      {posts?.length > 0 ? (
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
