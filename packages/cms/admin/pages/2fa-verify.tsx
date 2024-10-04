/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag */
import { useEffect, useState, FormEvent } from 'react'

import { jsx, H1, Stack } from '@keystone-ui/core'
import { Button } from '@keystone-ui/button'
import { TextInput } from '@keystone-ui/fields'
import { Notice } from '@keystone-ui/notice'

import { ChangeUserButton } from '../components/change-user-button'
import { SinglePageContainer } from '../components/single-page-container'

import axios from 'axios'
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

export default function TwoFactorAuthVerify() {
  const [token, setToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const { data: queryData, loading: queryLoading, error } = useQuery(GET_USER)

  useEffect(() => {
    console.log(
      '==========',
      queryLoading,
      queryData,
      queryData?.authenticatedItem?.twoFactorAuth?.bypass
    )
    if (!queryLoading && queryData) {
      const currentUser = queryData?.authenticatedItem
      if (currentUser && currentUser.twoFactorAuth.bypass) {
        // if 2FA has bypass flag, hide verify form and handle redirect from backend
        setIsVerified(true)
        console.log('==========bypass, call window.location.reload()')
        //window.location.reload()
      } else if (currentUser && !currentUser.twoFactorAuth.set) {
        // if 2FA is not set, hide verify form and redirect to 2fa-setup page
        setIsVerified(true)
        window.location.href = '/2fa-setup'
      }
    }
  }, [queryLoading, queryData])

  if (queryLoading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/2fa/check', { token })
      if (response.status === 200) {
        if (response.data.status === 'success') {
          setErrorMessage('')
          setIsVerified(true)
          window.location.reload()
        } else {
          setErrorMessage(`2FA verification failed.  Invalid token.`)
        }
      } else {
        setErrorMessage(
          `2FA verification failed. Error: ${response.data.message}`
        )
      }
    } catch (error) {
      console.error('2FA verification failed:', error)
      setErrorMessage(`2FA verification failed. Error: ${error}`)
    }
  }

  return (
    <SinglePageContainer>
      <Stack gap="xlarge" as="form" onSubmit={onSubmit}>
        <H1>2 Factor Authentication</H1>
        {errorMessage && (
          <Notice title="Error" tone="negative">
            {errorMessage}
          </Notice>
        )}
        {!isVerified && (
          <Stack gap="medium">
            <TextInput
              placeholder="Enter the 6-digit token from your authenticator app"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              disabled={isVerified}
              autoFocus
            />
            <Stack gap="medium" across>
              <Button
                weight="bold"
                tone="active"
                type="submit"
                disabled={isVerified}
              >
                Verify
              </Button>
              <ChangeUserButton />
            </Stack>
          </Stack>
        )}
        {isVerified && (
          <Stack gap="medium">
            <Notice title="Success" tone="positive">
              2FA verified.
            </Notice>
          </Stack>
        )}
      </Stack>
    </SinglePageContainer>
  )
}
