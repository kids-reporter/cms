import React, { useState } from 'react'
import styled from 'styled-components'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields'
import { PlusCircleIcon, TrashIcon } from '@keystone-ui/icons'
import { Tooltip } from '@keystone-ui/tooltip'
import { Divider } from '@keystone-ui/core'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

type Author = {
  question: string
  tip: string
}

const IconButton = styled(Button)`
  background-color: transparent;
  margin: 0 0 0 0.5rem;
`

const GapDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 15px;
`

const questionTemplate = {
  question: '文字',
  tip: 'string',
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

const QuestionTipComponent = (props: {
  label: string
  question: string
  tip: string
  actionElement: any
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '5px',
        marginBottom: '15px',
      }}
    >
      {props.label}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            flex: '2',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <span style={{ textWrap: 'nowrap' }}>題目</span>
            <TextInput value={props.question} />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <span style={{ textWrap: 'nowrap' }}>提示</span>
            <TextInput value={props.tip} />
          </div>
        </div>
        {props.actionElement}
      </div>
    </div>
  )
}

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [authors, setAuthors] = useState<Author[]>(
    value ? JSON.parse(value) : []
  )
  const [newAuthor, setNewAuthor] = useState<Author>({ ...questionTemplate })

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
      setNewAuthor({ ...questionTemplate })
    }
  }

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <GapDivider />
      {onChange &&
        mockup?.map((qa, index) => {
          return (
            <QuestionTipComponent
              key={`question-set-${index}`}
              label={`思辨題${index + 1}：`}
              question={qa.question}
              tip={qa.question}
              actionElement={
                <Tooltip content="刪除">
                  {(props) => (
                    <IconButton
                      {...props}
                      size="small"
                      onClick={onAddNewAuthor}
                    >
                      <TrashIcon size="small" color="green" />
                    </IconButton>
                  )}
                </Tooltip>
              }
            />
          )
        })}
      <GapDivider />
      <QuestionTipComponent
        label={'新增思辨題：'}
        question={''}
        tip={''}
        actionElement={
          <Tooltip content="新增">
            {(props) => (
              <IconButton {...props} size="small" onClick={onAddNewAuthor}>
                <PlusCircleIcon size="small" color="green" />
              </IconButton>
            )}
          </Tooltip>
        }
      />
    </FieldContainer>
  )
}
