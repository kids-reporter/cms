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
  align-items: stretch;
  gap: 5px;
  margin-bottom: 5px;
`

const Cmd = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const Reply = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 5px;
  background: rgb(241 245 249);
`

const Msg = styled.div`
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 5px;
  background: rgb(240 253 244);
`

const vendor = 'ChatGPT'

// TODO: add feature flag
export const Field = ({ value }: FieldProps<typeof controller>) => {
  const contentState = convertFromRaw(value.content)
  const content = contentState?.getPlainText(',')

  const [prompt, setPrompt] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([
    { role: 'user', content: content },
  ]) // ([{ role: 'user', content: content }, { role: 'user', content: '請依據此文章，提供100字以下，能引發10歲孩子閱讀此文章的動機' }, { role: 'assistant', content: '作家楊索年少時期因家境貧困，難有升學機會，但他到處打工並苦讀自學，一次次向命運發動挑戰，找到自己在世界的立足之地。（攝影／王崴漢）' }, ])

  // TODO: add waiting status for reponse text area
  const handleClick = async () => {
    if (!prompt) {
      return
    }

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
        setMessages([
          ...messages,
          { role: 'user', content: prompt },
          { role: 'assistant', content: reply },
        ])
      } else {
        console.error(`Axios response failed! Status: ${response.status}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handlePrompt = (event) => {
    setPrompt(event.target.value)
  }

  // TODO: adjust UI
  return (
    <FieldContainer>
      <FieldLabel>
        {vendor}
        {value.label}
      </FieldLabel>
      <span>ChatGPT有可能回覆簡體中文，請在指令中提醒它用繁體中文回覆。</span>
      {messages?.map((msg, index) => {
        return index === 0 ? null : (
          <Row>
            {msg.role === 'user' ? (
              <Cmd>
                <Msg>{msg.content}</Msg>
              </Cmd>
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
          </Row>
        )
      })}
      <Row>
        <TextInput
          placeholder="傳指令給ChatGPT"
          onChange={handlePrompt}
          value={prompt}
        />
        <Tooltip content="Send">
          {(props) => (
            <Button {...props} aria-label="Send" onClick={handleClick}>
              <ArrowRightIcon size="small" />
            </Button>
          )}
        </Tooltip>
      </Row>
    </FieldContainer>
  )
}
