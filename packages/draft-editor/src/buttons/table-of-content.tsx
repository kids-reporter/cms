import React, { useState } from 'react'
import { AtomicBlockUtils, EditorState, RawDraftContentState } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'

export function TOCInput(props: {
  isOpen: boolean
  onConfirm: (arg0: { tocLabel: string; tocContent: string }) => void
  onCancel: () => void
}) {
  const { isOpen, onConfirm, onCancel } = props

  const [tocLabel, setTOCLabel] = useState('')
  const [tocContent, setTOCContent] = useState('')

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
            action: () => {
              onConfirm({
                tocLabel: tocLabel,
                tocContent: tocContent,
              })
            },
          },
        }}
      >
        <TextInput
          placeholder="文章內顯示文字"
          value={tocLabel}
          onChange={(e) => {
            setTOCLabel(e.target.value)
          }}
          type="text"
          style={{ marginBottom: '10px', marginTop: '10px' }}
        />
        <TextInput
          placeholder="目錄內顯示文字"
          value={tocContent}
          onChange={(e) => {
            setTOCContent(e.target.value)
          }}
          type="text"
          style={{ marginBottom: '10px', marginTop: '10px' }}
        />
      </Drawer>
    </DrawerController>
  )
}

type InfoBoxButtonProps = {
  className?: string
  editorState: EditorState
  onChange: (param: EditorState) => void
}

export function createTOCButton() {
  return function TOCButton(props: InfoBoxButtonProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const { className, editorState, onChange: onEditorStateChange } = props

    const onChange = ({
      type,
      rawContentState,
    }: {
      type: InfoBoxTypeEnum
      rawContentState: RawDraftContentState
    }) => {
      const contentState = editorState.getCurrentContent()

      // create an TOC entity
      const contentStateWithEntity = contentState.createEntity(
        'TOC',
        'IMMUTABLE',
        {
          type,
          rawContentState,
        }
      )
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      })

      //The third parameter here is a space string, not an empty string
      //If you set an empty string, you will get an error: Unknown DraftEntity key: null
      onEditorStateChange(
        AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
      )
      setIsDrawerOpen(false)
    }

    return (
      <React.Fragment>
        {isDrawerOpen && (
          <TOCInput
            onConfirm={onChange}
            onCancel={() => {
              setIsDrawerOpen(false)
            }}
            isOpen={isDrawerOpen}
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
