/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag */

import { jsx } from '@keystone-ui/core'
import { Button } from '@keystone-ui/button'
import React, { ReactNode, useEffect } from 'react'

import { useMutation, useQuery, gql } from '@keystone-6/core/admin-ui/apollo'

const GET_USER = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
      }
    }
  }
`
const END_SESSION = gql`
  mutation EndSession {
    endSession
  }
`

const ChangeUserButton = ({ children }: { children?: ReactNode }) => {
  const [endSession, { loading, data }] = useMutation(END_SESSION)
  useEffect(() => {
    if (data?.endSession) {
      window.location.reload()
    }
  }, [data])

  const { data: queryData, loading: queryLoading } = useQuery(GET_USER)

  if (queryLoading) return <p>Loading...</p>

  const user = queryData?.authenticatedItem

  return (
    <Button isLoading={loading} onClick={() => endSession()}>
      {children ||
        (user?.name ? (
          <>
            Not <b>{user.name}</b> ? Change user
          </>
        ) : (
          'Change user'
        ))}
    </Button>
  )
}
export { ChangeUserButton }
