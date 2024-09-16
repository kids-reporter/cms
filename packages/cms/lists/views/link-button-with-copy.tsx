import React from 'react'
import copyToClipboard from 'clipboard-copy'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { Tooltip } from '@keystone-ui/tooltip'
import { FieldLabel, FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/virtual/views'
import { ClipboardIcon } from '@keystone-ui/icons/icons/ClipboardIcon'

export const Field = ({ value }: FieldProps<typeof controller>) => {
  if (typeof value === 'object' && value !== null) {
    const href = value['href']
    const target = value['target'] || '_blank'
    const label = value['label']
    const buttonLabel = value['buttonLabel']

    return (
      <FieldContainer>
        <FieldLabel>{label}</FieldLabel>
        <a
          href={href}
          target={target}
          style={{ textDecoration: 'none', marginRight: '10px' }}
        >
          <Button>{buttonLabel}</Button>
        </a>
        <Tooltip content="Copy link">
          {(props) => (
            <Button
              {...props}
              aria-label="Copy link"
              onClick={() => {
                copyToClipboard(`${window.location.origin}${href}`)
              }}
            >
              <ClipboardIcon size="small" />
            </Button>
          )}
        </Tooltip>
      </FieldContainer>
    )
  } else {
    return null
  }
}
