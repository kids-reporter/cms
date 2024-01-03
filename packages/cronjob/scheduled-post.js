import { config } from './configs.js'
import { TokenManager, errorHandling, errors } from './utils.js'
import axios from 'axios'

const getScheduledPosts = async () => {
  // fetch qualified scheduled posts
  const getPayload = {
    query: `
      query Posts($where: PostWhereInput!) {
        posts(where: $where) {
          id
        }
      }
    `,
    variables: {
      where: {
        status: {
          equals: 'scheduled',
        },
        AND: [
          {
            publishedDate: {
              lte: new Date().toISOString(),
            },
          },
        ],
      },
    },
  }
  try {
    const dataRes = await axios.post(config.apiUrl, getPayload)
    const data = dataRes?.data?.data?.posts
    const idArray = data?.map((post) => post.id) || []
    return idArray
  } catch (err) {
    throw errors.helpers.annotateAxiosError(err)
  }
}

const updatePostStatus = async (postIds) => {
  // fetch keystone session cookie token
  const tokenManager = new TokenManager(
    config.cronjobAccount.email,
    config.cronjobAccount.password,
    config.apiUrl
  )
  const token = await tokenManager.getToken()

  // build payload
  let updatePayload = {
    query: `
        mutation UpdatePosts($data: [PostUpdateArgs!]!) {
          updatePosts(data: $data) {
            id
            status
          }
        }
      `,
    variables: {
      data: [],
    },
  }
  postIds.forEach((postId) => {
    updatePayload.variables.data.push({
      where: {
        id: postId,
      },
      data: {
        status: 'published',
      },
    })
  })

  // update post status
  try {
    console.log(`Update post ${postIds} status to published.`)
    const update = await axios.post(config.apiUrl, updatePayload, {
      withCredentials: true,
      headers: {
        Cookie: `keystonejs-session=${token}`,
      },
    })
    if (update?.data?.errors) {
      throw new Error(update?.data?.errors[0]?.message)
    }
  } catch (err) {
    throw errors.helpers.annotateAxiosError(err)
  }
}

const main = async () => {
  try {
    const scheduledPosts = await getScheduledPosts()
    if (scheduledPosts.length === 0) {
      console.log(`No scheduled posts.`)
    } else {
      console.log(`Scheduled posts: ${scheduledPosts}`)
      await updatePostStatus(scheduledPosts)
    }
  } catch (err) {
    errorHandling(err)
  }
  console.log(`Cronjob scheduled-post completed.`)
}

main()
