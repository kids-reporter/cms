import React from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldLabel, FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/virtual/views'
import { useQuery, gql } from '@keystone-6/core/admin-ui/apollo'

const GET_USER = gql`
  query GetCurrentUser {
    authenticatedItem {
      ... on User {
        id
        twoFactorAuth
      }
    }
  }
`

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const { data: queryData } = useQuery(GET_USER)
  const currentUser = queryData?.authenticatedItem

  if (typeof value === 'object' && value !== null) {
    const bypass = value['bypass']
    const set = value['set']
    const id = value['id']

    return (
      <FieldContainer>
        <FieldLabel>
          二階段驗證{' '}
          {bypass && (
            <span style={{ color: 'lightgrey' }}>(此帳號不需二階段驗證)</span>
          )}
        </FieldLabel>

        <p>
          目前狀態:{' '}
          <b style={{ color: set ? 'green' : 'red' }}>
            {set ? '已設定' : '未設定'}
          </b>
        </p>
        {id === currentUser.id && (
          <a
            href="/2fa-setup"
            target="_self"
            style={{ textDecoration: 'none' }}
          >
            <Button>設定</Button>
          </a>
        )}
      </FieldContainer>
    )
  } else {
    return null
  }
}
