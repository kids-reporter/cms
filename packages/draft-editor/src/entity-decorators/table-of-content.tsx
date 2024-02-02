import React, { useState } from 'react'
import styled from 'styled-components'
import { ContentBlock, ContentState } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'

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

export function TOCLabelEditor(props: {
  isOpen: boolean
  tocLabelValue: string
  onConfirm: (tocLabel: string) => void
  onCancel: () => void
}) {
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
  decoratedText: string
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
}) => {
  console.log(props)
  const { children, contentState, entityKey } = props
  const tocContent = props.decoratedText
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { tocLabel } = contentState.getEntity(entityKey).getData()

  const onTOCLabelChange = (value: string) => {
    contentState.replaceEntityData(entityKey, {
      tocLabel: value,
    })
  }

  return (
    <React.Fragment>
      <TOCLabelEditor
        isOpen={isDrawerOpen}
        tocLabelValue={tocLabel}
        onConfirm={onTOCLabelChange}
        onCancel={() => {
          setIsDrawerOpen(false)
        }}
      />
      <TOCWrapper>
        <TOCEditButton
          tocLabel={tocLabel !== tocContent ? tocLabel : ''}
          onClick={(e) => {
            e.preventDefault()
            setIsDrawerOpen(true)
          }}
        />
        <span>{children}</span>
      </TOCWrapper>
    </React.Fragment>
  )
}

const findTOCEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'TOC'
    )
  }, callback)
}

export const TOCDecorator = {
  strategy: findTOCEntities,
  component: EditModeTOC,
}
