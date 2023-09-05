'use client'

import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Dropdown } from './dropdown'

const Container = styled.div`
  max-width: 600px;
  width: calc(280 / 320 * 100%);
  border: 1px solid #eaeaea;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 70px;
`

const Divider = styled.div`
  border: 1px solid #eaeaea;
  margin-bottom: 20px;
`

const IframeContainer = styled.div`
  padding: 20px;
`

type NewsReadingProps = {
  className?: string
  data: {
    items: {
      name: string
      embedCode: string
    }[]
  }
}

const NewsReading = ({ className, data }: NewsReadingProps) => {
  const items = data?.items || []

  const options = useMemo(
    () =>
      items.map((r) => {
        return {
          name: r?.name,
          value: r?.name,
        }
      }),
    [items]
  )

  const [selectedOption, setSelectedOption] = useState(options[0])
  const selectedReading = items?.find((r) => r?.name === selectedOption?.value)

  if (items.length === 0) {
    return null
  }

  return (
    <Container className={className}>
      <Dropdown
        options={options}
        onChange={(option) => setSelectedOption(option)}
        labelForMore="更多語言"
      />
      <Divider />
      {selectedReading?.embedCode && (
        <IframeContainer>
          <div
            dangerouslySetInnerHTML={{ __html: selectedReading.embedCode }}
          />
        </IframeContainer>
      )}
    </Container>
  )
}

export { NewsReading }
export default NewsReading
