import React, { useState } from 'react'
import styled from 'styled-components'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import {
  FieldContainer,
  FieldLabel,
  TextInput,
  Checkbox,
} from '@keystone-ui/fields'
import { PlusCircleIcon, TrashIcon } from '@keystone-ui/icons'
import { Divider } from '@keystone-ui/core'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

type Author = {
  id: string | undefined
  name: string
  role: string
  type: string
}

const IconButton = styled(Button)`
  background-color: transparent;
  margin: 0 0 0 0.5rem;
`

const GapDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 15px;
`

const authorTemplate = {
  id: undefined,
  name: '',
  role: '文字',
  type: 'string',
}

const mockup = [
  {
    question: 'q1',
    options: [
      { value: 'a11', isAnswer: true },
      { value: 'a12', isAnswer: true },
      { value: 'a13' },
    ],
  },
  {
    question: 'q2',
    options: [
      { value: 'a21', isAnswer: true },
      { value: 'a22' },
      { value: 'a23' },
    ],
  },
  {
    question: 'q3',
    options: [
      { value: 'a31' },
      { value: 'a32', isAnswer: true },
      { value: 'a33' },
    ],
  },
]

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [authors, setAuthors] = useState<Author[]>(
    value ? JSON.parse(value) : []
  )
  const [newAuthor, setNewAuthor] = useState<Author>({ ...authorTemplate })

  const [prevValue, setPrevValue] = useState(value)

  if (value !== prevValue) {
    setPrevValue(value)
    setAuthors(value ? JSON.parse(value) : [])
  }

  const onAddNewAuthor = () => {
    if (onChange) {
      const newAuthors = [...authors, newAuthor]
      setAuthors(newAuthors)
      onChange(JSON.stringify(newAuthors))
      setNewAuthor({ ...authorTemplate })
    }
  }

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <GapDivider />
      {onChange &&
        mockup?.map((qa, index) => {
          return (
            <div
              key={`question-set-${index}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                gap: '5px',
              }}
            >
              {`選擇題${index + 1} - 題目`}
              <TextInput value={qa.question} />
              {qa.options.map((option, optionIndex) => {
                return (
                  <div
                    key={`option-${optionIndex}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    {`選擇題 - 答案${optionIndex + 1}`}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                      }}
                    >
                      <TextInput value={option.value} />
                      <Checkbox checked={option.isAnswer}>正確答案</Checkbox>
                      <IconButton size="small" onClick={onAddNewAuthor}>
                        <TrashIcon size="small" color="green" />
                      </IconButton>
                    </div>
                  </div>
                )
              })}
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}
              >
                <TextInput value={''} />
                <Checkbox checked={false}>正確答案</Checkbox>
                <IconButton size="small" onClick={onAddNewAuthor}>
                  <PlusCircleIcon size="small" color="green" />
                </IconButton>
              </div>
            </div>
          )
        })}
    </FieldContainer>
  )
}
