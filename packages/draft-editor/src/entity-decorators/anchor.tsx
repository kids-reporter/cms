import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ContentState } from 'draft-js'
import { AlertDialog } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'
import { findEntitiesByType } from '@kids-reporter/draft-renderer'

const AnchorWrapper = styled.span`
  display: inline;
  color: #8e8e8e;
  &::before {
    content: '[';
  }
  &::after {
    content: ']';
  }
`

const AnchorEditButton = styled.div<{ anchorLabel: string }>`
  display: inline;
  cursor: pointer;
  &::before {
    content: '索引:${(props) =>
      props.anchorLabel !== undefined ? `(${props.anchorLabel}) ` : ''}';
  }
`

const StyledTextInput = styled(TextInput)`
  margin: 10px;
`

const AnchorLabelEditor = (props: {
  isOpen: boolean
  anchorLabelValue: string
  onConfirm: (anchorLabel: string) => void
  onCancel: () => void
}) => {
  const { isOpen, anchorLabelValue, onConfirm, onCancel } = props
  const [anchorLabel, setTOCLabel] = useState(anchorLabelValue)

  return (
    <AlertDialog
      title="編輯索引顯示文字"
      isOpen={isOpen}
      actions={{
        cancel: {
          label: 'Cancel',
          action: () => onCancel(),
        },
        confirm: {
          label: 'Confirm',
          action: () => onConfirm(anchorLabel),
        },
      }}
    >
      <StyledTextInput
        placeholder="索引在目錄內顯示文字"
        type="text"
        value={anchorLabel}
        onChange={(e) => setTOCLabel(e.target.value)}
      />
    </AlertDialog>
  )
}

const EditableAnchor = (props: {
  onEditStart: () => void
  onEditFinish: (arg0?: { entityKey?: string; entityData?: object }) => void
  decoratedText: string
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
}) => {
  const { children, contentState, entityKey } = props
  const tocContent = props.decoratedText
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [anchorLabel, setTOCLabel] = useState(
    contentState?.getEntity(entityKey)?.getData()?.anchorLabel
  )

  useEffect(() => {
    setTOCLabel(contentState.getEntity(entityKey).getData()?.anchorLabel)
  })

  const onTOCLabelChange = (labelValue: string) => {
    setIsModalOpen(false)
    setTOCLabel(labelValue)
    props.onEditFinish({
      entityKey,
      entityData: {
        anchorKey: contentState?.getEntity(entityKey)?.getData()?.anchorKey,
        anchorLabel: labelValue,
      },
    })
  }

  return (
    <React.Fragment>
      {isModalOpen && (
        <AnchorLabelEditor
          isOpen={isModalOpen}
          anchorLabelValue={anchorLabel}
          onConfirm={onTOCLabelChange}
          onCancel={() => {
            setIsModalOpen(false)
            props.onEditFinish()
          }}
        />
      )}
      <AnchorWrapper>
        <AnchorEditButton
          anchorLabel={anchorLabel !== tocContent ? anchorLabel : undefined}
          onClick={(e) => {
            e.preventDefault()
            setIsModalOpen(true)
            props.onEditStart()
          }}
        >
          <i className="fas fa-pen"></i>
        </AnchorEditButton>
        <span>{children}</span>
      </AnchorWrapper>
    </React.Fragment>
  )
}

export const editableAnchorDecorator = {
  strategy: findEntitiesByType('TOC_ANCHOR'),
  component: EditableAnchor,
}
