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

type BlockquoteButtonProps = {
  className?: string
  editorState: EditorState
  onChange: (editorState: EditorState) => void
}

export function BlockquoteButton(props: BlockquoteButtonProps) {
  const { editorState, onChange, className } = props

  const [toShowInput, setToShowInput] = useState(false)
  const [inputValue, setInputValue] = useState({
    type: BlockquoteType.borderLeft,
    text: '',
  })

  const promptForInput = () => {
    setToShowInput(true)
    setInputValue({
      type: BlockquoteType.borderLeft,
      text: '',
    })
  }

  const confirmInput = () => {
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

    setToShowInput(false)
    setInputValue({
      type: BlockquoteType.borderLeft,
      text: '',
    })
  }

  const input = (
    <DrawerController isOpen={toShowInput}>
      <Drawer
        title={`Insert Embedded Code`}
        //isOpen={toShowInput}
        actions={{
          cancel: {
            label: 'Cancel',
            action: () => {
              setToShowInput(false)
            },
          },
          confirm: {
            label: 'Confirm',
            action: confirmInput,
          },
        }}
      >
        <TypeSelect
          type={inputValue.type}
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
            setInputValue({
              type: blockquoteType,
              text: inputValue.text,
            })
          }}
        />
        <TextArea
          onChange={(e) =>
            setInputValue({
              type: inputValue.type,
              text: e.target.value,
            })
          }
          placeholder="引言文字"
          type="text"
          value={inputValue.text}
          style={{ marginBottom: '30px' }}
        />
      </Drawer>
    </DrawerController>
  )

  return (
    <React.Fragment>
      {input}
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
