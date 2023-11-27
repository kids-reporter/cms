import React from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldLabel, FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

export const Field = ({ value }: FieldProps<typeof controller>) => {
  let href = ''
  let label = ''
  let buttonLabel = 'Preview'
  if (typeof value === 'object' && value !== null) {
    href = value['href']
    label = value['label']
    buttonLabel = value['buttonLabel']
  }
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <a href={href} target="_blank" style={{ textDecoration: 'none' }}>
        <Button>{buttonLabel}</Button>
      </a>
    </FieldContainer>
  )
}
