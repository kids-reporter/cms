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
  flex: auto;
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

export const FieldTemplate = (initPrompt: string) => {
  const FieldComponent = ({ value }: FieldProps<typeof controller>) => {
    let content = ''
    if (value?.content) {
      const contentState = convertFromRaw(value.content)
      content = contentState?.getPlainText(',')
    }

    const [prompt, setPrompt] = useState<string>(initPrompt)
    const [isResponding, setIsResponding] = useState<boolean>(false)
    const [reply, setReply] = useState<string>(
      '　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　'
    )

    const isAIAvailable = value && value.openAIKey

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
          messages: [
            { role: 'user', content: content ?? '' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 15000,
        })

        if (response.status === 200) {
          const reply = response.data?.choices?.[0]?.message?.content
          setIsResponding(false)
          setReply(reply)
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
      setIsResponding(true)
      await askChatGPT()
    }

    const handlePrompt = (event) => {
      setPrompt(event.target.value)
    }

    const cmdInput = (
      <Row>
        <TextInput
          placeholder="傳指令給ChatGPT"
          onChange={handlePrompt}
          value={prompt}
          disabled={isResponding || !isAIAvailable}
        />
        <Tooltip content="送出">
          {(props) => (
            <Button
              {...props}
              aria-label="送出"
              onClick={handleClick}
              disabled={isResponding || !isAIAvailable}
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
          {reply}
          {isResponding && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                style={{ width: '25px', height: '25px' }}
                src="/loading.gif"
              />
            </div>
          )}
        </MsgContainer>
      </FieldContainer>
    )
  }

  return FieldComponent
}
