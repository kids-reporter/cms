import React, { useState } from 'react'
import styled from 'styled-components'
import { AtomicBlockProps } from '../block-renderer-fn.type'
import { TOCInput } from '../buttons/table-of-content'
import { EditButton, EditableBlock as _EditableBlock } from './styled'

const StyledTOC = styled.div``

const EditableBlock = styled(_EditableBlock)`
  &:hover {
    ${StyledTOC} {
      background-color: #f0f0f0;
      opacity: 0.3;
    }
`

export const EditableTOC = (
  props: AtomicBlockProps<{ tocLabel: string; tocContent: string }>
) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { block, blockProps, contentState } = props
  const { onEditStart, onEditFinish } = blockProps
  const entityKey = block.getEntityAt(0)
  const entity = contentState.getEntity(entityKey)
  const tocData = entity.getData()

  const onTOCChange = (tocLabel: string, tocContent: string) => {
    setIsDrawerOpen(false)

    onEditFinish({
      entityKey,
      entityData: { tocLabel, tocContent },
    })
  }

  return (
    <React.Fragment>
      <TOCInput
        onConfirm={onTOCChange}
        onCancel={() => {
          setIsDrawerOpen(false)
        }}
        isOpen={isDrawerOpen}
        tocLabelValue={tocData?.tocLabel}
        tocContentValue={tocData?.tocContent}
      />
      <EditableBlock>
        <StyledTOC>{`目錄:[${tocData?.tocLabel}] ${tocData?.tocContent}`}</StyledTOC>
        <EditButton
          onClick={() => {
            onEditStart()
            setIsDrawerOpen(true)
          }}
        >
          <i className="fa-solid fa-pen"></i>
          <span>Modify</span>
        </EditButton>
      </EditableBlock>
    </React.Fragment>
  )
}
