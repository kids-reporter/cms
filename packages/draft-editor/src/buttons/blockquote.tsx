import React, { useState } from 'react'
import styled from 'styled-components'
import { AtomicBlockUtils, EditorState } from 'draft-js'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { Select } from '@keystone-ui/fields'
import { TextArea } from '@keystone-ui/fields'

const Label = styled.label`
  display: block;
  margin: 10px 0;
  font-weight: 600;
`

enum BlockquoteType {
  borderLeft = 'border_left',
  quoteLeft = 'quote_left',
}

enum BlockquoteLabel {
  borderLeft = '左邊框',
  quoteLeft = '左引號',
}

type Option = {
  label: BlockquoteLabel.borderLeft | BlockquoteLabel.quoteLeft
  value: BlockquoteType.borderLeft | BlockquoteType.quoteLeft
  isDisabled?: boolean
}

const TypeSelectBlock = styled.div`
  margin: 10px 0;
`

function TypeSelect({
  type,
  options,
  onChange,
}: {
  type: BlockquoteType.borderLeft | BlockquoteType.quoteLeft
  options: Option[]
  onChange: (arg0: BlockquoteType.borderLeft | BlockquoteType.quoteLeft) => void
}) {
  return (
    <TypeSelectBlock>
      <Label htmlFor="blockquoteType">版型</Label>
      <Select
        value={options.find((option: Option) => option.value === type) || null}
        options={options}
        onChange={(option: Option) => {
          onChange(option.value)
        }}
      />
    </TypeSelectBlock>
  )
}

export type BlockquoteInputValue = {
  type: BlockquoteType.borderLeft | BlockquoteType.quoteLeft
  text: string
}

export function BlockquoteInput({
  isOpen,
  onConfirm,
  onCancel,
  inputValue,
}: {
  isOpen: boolean
  onConfirm: ({ type, text }: BlockquoteInputValue) => void
  onCancel: () => void
  inputValue: BlockquoteInputValue
}) {
  const [inputValueState, setInputValueState] = useState(inputValue)

  const confirmInput = () => {
    onConfirm(inputValueState)
  }

  return (
    <DrawerController isOpen={isOpen}>
      <Drawer
        title={`Insert Embedded Code`}
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
        <TypeSelect
          type={inputValueState.type}
          options={[
            {
              label: BlockquoteLabel.borderLeft,
              value: BlockquoteType.borderLeft,
            },
            {
              label: BlockquoteLabel.quoteLeft,
              value: BlockquoteType.quoteLeft,
            },
          ]}
          onChange={(blockquoteType) => {
            setInputValueState({
              type: blockquoteType,
              text: inputValueState.text,
            })
          }}
        />
        <TextArea
          onChange={(e) =>
            setInputValueState({
              type: inputValueState.type,
              text: e.target.value,
            })
          }
          placeholder="引言文字"
          type="text"
          value={inputValueState.text}
          style={{ marginBottom: '30px' }}
        />
      </Drawer>
    </DrawerController>
  )
}

type BlockquoteButtonProps = {
  className?: string
  editorState: EditorState
  onChange: (editorState: EditorState) => void
}

export function BlockquoteButton(props: BlockquoteButtonProps) {
  const { editorState, onChange, className } = props

  const [isInputOpen, setIsInputOpen] = useState(false)

  const promptForInput = () => {
    setIsInputOpen(true)
  }

  const onInputChange = (inputValue: BlockquoteInputValue) => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'BLOCKQUOTE',
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
        <BlockquoteInput
          isOpen={isInputOpen}
          onConfirm={onInputChange}
          onCancel={onInputCancel}
          inputValue={{
            type: BlockquoteType.borderLeft,
            text: '',
          }}
        />
      )}
      <div
        onClick={() => {
          promptForInput()
        }}
        className={className}
      >
        <i className="fas fa-quote-left"></i>
      </div>
    </React.Fragment>
  )
}
