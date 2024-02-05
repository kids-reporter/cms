import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ContentBlock, ContentState } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'
import { ANCHOR_FIELD_NAME } from '../buttons/anchor'

const TOCWrapper = styled.span`
  display: inline;
  color: #27b5f7;
  &::before {
    content: '[';
  }
  &::after {
    content: ']';
  }
`

const TOCEditButton = styled.div<{ tocLabel: string }>`
  display: inline;
  cursor: pointer;
  &::before {
    content: '目錄:${(props) =>
      props.tocLabel ? `(${props.tocLabel}) ` : ''}';
  }
`

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledTextInput = styled(TextInput)`
  margin: 10px;
`

const Label = styled.span`
  text-wrap: nowrap;
`

const findTOCEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === ANCHOR_FIELD_NAME
    )
  }, callback)
}

const TOCLabelEditor = (props: {
  isOpen: boolean
  tocLabelValue: string
  onConfirm: (tocLabel: string) => void
  onCancel: () => void
}) => {
  const { isOpen, tocLabelValue, onConfirm, onCancel } = props
  const [tocLabel, setTOCLabel] = useState(tocLabelValue)

  return (
    <DrawerController isOpen={isOpen}>
      <Drawer
        title={'目錄'}
        actions={{
          cancel: {
            label: 'Cancel',
            action: () => {
              onCancel()
            },
          },
          confirm: {
            label: 'Confirm',
            action: () => onConfirm(tocLabel),
          },
        }}
      >
        <TextInputContainer>
          <Label>目錄顯示文字</Label>
          <StyledTextInput
            placeholder="目錄內顯示文字"
            value={tocLabel}
            onChange={(e) => {
              setTOCLabel(e.target.value)
            }}
            type="text"
          />
        </TextInputContainer>
      </Drawer>
    </DrawerController>
  )
}

const EditModeTOC = (props: {
  onEditStart: () => void
  onEditFinish: (arg0?: { entityKey?: string; entityData?: object }) => void
  decoratedText: string
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
  blockKey: string
  start: number
  end: number
}) => {
  const { children, contentState, entityKey, blockKey, start, end } = props
  const tocContent = props.decoratedText
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [tocLabel, setTOCLabel] = useState(
    contentState.getEntity(entityKey).getData()?.tocLabel
  )

  useEffect(() => {
    setTOCLabel(contentState.getEntity(entityKey).getData()?.tocLabel)
  })

  const onTOCLabelChange = (labelValue: string) => {
    setIsDrawerOpen(false)
    setTOCLabel(labelValue)
    props.onEditFinish({
      entityKey,
      entityData: {
        tocID: `${blockKey}-${start}-${end}`,
        tocLabel: labelValue,
      },
    })
  }

  return (
    <React.Fragment>
      {isDrawerOpen && (
        <TOCLabelEditor
          isOpen={isDrawerOpen}
          tocLabelValue={tocLabel}
          onConfirm={onTOCLabelChange}
          onCancel={() => {
            setIsDrawerOpen(false)
            props.onEditFinish()
          }}
        />
      )}
      <TOCWrapper>
        <TOCEditButton
          tocLabel={tocLabel !== tocContent ? tocLabel : ''}
          onClick={(e) => {
            e.preventDefault()
            setIsDrawerOpen(true)
            props.onEditStart()
          }}
        >
          <i className="fas fa-pen"></i>
        </TOCEditButton>
        <span>{children}</span>
      </TOCWrapper>
    </React.Fragment>
  )
}

/*
const RenderModeTOC = (props: {
  decoratedText: string
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
  blockKey: string
  start: number
  end: number
}) => {
  const { blockKey, start, end, entityKey } = props
  const tocID = `${blockKey}-${start}-${end}`

  // TODO: render IntersetionObservable wrapper with tocID
  return (
    <React.Fragment>
    </React.Fragment>
  )
}
*/

export const TOCDecorator = {
  strategy: findTOCEntities,
  component: EditModeTOC,
}
