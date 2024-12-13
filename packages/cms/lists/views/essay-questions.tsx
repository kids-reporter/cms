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

const QAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  margin-bottom: 15px;
`

const QAACtion = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const QASet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`

const QARow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

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
    <QAContainer>
      {props.label}
      <QAACtion>
        <QASet>
          <QARow>
            <span style={{ textWrap: 'nowrap' }}>題目</span>
            <TextInput
              placeholder="請填入題目"
              value={question}
              onChange={onQuestionChange}
            />
          </QARow>
          <QARow>
            <span style={{ textWrap: 'nowrap' }}>提示</span>
            <TextInput
              placeholder="請填入提示"
              value={tip}
              onChange={onTipChange}
            />
          </QARow>
        </QASet>
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
      </QAACtion>
    </QAContainer>
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
          <QAContainer key={`question-set-${index}`}>
            {`思辨題${index + 1}：`}
            <QAACtion>
              <QASet>
                <QARow>
                  <span style={{ textWrap: 'nowrap' }}>題目</span>
                  <TextInput
                    placeholder="請填入題目"
                    value={qa.question}
                    onChange={(e) =>
                      onEditQuestion(index, e.target.value, qa.tip)
                    }
                  />
                </QARow>
                <QARow>
                  <span style={{ textWrap: 'nowrap' }}>提示</span>
                  <TextInput
                    placeholder="請填入提示"
                    value={qa.tip}
                    onChange={(e) =>
                      onEditQuestion(index, qa.question, e.target.value)
                    }
                  />
                </QARow>
              </QASet>
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
            </QAACtion>
          </QAContainer>
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
