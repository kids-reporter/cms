import React from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { FieldLabel, FieldContainer } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

export const Field = ({ value }: FieldProps<typeof controller>) => {
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).map(([k, v]) => {
      if (k === '__typename') {
        return null
      }

      return (
        <FieldContainer key={k}>
          <FieldLabel>{k.toUpperCase()}</FieldLabel>
          <a
            href={v}
            target="_blank"
            style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            {v}
          </a>
        </FieldContainer>
      )
    })
  }
}
