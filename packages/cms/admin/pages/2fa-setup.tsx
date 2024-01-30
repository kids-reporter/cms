/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag */
import { useEffect } from 'react'
import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { jsx, H1, Stack } from '@keystone-ui/core'
import { Button } from '@keystone-ui/button'
import { TextInput } from '@keystone-ui/fields'
import { Notice } from '@keystone-ui/notice'

import { ChangeUserButton } from '../components/change-user-button'
import { SinglePageContainer } from '../components/single-page-container'

import axios from 'axios'

export default function TwoFactorAuthCreate() {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [token, setToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/2fa/setup', { token })
      if (response.status === 200) {
        setErrorMessage('')
        setIsSetupComplete(true)
      } else {
        setErrorMessage(`Failed to setup 2FA. Error: ${response.data.error}`)
      }
    } catch (error) {
      console.error('Failed to setup 2FA:', error)
      setErrorMessage(`Failed to setup 2FA. Error: ${error}`)
    }
  }

  useEffect(() => {
    const getQrCodeUrl = async () => {
      try {
        const response = await axios.get('/api/2fa/setup')
        setQrCodeUrl(response.data.qrcode)
      } catch (error) {
        console.error('Failed to fetch QR code URL:', error)
      }
    }

    getQrCodeUrl()
  }, [])

  return (
    <SinglePageContainer>
      <Stack gap="xlarge" as="form" onSubmit={onSubmit}>
        <H1>2FA Setup{isSetupComplete && ' Completed'}</H1>
        {errorMessage && (
          <Notice title="Error" tone="negative">
            {errorMessage}
          </Notice>
        )}
        {!isSetupComplete && (
          <Stack gap="medium">
            {qrCodeUrl && (
              <Image src={qrCodeUrl} alt="QR Code" width={300} height={300} />
            )}
            <TextInput
              placeholder="Enter the 6-digit token from your authenticator app"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              disabled={isSetupComplete}
            />
            <Stack gap="medium" across>
              <Button
                weight="bold"
                tone="active"
                type="submit"
                disabled={isSetupComplete}
              >
                Setup
              </Button>
              <ChangeUserButton />
            </Stack>
          </Stack>
        )}
        {isSetupComplete && (
          <Stack gap="medium">
            <Notice title="Success" tone="positive">
              2FA has been setup successfully.
            </Notice>
            <Stack gap="medium" across>
              <Link href="/">
                <Button weight="bold" tone="passive">
                  Finish
                </Button>
              </Link>
            </Stack>
          </Stack>
        )}
      </Stack>
    </SinglePageContainer>
  )
}
