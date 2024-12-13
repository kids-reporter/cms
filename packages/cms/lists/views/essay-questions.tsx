import React, { useState } from 'react'
import styled from 'styled-components'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields'
import { PlusCircleIcon, TrashIcon } from '@keystone-ui/icons'
import { Tooltip } from '@keystone-ui/tooltip'
import { Divider } from '@keystone-ui/core'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

type EssayQuestion = {
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

const AddQuestionTipComponent = (props: {
  label: string
  question: string
  tip: string
  actionElement?: React.ReactNode
  onAddQuestionTip?: (question: string, tip: string) => void
}) => {
  const [question, setQuestion] = useState(props.question)
  const [tip, setTip] = useState(props.tip)

  const onAddQuestionTip = props.onAddQuestionTip
  const actionElement = props.actionElement

  const onQuestionChange = (e) => {
    setQuestion(e.target.value)
  }

  const onTipChange = (e) => {
    setTip(e.target.value)
  }

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
            <TextInput
              placeholder="請填入題目"
              value={question}
              onChange={onQuestionChange}
            />
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
            <TextInput
              placeholder="請填入提示"
              value={tip}
              onChange={onTipChange}
            />
          </div>
        </div>
        {actionElement && (
          <Tooltip content="新增">
            {(props) => (
              <IconButton
                {...props}
                size="small"
                onClick={() => {
                  onAddQuestionTip?.(question, tip)
                  setQuestion('')
                  setTip('')
                }}
              >
                {actionElement}
              </IconButton>
            )}
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [questions, setQuestions] = useState<EssayQuestion[]>(
    value ? JSON.parse(value) : []
  )
  const [prevValue, setPrevValue] = useState(value)

  if (value !== prevValue) {
    setPrevValue(value)
    setQuestions(value ? JSON.parse(value) : [])
  }

  const onAddNewQuestion = (question: string, tip: string) => {
    if (onChange) {
      const newQuestions = [...questions, { question, tip }]
      setQuestions(newQuestions)
      onChange(JSON.stringify(newQuestions))
    }
  }

  const onEditQuestion = (index: number, question: string, tip: string) => {
    if (onChange && index >= 0 && index < questions.length) {
      const newQuestions = [...questions]
      newQuestions[index].question = question
      newQuestions[index].tip = tip
      setQuestions(newQuestions)
      onChange(JSON.stringify(newQuestions))
    }
  }

  const onRemoveQuestion = (index: number) => {
    if (onChange && index >= 0 && index < questions.length) {
      const newQuestions = questions.filter((q, i) => i !== index)
      setQuestions(newQuestions)
      onChange(JSON.stringify(newQuestions))
    }
  }

  const savedQuestionsJSX =
    questions?.length > 0 ? (
      questions.map((qa, index) => {
        return (
          <div
            key={`question-set-${index}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: '5px',
              marginBottom: '15px',
            }}
          >
            {`思辨題${index + 1}：`}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
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
                  <TextInput
                    placeholder="請填入題目"
                    value={qa.question}
                    onChange={(e) =>
                      onEditQuestion(index, e.target.value, qa.tip)
                    }
                  />
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
                  <TextInput
                    placeholder="請填入提示"
                    value={qa.tip}
                    onChange={(e) =>
                      onEditQuestion(index, qa.question, e.target.value)
                    }
                  />
                </div>
              </div>
              <Tooltip content="刪除">
                {(props) => (
                  <IconButton
                    {...props}
                    size="small"
                    onClick={() => onRemoveQuestion(index)}
                  >
                    <TrashIcon size="small" color="green" />
                  </IconButton>
                )}
              </Tooltip>
            </div>
          </div>
        )
      })
    ) : (
      <span style={{ color: 'rgb(140, 150, 160)' }}>請新增思辯題</span>
    )

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <GapDivider />
      {onChange && savedQuestionsJSX}
      <GapDivider />
      <AddQuestionTipComponent
        label={'新增思辨題：'}
        question={''}
        tip={''}
        onAddQuestionTip={onAddNewQuestion}
        actionElement={<PlusCircleIcon size="small" color="green" />}
      />
    </FieldContainer>
  )
}
