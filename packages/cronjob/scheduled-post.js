import { config } from './configs.js'
import { errorHandling, errors } from './utils.js'
import axios from 'axios'

const getScheduledPosts = async () => {
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
    const dataRes = await axios.post(config.graphqlUrl, getPayload)
    const data = dataRes?.data?.data?.posts
    const idArray = data?.map((post) => post.id) || []
    return idArray
  } catch (err) {
    throw errors.helpers.annotateAxiosError(err)
  }
}

const updatePostStatus = async (postIds) => {
  postIds.forEach(async (postId) => {
    console.log(postId)
    const updatePayload = {
      query: `
        mutation UpdatePosts($data: [PostUpdateArgs!]!) {
          updatePosts(data: $data) {
            id
            status
          }
        }
      `,
      variables: {
        data: [
          {
            where: {
              id: postId,
            },
            data: {
              status: 'published',
            },
          },
        ],
      },
    }
    try {
      const update = await axios.post(config.graphqlUrl, updatePayload, {
        withCredentials: true,
        headers: {
          Cookie: `keystonejs-session=${config.keystoneSessionCookie}`,
        },
      })
      if (update?.data?.errors) {
        throw new Error(update?.data?.errors[0]?.message)
      }
    } catch (err) {
      throw errors.helpers.annotateAxiosError(err)
    }
  })
}

const main = async () => {
  try {
    const scheduledPosts = await getScheduledPosts()
    console.log(scheduledPosts)
    await updatePostStatus(scheduledPosts)
  } catch (err) {
    errorHandling(err)
  }
  console.log(`Cronjob scheduled-post completed.`)
}

main()
