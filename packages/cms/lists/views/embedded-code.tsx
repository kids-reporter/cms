import React, { useState } from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldLabel, FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/json/views'

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const DEFAULT_BUTTON_TEXT = 'Copy to Clipboard'
  const COPIED_BUTTON_TEXT = 'Copied!'

  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value)
    setButtonText(COPIED_BUTTON_TEXT)
    setTimeout(() => setButtonText(DEFAULT_BUTTON_TEXT), 2000)
  }

  return (
    <FieldContainer>
      <FieldLabel>Embedded Code</FieldLabel>
      <textarea
        readOnly
        value={value}
        style={{
          resize: 'vertical',
          width: '100%',
          minHeight: '80px',
          maxHeight: '160px',
          padding: '20px 30px',
          borderRadius: '6px',
          backgroundColor: '#fafbfc',
        }}
      />
      <br />
      <Button onClick={copyToClipboard}>{buttonText}</Button>
    </FieldContainer>
  )
}
