import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/json/views'

/*
const addUserGql = `
mutation Mutation($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
  updatePost(where: $where, data: $data) {
    onlineUsers {
      connect: {
        id: $data.id
      }
    }
  }
}
`

const removeUserGql = `
mutation Mutation($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
  updatePost(where: $where, data: $data) {
    onlineUsers {
      disconect: {
        id: $data.id
      }
    }
  }
}
`
*/

const currentUserGql = `
query User {
  authenticatedItem {
    ... on User {
      email
      name
    }
  }
}`

const onlineUsersGql = `
query($where: PostWhereUniqueInput!) {
  post(where: $where) {
    onlineUsers {
      name
      email
    }
  }
}
`

/*
const mockups = [
  { name: 'jason', email: '001@gmail.com' },
  { name: 'howar', email: '002@gmail.com' },
  { name: 'nick', email: '003@gmail.com' },
]
*/

type User = {
  name: string
  email: string
}

export const Field = ({ value }: FieldProps<typeof controller>) => {
  console.log(value)
  const postID = value?.id
  const [users, setUsers] = useState<User[]>([])

  // const users = ['jason', 'howar', 'nick'] //JSON.parse(value) // ['1', '2']

  // Update onlineUsers after join
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userRes = await axios.post('/api/graphql', {
          query: currentUserGql,
        })
        const authenticatedItem = userRes?.data?.data?.authenticatedItem
        if (authenticatedItem?.email && authenticatedItem?.name) {
          setUsers([
            ...users,
            { email: authenticatedItem.email, name: authenticatedItem.name },
          ])
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchCurrentUser()
  }, [])

  // Update onlineUsers before leave
  // TODO: remove setinterval
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      /*
      axios.post('api host', removeUserGql, {
        where: { slug: ...},
        data: {
          userId: userId,
        }
      })
      */
    })
    return () => {
      // window.removeEventListener('beforeunload')
    }
  }, [])

  // Polling to fetch online users
  useEffect(() => {
    setInterval(async () => {
      try {
        const usersRes = await axios.post('/api/graphql', {
          query: onlineUsersGql,
          variables: {
            where: {
              id: postID,
            },
          },
        })
        const currentUsers = usersRes?.data?.data?.post?.onlineUsers
        console.log('onlineUsers', currentUsers)
        // setUsers(mockups)
      } catch (err) {
        console.log(err)
      }
    }, 3000)
  })

  return (
    <FieldContainer>
      <Avatars users={users} />
    </FieldContainer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 0px 2px;
  background: ${(props) => props.color};
`

const Tooltip = styled.span`
  visibility: visible;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
`

// TODO: get light color only
const getColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const Avatars = (props: { users: User[] }) => {
  return (
    <Container>
      {props?.users?.map((user, index) => {
        return (
          <Avatar key={`online-user-${index}`} color={getColor()}>
            <span>{user.name?.[0]}</span>
            <Tooltip>{user.email}</Tooltip>
          </Avatar>
        )
      })}
    </Container>
  )
}
