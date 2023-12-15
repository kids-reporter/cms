import React, { useState } from 'react'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/json/views'

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [relationships, setRelationships] = useState<any[]>(
    value ? JSON.parse(value) : []
  )

  console.log(onChange, setRelationships)

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {relationships}
    </FieldContainer>
  )
}
