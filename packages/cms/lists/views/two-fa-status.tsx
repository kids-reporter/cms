import React from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldLabel, FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/virtual/views'
import { useQuery, useMutation, gql } from '@keystone-6/core/admin-ui/apollo'
import { RoleEnum } from '../utils/access-control-list'

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    authenticatedItem {
      ... on User {
        id
        role
        twoFactorAuth
      }
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      twoFactorAuthSecret
      twoFactorAuthVerified
    }
  }
`

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const { data: queryData } = useQuery(GET_CURRENT_USER)
  const currentUser = queryData?.authenticatedItem
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION)

  const clearSecret = async () => {
    if (
      value &&
      value['id'] &&
      window.confirm('確定要清除這個使用者的 2FA 設定？')
    ) {
      try {
        await updateUser({
          variables: {
            where: {
              id: value['id'],
            },
            data: {
              twoFactorAuthSecret: '',
              twoFactorAuthVerified: null,
            },
          },
        })
        alert('2FA 設定已清除')
        window.location.reload()
      } catch (err) {
        console.error(err)
      }
    }
  }

  if (typeof value === 'object' && value !== null) {
    const bypass = value['bypass']
    const set = value['set']
    const id = value['id']
    const canReset =
      (currentUser?.role === RoleEnum.Owner ||
        currentUser?.role === RoleEnum.Admin) &&
      set

    return (
      <FieldContainer>
        <FieldLabel>二階段驗證</FieldLabel>

        <p>
          目前狀態:{' '}
          <b style={{ color: set ? 'green' : 'red' }}>
            {set ? '已設定' : '未設定'}
          </b>
          {bypass && (
            <span style={{ color: 'lightgrey' }}> (此帳號不需二階段驗證)</span>
          )}
        </p>
        {id === currentUser?.id && (
          <a
            href="/2fa-setup"
            target="_self"
            style={{ textDecoration: 'none' }}
          >
            <Button>設定</Button>
          </a>
        )}
        {canReset && (
          <Button
            tone="negative"
            weight="none"
            onClick={clearSecret}
            disabled={loading}
          >
            清除 2FA
          </Button>
        )}
      </FieldContainer>
    )
  } else {
    return null
  }
}
