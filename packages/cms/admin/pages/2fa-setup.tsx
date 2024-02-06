/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag */
import { useEffect } from 'react'
import { useState, FormEvent } from 'react'
import Image from 'next/image'

import { jsx, H1, Stack } from '@keystone-ui/core'
import { Button } from '@keystone-ui/button'
import { TextInput } from '@keystone-ui/fields'
import { Notice } from '@keystone-ui/notice'
import { useQuery, useMutation, gql } from '@keystone-6/core/admin-ui/apollo'

import { ChangeUserButton } from '../components/change-user-button'
import { SinglePageContainer } from '../components/single-page-container'

import axios from 'axios'

const GET_USER_2FA_SECRET = gql`
  query GetUser2FASecret {
    authenticatedItem {
      ... on User {
        id
        twoFactorAuthSecret
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

export default function TwoFactorAuthCreate() {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [tokenClear, setTokenClear] = useState('')
  const [tokenSetup, setTokenSetup] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [pageStep, setPageStep] = useState(1)
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const {
    data: queryData,
    loading: queryLoading,
    error,
  } = useQuery(GET_USER_2FA_SECRET)
  const userId = queryData?.authenticatedItem?.id
  const twoFactorAuthSecret = queryData?.authenticatedItem?.twoFactorAuthSecret

  const getQrCodeUrl = async () => {
    try {
      const response = await axios.get('/api/2fa/setup')
      setQrCodeUrl(response.data.qrcode)
    } catch (error) {
      console.error('Failed to fetch QR code URL:', error)
    }
  }

  useEffect(() => {
    if (twoFactorAuthSecret) {
      setPageStep(1)
    } else {
      getQrCodeUrl()
      setPageStep(2)
    }
  }, [twoFactorAuthSecret])

  if (queryLoading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const clearSecret = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/2fa/check', { token: tokenClear })
      if (response.status === 200) {
        if (response.data.success) {
          setErrorMessage('')
          await updateUser({
            variables: {
              where: {
                id: userId,
              },
              data: {
                twoFactorAuthSecret: '',
                twoFactorAuthVerified: null,
              },
            },
          })
          getQrCodeUrl()
          setPageStep(2)
        } else {
          setErrorMessage(`2FA verification failed.  Invalid token.`)
        }
      } else {
        setErrorMessage(
          `2FA verification failed. Error: ${response.data.error}`
        )
      }
    } catch (error) {
      console.error('2FA verification failed:', error)
      setErrorMessage(`2FA verification failed. Error: ${error}`)
    }
  }

  const setSecret = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/2fa/setup', { token: tokenSetup })
      if (response.status === 200) {
        setErrorMessage('')
        setPageStep(3)
      } else {
        setErrorMessage(`Failed to setup 2FA. Error: ${response.data.error}`)
      }
    } catch (error) {
      console.error('Failed to setup 2FA:', error)
      setErrorMessage(`Failed to setup 2FA. Error: ${error}`)
    }
  }

  return (
    <SinglePageContainer>
      {pageStep === 1 && (
        // Clear: inprogress
        <Stack gap="xlarge" as="form" onSubmit={clearSecret}>
          <H1>Confirm 2FA</H1>
          {errorMessage && (
            <Notice title="Error" tone="negative">
              {errorMessage}
            </Notice>
          )}
          <Stack gap="medium">
            <TextInput
              placeholder="Enter the 6-digit token from your authenticator app"
              value={tokenClear}
              onChange={(event) => setTokenClear(event.target.value)}
            />
            <Stack gap="medium" across>
              <Button weight="bold" tone="active" type="submit">
                Verify
              </Button>
              <ChangeUserButton />
            </Stack>
          </Stack>
        </Stack>
      )}

      {pageStep === 2 && (
        // Setup: inprogress
        <Stack gap="xlarge" as="form" onSubmit={setSecret}>
          <H1>2FA Setup</H1>
          {errorMessage && (
            <Notice title="Error" tone="negative">
              {errorMessage}
            </Notice>
          )}
          <Stack gap="medium">
            {qrCodeUrl && (
              <Image src={qrCodeUrl} alt="QR Code" width={300} height={300} />
            )}
            <TextInput
              placeholder="Enter the 6-digit token from your authenticator app"
              value={tokenSetup}
              onChange={(event) => setTokenSetup(event.target.value)}
            />
            <Stack gap="medium" across>
              <Button weight="bold" tone="active" type="submit">
                Setup
              </Button>
              <ChangeUserButton />
            </Stack>
          </Stack>
        </Stack>
      )}

      {pageStep === 3 && (
        // Setup: complete
        <Stack gap="xlarge" as="form">
          <H1>2FA Setup Completed</H1>
          {errorMessage && (
            <Notice title="Error" tone="negative">
              {errorMessage}
            </Notice>
          )}
          <Stack gap="medium">
            <Notice title="Success" tone="positive">
              2FA has been setup successfully.
            </Notice>
            <Stack gap="medium" across>
              <a href="/">
                <Button weight="bold" tone="passive">
                  Finish
                </Button>
              </a>
            </Stack>
          </Stack>
        </Stack>
      )}
    </SinglePageContainer>
  )
}
