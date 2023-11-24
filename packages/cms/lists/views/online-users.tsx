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

const queryUserGql = `
query($where: PostWhereUniqueInput!) {
  post(where: $where) {
    onlineUsers {
      name
      email
    }
  }
}
`

const mockups = [
  { name: 'jason', email: '001@gmail.com' },
  { name: 'howar', email: '002@gmail.com' },
  { name: 'nick', email: '003@gmail.com' },
]

type User = {
  name: string
  email: string
}

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const postID = value?.id
  const [users, setUsers] = useState<User[]>(mockups)

  // TODO: check relationship value
  // const users = ['jason', 'howar', 'nick'] //JSON.parse(value) // ['1', '2']

  useEffect(() => {
    // update onlineUsers after join
    /*
    axios.post('api host', addUserGql, {
      where: { slug: ...},
      data: {
        userId: userId,
      }
    })
    */
  }, [])

  useEffect(() => {
    // update onlineUsers before leave
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

  useEffect(() => {
    setInterval(async () => {
      try {
        const usersRes = await axios.post('/api/graphql', {
          query: queryUserGql,
          variables: {
            where: {
              id: postID,
            },
          },
        })
        const currentUsers = usersRes?.data?.data?.post?.onlineUsers
        console.log('onlineUsers', currentUsers)
        setUsers(mockups)
      } catch (err) {
        console.log(err)
      }
      // setUserState(users)
    }, 3000)
  })

  // TODO: get myself id, name

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
            {user.name}
            <Tooltip>{user.email}</Tooltip>
          </Avatar>
        )
      })}
    </Container>
  )
}
