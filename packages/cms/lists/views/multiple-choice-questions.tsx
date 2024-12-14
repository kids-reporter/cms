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

type Answer = {
  value: string
  isCorrect?: boolean
}

type MultipleChoiceQuestion = {
  question: string
  answers: Answer[]
}

const QAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  margin-bottom: 15px;
`

const QARow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const QASet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  flex: 2;
  padding-right: 5px;
  border-right: solid;
`

const IconButton = styled(Button)`
  background-color: transparent;
  margin: 0 0 0 0.5rem;
`

const GapDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 15px;
`

const AddQAComponent = (props: {
  onAddNewQA: (question: MultipleChoiceQuestion) => void
}) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [answers, setAnswers] = useState<Answer[]>([])

  const onQuestionChange = (e) => {
    setQuestion(e.target.value)
  }

  const onAnswersChange = (e) => {
    setAnswer(e.target.value)
  }

  const onIsCorrectChange = (e) => {
    setIsCorrect(e.target.checked)
  }

  const onAddNewAnswer = () => {
    const newAnswers = [...answers, { value: answer, isCorrect: isCorrect }]
    setAnswers(newAnswers)
    setAnswer('')
    setIsCorrect(false)
  }

  const onRemoveAnswer = (index: number) => {
    const newAnswers = answers.filter((a, i) => index !== i)
    setAnswers(newAnswers)
  }

  const onEditAnswer = (index: number, value: string) => {
    if (index >= 0 && index < answers.length) {
      const newAnswers = [...answers]
      newAnswers[index].value = value
      setAnswers(newAnswers)
    }
  }

  const onEditIsCorrect = (index: number, isCorrect: boolean) => {
    if (index >= 0 && index < answers.length) {
      const newAnswers = [...answers]
      newAnswers[index].isCorrect = isCorrect
      setAnswers(newAnswers)
    }
  }

  const onAddNewQA = () => {
    props?.onAddNewQA?.({
      question: question,
      answers: answer
        ? [...answers, { value: answer, isCorrect: isCorrect }]
        : answers,
    })
  }

  return (
    <QAContainer>
      {'新增選擇題(請勾選正確答案)：'}
      <QARow>
        <QASet>
          <QARow>
            <span style={{ textWrap: 'nowrap' }}>題目：</span>
            <TextInput
              placeholder="請填入題目"
              value={question}
              onChange={onQuestionChange}
            />
          </QARow>
          {answers?.map((answer, index) => {
            return (
              <QARow key={`anwser-option-${index}`}>
                <span style={{ textWrap: 'nowrap' }}>{`答案${
                  index + 1
                }：`}</span>
                <TextInput
                  value={answer.value}
                  placeholder="請填入答案"
                  onChange={(e) => onEditAnswer(index, e.target.value)}
                />
                <Checkbox
                  checked={answer.isCorrect}
                  onChange={(e) => onEditIsCorrect(index, e.target.checked)}
                >
                  {''}
                </Checkbox>
                <Tooltip content="刪除答案">
                  {(props) => (
                    <IconButton
                      {...props}
                      size="small"
                      onClick={() => onRemoveAnswer(index)}
                    >
                      <TrashIcon size="small" color="green" />
                    </IconButton>
                  )}
                </Tooltip>
              </QARow>
            )
          })}
          <QARow>
            <span style={{ textWrap: 'nowrap' }}>{`新增答案：`}</span>
            <TextInput
              placeholder="請填入答案"
              value={answer}
              onChange={onAnswersChange}
            />
            <Checkbox checked={isCorrect} onChange={onIsCorrectChange}>
              {''}
            </Checkbox>
            <Tooltip content="新增答案">
              {(props) => (
                <IconButton {...props} size="small" onClick={onAddNewAnswer}>
                  <PlusCircleIcon size="small" color="green" />
                </IconButton>
              )}
            </Tooltip>
          </QARow>
        </QASet>
        <Tooltip content="新增題組">
          {(props) => (
            <IconButton
              {...props}
              disabled={answers.length <= 0}
              size="small"
              onClick={onAddNewQA}
            >
              <PlusCircleIcon size="small" color="green" />
            </IconButton>
          )}
        </Tooltip>
      </QARow>
    </QAContainer>
  )
}

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>(
    value ? JSON.parse(value) : []
  )
  const [prevValue, setPrevValue] = useState(value)

  if (value !== prevValue) {
    setPrevValue(value)
    setQuestions(value ? JSON.parse(value) : [])
  }

  const onAddNewQuestion = (newQuestion: MultipleChoiceQuestion) => {
    if (onChange) {
      const newQuestions = [...questions, newQuestion]
      setQuestions(newQuestions)
      onChange(JSON.stringify(newQuestions))
    }
  }

  const questionsJSX =
    questions?.length > 0 ? (
      questions.map((q) => {
        return <>{q.question}</>
      })
    ) : (
      <span style={{ color: 'rgb(140, 150, 160)' }}>請新增選擇題</span>
    )

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <GapDivider />
      {onChange && questionsJSX}
      {/*onChange &&
        mockup?.map((qa, index) => {
          return (
            <AddQAComponent
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
        })*/}
      <GapDivider />
      <AddQAComponent onAddNewQA={onAddNewQuestion} />
    </FieldContainer>
  )
}
