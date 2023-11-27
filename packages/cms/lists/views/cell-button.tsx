import { CellLink } from '@keystone-6/core/admin-ui/components'
import { CellComponent } from '@keystone-6/core/types'
import React from 'react'

export const Cell: CellComponent = ({ item }) => {
  const value = item.listPreview
  return (
    <CellLink href={value} target="_blank">
      Preview
    </CellLink>
  )
}
Cell.supportsLinkTo = true
