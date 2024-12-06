import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { convertFromRaw } from 'draft-js'
import { FieldProps } from '@keystone-6/core/types'
import { FieldLabel, FieldContainer, TextInput } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { Tooltip } from '@keystone-ui/tooltip'
import { ArrowRightIcon } from '@keystone-ui/icons/icons/ArrowRightIcon'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-radius: 6px;
  padding: 10px;
  color: rgb(140, 150, 160);
  background-color: rgb(248, 248, 248);
`

export const Field = ({ value }: FieldProps<typeof controller>) => {
  let content
  if (value?.content) {
    const contentState = convertFromRaw(value.content)
    content = contentState?.getPlainText(',')
  }

  const [prompt, setPrompt] = useState<string>(
    '請依據此文章，提供三個依據文章內容事實的選擇題，每題四個選項。'
  )
  const [isResponding, setIsResponding] = useState<boolean>(false)
  const [messages, setMessages] = useState<any[]>([
    { role: 'user', content: content ?? '' },
  ])

  const askChatGPT = async () => {
    const openai = axios.create({
      baseURL: 'https://api.openai.com/v1/chat',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${value.openAIKey}`,
        'OpenAI-Organization': 'org-AFIRbr9PIQpDnVRPSuxABZJO',
        'OpenAI-Project': 'proj_8OZHy9Z26Vr3p8mDUcXE7Oby',
      },
    })

    try {
      const response = await openai.post('/completions', {
        model: 'gpt-4o-mini',
        messages: [...messages, { role: 'user', content: prompt }],
        max_tokens: 15000,
      })

      if (response.status === 200) {
        const reply = response.data?.choices?.[0]?.message?.content
        setIsResponding(false)
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      } else {
        console.error(`Axios response failed! Status: ${response.status}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = async () => {
    if (!prompt) {
      return
    }

    setMessages((prev) => [...prev, { role: 'user', content: prompt }])
    setIsResponding(true)
    await askChatGPT()
  }

  const handlePrompt = (event) => {
    setPrompt(event.target.value)
  }

  const msgsJSX = <>{'test'}</>

  const cmdInput = (
    <Row>
      <TextInput
        placeholder="傳指令給ChatGPT"
        onChange={handlePrompt}
        value={prompt}
        disabled={isResponding}
      />
      <Tooltip content="Send">
        {(props) => (
          <Button
            {...props}
            aria-label="Send"
            onClick={handleClick}
            disabled={isResponding}
          >
            <ArrowRightIcon size="small" />
          </Button>
        )}
      </Tooltip>
    </Row>
  )

  return (
    <FieldContainer>
      <FieldLabel>
        {value.label}
        {'(依據內文欄位)'}
      </FieldLabel>
      {cmdInput}
      <MsgContainer>
        {msgsJSX}
        {isResponding && (
          <img
            style={{ width: '60px', height: '40px' }}
            src="/typing-texting.gif"
          />
        )}
      </MsgContainer>
    </FieldContainer>
  )
}
