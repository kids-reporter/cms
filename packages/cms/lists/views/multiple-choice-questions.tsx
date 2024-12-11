import React, { useState } from 'react'
import styled from 'styled-components'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import {
  FieldContainer,
  FieldLabel,
  TextInput,
  Checkbox,
} from '@keystone-ui/fields'
import { PlusCircleIcon, TrashIcon } from '@keystone-ui/icons'
import { Tooltip } from '@keystone-ui/tooltip'
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

const QAComponent = (props: {
  label: string
  question: string
  answers: { value: string; isAnswer?: boolean }[]
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
            <span style={{ textWrap: 'nowrap' }}>題目：</span>
            <TextInput value={props.question} />
          </div>
          {props.answers?.map((answer, index) => {
            return (
              <div
                key={`anwser-option-${index}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '5px',
                  alignItems: 'center',
                }}
              >
                <span style={{ textWrap: 'nowrap' }}>{`答案${
                  index + 1
                }：`}</span>
                <TextInput value={answer.value} />
                <Checkbox checked={answer.isAnswer}>{''}</Checkbox>
                <Tooltip content="刪除答案">
                  {(props) => (
                    <IconButton
                      {...props}
                      size="small"
                      onClick={() => {
                        console.log('add')
                      }}
                    >
                      <TrashIcon size="small" color="green" />
                    </IconButton>
                  )}
                </Tooltip>
              </div>
            )
          })}
          <Divider />
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <span style={{ textWrap: 'nowrap' }}>{`新增答案：`}</span>
            <TextInput value={''} />
            <Checkbox checked={false}>{''}</Checkbox>
            <Tooltip content="新增答案">
              {(props) => (
                <IconButton
                  {...props}
                  size="small"
                  onClick={() => {
                    console.log('add')
                  }}
                >
                  <PlusCircleIcon size="small" color="green" />
                </IconButton>
              )}
            </Tooltip>
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
            <QAComponent
              key={`multiple-question-set-${index}`}
              label={`選擇題${index + 1}(請勾選正確答案)：`}
              question={qa.question}
              answers={qa.options}
              actionElement={
                <Tooltip content="刪除題組">
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
      <QAComponent
        label={`新增選擇題(請勾選正確答案)：`}
        question={''}
        answers={[]}
        actionElement={
          <Tooltip content="新增題組">
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
