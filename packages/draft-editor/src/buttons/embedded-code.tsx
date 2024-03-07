import React, { useState, useRef } from 'react'
import { AtomicBlockUtils, EditorState } from 'draft-js'
import styled from 'styled-components'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput, TextArea } from '@keystone-ui/fields'
import { AlignSelector } from './selector/align-selector'

enum AlignOption {
  Paragraph = 'paragraph-width',
  Image = 'image-width',
}

const options = [
  { value: AlignOption.Paragraph, label: '與文章段落等寬' },
  { value: AlignOption.Image, label: '寬版(與圖片預設等寬)' },
]

const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

export type EmbeddedCodeInputValue = {
  caption?: string
  align?: AlignOption
  embeddedCode: string
}

export function EmbeddedCodeInput({
  isOpen,
  onConfirm,
  onCancel,
  inputValue,
}: {
  isOpen: boolean
  onConfirm: ({ caption, align, embeddedCode }: EmbeddedCodeInputValue) => void
  onCancel: () => void
  inputValue: EmbeddedCodeInputValue
}) {
  const [inputValueState, setInputValue] = useState(inputValue)
  const contentWrapperRef = useRef<HTMLDivElement>(null)

  const confirmInput = () => {
    onConfirm(inputValueState)
  }

  const onAlignSelectOpen = () => {
    const scrollWrapper = contentWrapperRef.current?.parentElement
    if (scrollWrapper) {
      scrollWrapper.scrollTop = scrollWrapper?.scrollHeight
    }
  }

  return (
    <DrawerController isOpen={isOpen}>
      <Drawer
        title="鑲嵌程式碼（Embedded Code）"
        //isOpen={toShowInput}
        actions={{
          cancel: {
            label: 'Cancel',
            action: onCancel,
          },
          confirm: {
            label: 'Confirm',
            action: confirmInput,
          },
        }}
      >
        <Container ref={contentWrapperRef}>
          <TextArea
            onChange={(e) =>
              setInputValue({
                caption: inputValueState.caption,
                align: inputValueState.align,
                embeddedCode: e.target.value,
              })
            }
            placeholder="Embedded Code"
            type="text"
            value={inputValueState.embeddedCode}
            style={{ marginBottom: '30px' }}
          />
          <TextInput
            onChange={(e) =>
              setInputValue({
                caption: e.target.value,
                align: inputValueState.align,
                embeddedCode: inputValueState.embeddedCode,
              })
            }
            type="text"
            placeholder="Caption"
            value={inputValueState.caption}
            style={{ marginBottom: '10px', marginTop: '30px' }}
          />
          <AlignSelector
            align={inputValueState.align as AlignOption}
            options={options}
            onChange={(align: string) => {
              setInputValue({
                caption: inputValueState.caption,
                align: align as AlignOption,
                embeddedCode: inputValueState.embeddedCode,
              })
            }}
            onOpen={onAlignSelectOpen}
          />
        </Container>
      </Drawer>
    </DrawerController>
  )
}

type EmbeddedCodeButtonProps = {
  className?: string
  editorState: EditorState
  onChange: (editorState: EditorState) => void
}

export function EmbeddedCodeButton(props: EmbeddedCodeButtonProps) {
  const { editorState, onChange, className } = props

  const [isInputOpen, setIsInputOpen] = useState(false)

  const promptForInput = () => {
    setIsInputOpen(true)
  }

  const onInputChange = (inputValue: EmbeddedCodeInputValue) => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'EMBEDDEDCODE',
      'IMMUTABLE',
      inputValue
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    // The third parameter here is a space string, not an empty string
    // If you set an empty string, you will get an error: Unknown DraftEntity key: null
    onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))

    setIsInputOpen(false)
  }

  const onInputCancel = () => {
    setIsInputOpen(false)
  }

  return (
    <React.Fragment>
      {isInputOpen && (
        <EmbeddedCodeInput
          isOpen={isInputOpen}
          onConfirm={onInputChange}
          onCancel={onInputCancel}
          inputValue={{
            caption: '',
            embeddedCode: '',
          }}
        />
      )}
      <div
        onClick={() => {
          promptForInput()
        }}
        className={className}
      >
        <i className="far"></i>
        <span>Embed</span>
      </div>
    </React.Fragment>
  )
}
