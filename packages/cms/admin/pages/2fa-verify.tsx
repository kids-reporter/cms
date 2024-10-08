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

export default function TwoFactorAuthVerify() {
  const [token, setToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get('/api/2fa/isBypassed')
      if (response.status === 200 && response.data.status === 'success') {
        const twoFactorAuth = response.data?.data?.twoFactorAuth
        if (twoFactorAuth?.bypass) {
          setIsVerified(true)
          window.location.reload()
        } else if (twoFactorAuth && !twoFactorAuth.set) {
          // if 2FA is not set, hide verify form and redirect to 2fa-setup page
          setIsVerified(true)
          window.location.href = '/2fa-setup'
        }
      }
    }
    fetchUserInfo()
  }, [])

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
