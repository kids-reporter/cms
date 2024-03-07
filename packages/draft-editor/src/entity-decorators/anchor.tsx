import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ContentState } from 'draft-js'
import { AlertDialog } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'
import { ENTITY, findEntitiesByType } from '@kids-reporter/draft-renderer'

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
    content: '錨點:${(props) =>
      props.anchorLabel !== undefined ? `(${props.anchorLabel}) ` : ''}';
  }
`

const Warning = styled.p`
  color: red;
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
  const [anchorLabel, setAnchorLabel] = useState(anchorLabelValue)
  const [msg, setMsg] = useState('')

  // Restrict id format
  // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
  const isValidID = (id: string) => {
    const idRex = /^[A-Za-z][\w-]*$/
    return idRex.test(id)
  }

  return (
    <AlertDialog
      title="編輯錨點文字(ID)"
      isOpen={isOpen}
      actions={{
        cancel: {
          label: 'Cancel',
          action: () => onCancel(),
        },
        confirm: {
          label: 'Confirm',
          action: () => {
            if (isValidID(anchorLabel)) {
              onConfirm(anchorLabel)
            } else {
              setMsg('ID格式錯誤！')
            }
          },
        },
      }}
    >
      <Warning>
        注意！同篇文章ID不可重複！ID需使用半型英文字母(大/小寫)開頭，接續
        英文字母/數字/-/_
      </Warning>
      <p>範例: part1, Section-234, table_5</p>
      <StyledTextInput
        placeholder="錨點文字(ID)"
        type="text"
        value={anchorLabel}
        onChange={(e) => setAnchorLabel(e.target.value)}
      />
      {msg && <Warning>{msg}</Warning>}
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
  const [anchorID, setAnchorID] = useState(
    contentState?.getEntity(entityKey)?.getData()?.anchorID
  )

  useEffect(() => {
    setAnchorID(contentState.getEntity(entityKey).getData()?.anchorID)
  })

  const onAnchorIDChange = (anchorID: string) => {
    setIsModalOpen(false)
    setAnchorID(anchorID)
    props.onEditFinish({
      entityKey,
      entityData: {
        anchorID: anchorID,
      },
    })
  }

  return (
    <React.Fragment>
      {isModalOpen && (
        <AnchorLabelEditor
          isOpen={isModalOpen}
          anchorLabelValue={anchorID}
          onConfirm={onAnchorIDChange}
          onCancel={() => {
            setIsModalOpen(false)
            props.onEditFinish()
          }}
        />
      )}
      <AnchorWrapper>
        <AnchorEditButton
          anchorLabel={anchorID !== tocContent ? anchorID : undefined}
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
  strategy: findEntitiesByType(ENTITY.Anchor),
  component: EditableAnchor,
}
