import React, {useState} from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldLabel, FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/json/views'


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

const queryUserGql = `
query {
  post(where: $where) {
    onlineUsers {
      id
      name
    }
  }
}
`

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const  [ userState, setUserState ] = useState([])
  // TODO: check relationship value
  let users = JSON.parse(value) // ['1', '2']

  useEffect(() => {
    // update onlineUsers after join
    axios.post('api host', addUserGql, {
      where: { slug: ...},
      data: {
        userId: userId,
      }
    })
  },[])

  useEffect(() => {
    // update onlineUsers before leave
    window.addEventListener('beforeunload', () => {
      axios.post('api host', removeUserGql, {
        where: { slug: ...},
        data: {
          userId: userId,
        }
      })
    })
    return () => {
      window.removeEventListener('beforeunload')
    }
  }, [])

  useEffect(() => {
    // polling user data
    setInterval(async () => {
      const users = await axios.post('api host', queryUserGql)
      setUserState(users)
    }, 3000)
  })

  // TODO: get myself id, name
  users = users.push('nick')  // ['jason', 'howar', 'nick']



  return (
    <FieldContainer>
      <FieldLabel>{users.join(',')}</FieldLabel>
    </FieldContainer>
  )
}
