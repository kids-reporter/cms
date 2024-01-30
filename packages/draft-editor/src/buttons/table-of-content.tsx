import React, { useState } from 'react'
import styled from 'styled-components'
import { AtomicBlockUtils, EditorState } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Label = styled.span`
  text-wrap: nowrap;
`

const StyledTextInput = styled(TextInput)`
  margin: 10px;
`

export function TOCInput(props: {
  isOpen: boolean
  tocLabelValue: string
  tocContentValue: string
  onConfirm: (tocLabel: string, tocContent: string) => void
  onCancel: () => void
}) {
  const { isOpen, tocLabelValue, tocContentValue, onConfirm, onCancel } = props

  const [tocLabel, setTOCLabel] = useState(tocLabelValue)
  const [tocContent, setTOCContent] = useState(tocContentValue)

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
            action: () => onConfirm(tocLabel, tocContent),
          },
        }}
      >
        <TextInputContainer>
          <Label>文章</Label>
          <StyledTextInput
            placeholder="文章內顯示文字"
            value={tocContent}
            onChange={(e) => {
              setTOCContent(e.target.value)
            }}
            type="text"
          />
        </TextInputContainer>
        <TextInputContainer>
          <Label>目錄</Label>
          <StyledTextInput
            placeholder="目錄內顯示文字"
            value={tocLabel}
            onChange={(e) => {
              setTOCLabel(e.target.value)
            }}
            type="text"
          />
          <Button size="small" onClick={() => setTOCLabel(tocContent)}>
            同上
          </Button>
        </TextInputContainer>
      </Drawer>
    </DrawerController>
  )
}

type TOCButtonProps = {
  className?: string
  editorState: EditorState
  onChange: (param: EditorState) => void
}

export function createTOCButton() {
  return function TOCButton(props: TOCButtonProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const { className, editorState, onChange } = props

    const onTOCChange = (tocLabel: string, tocContent: string) => {
      const contentState = editorState.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity(
        'TOC',
        'IMMUTABLE',
        {
          tocLabel: tocLabel,
          tocContent: tocContent,
        }
      )
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      })

      // The third parameter here is a space string, not an empty string
      // If you set an empty string, you will get an error: Unknown DraftEntity key: null
      onChange(
        AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
      )
      setIsDrawerOpen(false)
    }

    return (
      <React.Fragment>
        {isDrawerOpen && (
          <TOCInput
            onConfirm={onTOCChange}
            onCancel={() => {
              setIsDrawerOpen(false)
            }}
            isOpen={isDrawerOpen}
            tocLabelValue={''}
            tocContentValue={''}
          />
        )}
        <div
          className={className}
          onClick={() => {
            setIsDrawerOpen(true)
          }}
        >
          <i className="far"></i>
          <span>目</span>
        </div>
      </React.Fragment>
    )
  }
}
