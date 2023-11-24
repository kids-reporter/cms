import React, { useState } from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldLabel, FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/virtual/views'
import { TextArea } from '@keystone-ui/fields'

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
      <TextArea readOnly value={value} />
      <Button onClick={copyToClipboard}>{buttonText}</Button>
    </FieldContainer>
  )
}
