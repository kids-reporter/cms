import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/virtual/views'
import { useMutation, useQuery, gql } from '@keystone-6/core/admin-ui/apollo'

const colors = [
  '#EEE8AA',
  '#C0C0C0',
  '#87CEEB',
  '#F5DEB3',
  '#90EE90',
  '#FFB6C1',
  '#FF8C00',
  '#FFD700',
  '#66CDAA',
  '#FFE4B5',
]

const DELETE_ONLINE_USER = gql`
  mutation DeleteOnlineUser($where: OnlineUserWhereUniqueInput!) {
    deleteOnlineUser(where: $where) {
      id
    }
  }
`

const CREATE_ONLINE_USER = gql`
  mutation CreateOnlineUser($data: OnlineUserCreateInput!) {
    createOnlineUser(data: $data) {
      id
      canonicalPath
      lastOnlineAt
    }
  }
`

const UPDATE_ONLINE_USER = gql`
  mutation UpdateOnlineUser(
    $where: OnlineUserWhereUniqueInput!
    $data: OnlineUserUpdateInput!
  ) {
    updateOnlineUser(where: $where, data: $data) {
      lastOnlineAt
    }
  }
`

const GET_ONLINE_USERS = gql`
  query GetOnlineUsers($where: OnlineUserWhereInput!) {
    onlineUsers(where: $where) {
      user {
        id
        name
        email
      }
    }
  }
`

const Container = styled(FieldContainer)`
  display: flex;
  flex-direction: row;
  min-height: 40px;
`

const Tooltip = styled.span`
  visibility: hidden;
  width: fit-content;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 5px;
  position: absolute;
  z-index: 1;
  bottom: -150%;
  left: 0%;
  margin-left: -60px;
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 0px 2px;
  background: ${(props) => props.color};
  position: relative;

  &:hover ${Tooltip} {
    visibility: visible;
  }
`

type OnlineUser = {
  user: User
  canonicalPath: string
  lastOnlineAt: Date
}

type User = {
  id: string
  name: string
  email: string
}

const pollInterval = 5000 // 5 seconds
const validCheckTimeWindow = 60000 // 60 seconds

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const [validCheckTime, setValidCheckTime] = useState(
    new Date(Date.now() - validCheckTimeWindow)
  )
  const [errorMessage, setErrorMessage] = useState('')
  const canonicalPath = value?.canonicalPath
  const userData: User = value?.userData

  // Get current online users for a certain webpage
  const { error: getOnlineUsersError, data: getOnlineUsersData } = useQuery(
    GET_ONLINE_USERS,
    {
      variables: {
        where: {
          canonicalPath: {
            equals: canonicalPath,
          },
          lastOnlineAt: {
            gte: validCheckTime.toISOString(),
          },
        },
      },
    }
  )

  const [
    createOnlineUser,
    { data: createOnlineUserData, error: createOnlineUserError },
  ] = useMutation(CREATE_ONLINE_USER)
  const [deleteOnlineUser, { error: deleteOnlineUserError }] =
    useMutation(DELETE_ONLINE_USER)
  const [updateOnlineUser, { error: updateOnlineUserError }] =
    useMutation(UPDATE_ONLINE_USER)

  useEffect(() => {
    if (userData) {
      const userId = userData.id

      // tell the server that the user is online for a certain webpage
      createOnlineUser({
        variables: {
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            canonicalPath,
            lastOnlineAt: new Date().toISOString(),
          },
        },
      })

      // Set `validCheckTime` state to trigger re-render.
      setValidCheckTime(new Date(Date.now() - validCheckTimeWindow))
    }
  }, [userData, canonicalPath, createOnlineUser])

  useEffect(() => {
    const onlineUser = createOnlineUserData?.createOnlineUser

    if (!onlineUser) {
      return
    }

    // tell the server the user is offline right now
    const handleBeforeUnload = () => {
      const id = onlineUser.id
      deleteOnlineUser({
        variables: {
          where: {
            id,
          },
        },
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      handleBeforeUnload()
    }
  }, [createOnlineUserData, deleteOnlineUser])

  useEffect(() => {
    const onlineUser = createOnlineUserData?.createOnlineUser

    if (!onlineUser) {
      return
    }

    // Polling to tell the server the user is still online
    const polling = setInterval(() => {
      const id = onlineUser.id
      updateOnlineUser({
        variables: {
          where: {
            id,
          },
          data: {
            lastOnlineAt: new Date().toISOString(),
          },
        },
      })
      setValidCheckTime(new Date(Date.now() - validCheckTimeWindow))
    }, pollInterval)

    return () => {
      clearInterval(polling)
    }
  }, [createOnlineUserData, updateOnlineUser])

  useEffect(() => {
    if (
      getOnlineUsersError ||
      createOnlineUserError ||
      updateOnlineUserError ||
      deleteOnlineUserError
    ) {
      setErrorMessage('線上人數功能異常，請回報技術人員')
      return
    }

    setErrorMessage('')
  }, [
    getOnlineUsersError,
    createOnlineUserError,
    updateOnlineUserError,
    deleteOnlineUserError,
  ])

  if (errorMessage) {
    return <span style={{ color: 'red' }}>{errorMessage}</span>
  }

  const users: User[] = getOnlineUsersData?.onlineUsers?.map(
    (onlineUser: OnlineUser) => {
      return onlineUser?.user
    }
  )

  const deduplcatedUsers = Array.from(
    new Map(users?.map((user) => [user.id, user])).values()
  )

  const usersJsx = deduplcatedUsers.map((user) => {
    return (
      <Avatar key={user.id} color={colors[Number(user.id) % colors.length]}>
        <span>{user.name?.[0]}</span>
        <Tooltip>
          {user.name}: {user.email}
        </Tooltip>
      </Avatar>
    )
  })

  return <Container>{usersJsx}</Container>
}
