import React from 'react'
import { AtomicBlockProps } from '../block-renderer-fn.type'

export const TableOfContent = (props: AtomicBlockProps<string> | undefined) => {
  console.log(props)
  return (
    <React.Fragment>
      <div>{'[索引]'}</div>
    </React.Fragment>
  )
}
