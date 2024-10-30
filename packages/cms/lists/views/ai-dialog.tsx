import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import copyToClipboard from 'clipboard-copy'
import { convertFromRaw } from 'draft-js'
import { FieldProps } from '@keystone-6/core/types'
import { FieldLabel, FieldContainer, TextInput } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { Tooltip } from '@keystone-ui/tooltip'
import { ClipboardIcon } from '@keystone-ui/icons/icons/ClipboardIcon'
import { ArrowRightIcon } from '@keystone-ui/icons/icons/ArrowRightIcon'
import { controller } from '@keystone-6/core/fields/types/virtual/views'
import envVar from '../../environment-variables'

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-bottom: 5px;
`

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const MsgRow = styled.div<{
  $isRightAlignment?: boolean
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ $isRightAlignment }) => {
    return $isRightAlignment ? 'flex-end' : 'flex-start'
  }};
  align-items: flex-end;
  gap: 5px;
  margin-bottom: 5px;
`

const Cmd = styled.div`
  max-width: 90%;
  border-radius: 10px;
  padding: 5px 10px;
  background: rgb(240 253 244);
`

const Reply = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  padding: 5px 10px;
  background: rgb(241 245 249);
`

const vendor = 'ChatGPT'

// TODO: add feature flag
export const Field = ({ value }: FieldProps<typeof controller>) => {
  const contentState = convertFromRaw(value.content)
  const content = contentState?.getPlainText(',')

  const [prompt, setPrompt] = useState<string>('')
  const [isResponding, setIsResponding] = useState<boolean>(false)
  const [messages, setMessages] = useState<any[]>([
    { role: 'user', content: content },
  ])

  // TODO: error handling,
  const askChatGPT = async (request: string) => {
    const openai = axios.create({
      baseURL: 'https://api.openai.com/v1/chat',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${envVar.openAIKey}`,
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
        setMessages([
          ...messages,
          { role: 'user', content: request },
          { role: 'assistant', content: reply },
        ])
      } else {
        console.error(`Axios response failed! Status: ${response.status}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // TODO: setMessages
  const handleClick = async () => {
    if (!prompt) {
      return
    }

    setMessages([...messages, { role: 'user', content: prompt }])
    setIsResponding(true)
    setPrompt('')
    await askChatGPT(prompt)
  }

  const handlePrompt = (event) => {
    setPrompt(event.target.value)
  }

  const msgsJSX = messages?.map((msg, index) => {
    // Ignore content msg
    if (index === 0) {
      return null
    }

    const isUser = msg.role === 'user'
    return (
      <MsgRow key={`msg-${index}`} $isRightAlignment={isUser}>
        {isUser ? (
          <Cmd>{msg.content}</Cmd>
        ) : (
          <>
            <Reply>{msg.content}</Reply>
            <Tooltip content="Copy">
              {(props) => (
                <Button
                  {...props}
                  aria-label="Copy"
                  onClick={() => {
                    copyToClipboard(msg.content)
                  }}
                >
                  <ClipboardIcon size="small" />
                </Button>
              )}
            </Tooltip>
          </>
        )}
      </MsgRow>
    )
  })

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
        {vendor}
        {value.label}
        {'(依據內文欄位)'}
      </FieldLabel>
      <MsgContainer>
        {msgsJSX}
        {isResponding && (
          <img
            style={{ width: '60px', height: '40px' }}
            src="/typing-texting.gif"
          />
        )}
      </MsgContainer>
      {cmdInput}
    </FieldContainer>
  )
}
