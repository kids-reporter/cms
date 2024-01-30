import React from 'react'
import { AtomicBlockProps } from '../block-renderer-fn.type'

export const EditableTOC = (
  props: AtomicBlockProps<{ tocLabel: string; tocContent: string }>
) => {
  console.log(props)
  return (
    <React.Fragment>
      <div>{'[目錄]'}</div>
    </React.Fragment>
  )
}
