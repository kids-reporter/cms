import React, { useState, useRef } from 'react'
import { AtomicBlockUtils, EditorState } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { TextInput, TextArea } from '@keystone-ui/fields'
import { AlignSelector } from './selector/align-selector'

enum WidthOption {
  Paragraph = 'paragraph-width',
  Image = 'image-width',
}

const options = [
  { value: WidthOption.Paragraph, label: '與文章段落等寬' },
  { value: WidthOption.Image, label: '寬版(與圖片預設等寬)' },
]

export type EmbeddedCodeInputValue = {
  caption?: string
  embeddedCode: string
}

export function EmbeddedCodeInput({
  isOpen,
  onConfirm,
  onCancel,
  inputValue,
}: {
  isOpen: boolean
  onConfirm: ({ caption, embeddedCode }: EmbeddedCodeInputValue) => void
  onCancel: () => void
  inputValue: EmbeddedCodeInputValue
}) {
  const [inputValueState, setInputValue] = useState(inputValue)
  const [align, setAlign] = useState<WidthOption>(WidthOption.Paragraph)
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
        <div ref={contentWrapperRef}>
          <TextArea
            onChange={(e) =>
              setInputValue({
                caption: inputValueState.caption,
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
                embeddedCode: inputValueState.embeddedCode,
              })
            }
            type="text"
            placeholder="Caption"
            value={inputValueState.caption}
            style={{ marginBottom: '10px', marginTop: '30px' }}
          />
          <AlignSelector
            align={align}
            options={options}
            onChange={(align: string) => {
              setAlign(align as WidthOption)
            }}
            onOpen={onAlignSelectOpen}
          />
        </div>
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
