import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import copyToClipboard from 'clipboard-copy'
import { FieldProps } from '@keystone-6/core/types'
import {
  FieldLabel,
  FieldContainer,
  TextInput,
  TextArea,
} from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { Tooltip } from '@keystone-ui/tooltip'
import { ClipboardIcon } from '@keystone-ui/icons/icons/ClipboardIcon'
import { ArrowRightIcon } from '@keystone-ui/icons/icons/ArrowRightIcon'
import { controller } from '@keystone-6/core/fields/types/virtual/views'
import envVar from '../../environment-variables'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 5px;
`

const vendor = 'ChatGPT'

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const [prompt, setPrompt] = useState<string>('')
  const [result, setResult] = useState<string>('')

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
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 10000,
      })

      if (response.status === 200) {
        setResult(response.data?.choices?.[0]?.message?.content)
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

  return (
    <FieldContainer>
      <FieldLabel>
        {vendor}
        {value.label}
      </FieldLabel>
      <span>ChatGPT有可能回覆簡體中文，請在指令中提醒它用繁體中文回覆。</span>
      <Row>
        <TextInput placeholder="指令" onChange={handlePrompt} value={prompt} />
        <Tooltip content="Send">
          {(props) => (
            <Button {...props} aria-label="Send" onClick={handleClick}>
              <ArrowRightIcon size="small" />
            </Button>
          )}
        </Tooltip>
      </Row>
      <Row>
        <TextArea readOnly placeholder="生成內容" value={result} />
        <Tooltip content="Copy">
          {(props) => (
            <Button
              {...props}
              aria-label="Copy"
              onClick={() => {
                copyToClipboard(result)
              }}
            >
              <ClipboardIcon size="small" />
            </Button>
          )}
        </Tooltip>
      </Row>
    </FieldContainer>
  )
}
