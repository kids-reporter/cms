import React from 'react'
import styled from 'styled-components'
import { FieldProps } from '@keystone-6/core/types'
import { FieldLabel, FieldContainer, TextInput } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

const Command = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-bottom: 5px;
`

const vendor = 'ChatGPT'

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const handleClick = () => {
    console.log('handleClick')
  }

  const handlePrompt = () => {
    console.log('handlePrompt')
  }

  const handleGeneratedContent = () => {
    console.log('handleGeneratedContent')
  }

  return (
    <FieldContainer>
      <FieldLabel>
        {vendor}
        {value.label}
      </FieldLabel>
      <Command>
        <TextInput placeholder="指令" onChange={handlePrompt} value={''} />
        <Button onClick={handleClick}>發送</Button>
      </Command>
      <TextInput
        placeholder="生成內容"
        onChange={handleGeneratedContent}
        value={''}
      />
    </FieldContainer>
  )
}
