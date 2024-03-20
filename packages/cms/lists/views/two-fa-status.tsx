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
      twoFactorAuthBypass
    }
  }
`

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const { data: queryData } = useQuery(GET_CURRENT_USER)
  const currentUser = queryData?.authenticatedItem
  const [updateUserSecret, { loading: loadingSecret }] =
    useMutation(UPDATE_USER_MUTATION)
  const [updateUserBypass, { loading: loadingBypass }] =
    useMutation(UPDATE_USER_MUTATION)

  const clearSecret = async () => {
    if (
      value &&
      value['id'] &&
      window.confirm('確定要清除這個使用者的 2FA 設定？')
    ) {
      try {
        await updateUserSecret({
          variables: {
            where: {
              id: value['id'],
            },
            data: {
              twoFactorAuthSecret: '',
            },
          },
        })
        window.location.reload()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const toggleBypass = async () => {
    if (
      value &&
      value['id'] &&
      window.confirm('確定要切換這個使用者的 2FA Bypass 設定？')
    ) {
      try {
        await updateUserBypass({
          variables: {
            where: {
              id: value['id'],
            },
            data: {
              twoFactorAuthBypass: !currentUser?.twoFactorAuth.bypass,
            },
          },
        })
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
    const isAdmin =
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
          {isAdmin && (
            <Button
              tone="warning"
              weight="none"
              onClick={toggleBypass}
              disabled={loadingBypass}
              style={{ marginLeft: '10px' }}
            >
              切換 Bypass
            </Button>
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
        {isAdmin && (
          <Button
            tone="negative"
            weight="none"
            onClick={clearSecret}
            disabled={loadingSecret}
            style={{ marginLeft: '10px' }}
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
