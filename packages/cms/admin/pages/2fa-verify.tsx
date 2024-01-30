/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag */
import { useState, FormEvent } from 'react'

import { jsx, H1, Stack } from '@keystone-ui/core'
import { Button } from '@keystone-ui/button'
import { TextInput } from '@keystone-ui/fields'
import { Notice } from '@keystone-ui/notice'

import { ChangeUserButton } from '../components/change-user-button'
import { SinglePageContainer } from '../components/single-page-container'

import axios from 'axios'

export default function TwoFactorAuthCreate() {
  const [token, setToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/2fa/check', { token })
      if (response.status === 200) {
        if (response.data.success) {
          setErrorMessage('')
          setIsVerified(true)
          //TODO: save 2FA verified status in cookie/session
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
