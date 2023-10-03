'use client'

import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { mediaQuery } from '@/app/utils/media-query'

const Title = styled.h3`
  color: #232323;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  text-align: center;

  margin-top: 15px;
  margin-bottom: 10px;
`

const Buttons = styled.div`
  margin-left: auto;
  margin-right: auto;

  width: 100%;
  padding-bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;

  ${mediaQuery.mediumAbove} {
    width: 500px;
  }
`

const Button = styled.div<{ isActive: boolean }>`
  ${({ isActive }) => {
    return isActive
      ? `
      border-color: #27B5F7;
      color: #404040;
    `
      : `
      border-color: #EAEAEA;
      color: #A3A3A3;
    `
  }}

  &:hover {
    color: #404040;
  }

  border-width: 2.5px;
  border-style: solid;
  border-radius: 30px;

  line-height: 30px;
  width: 90px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
`

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
`

const IframeContainer = styled.div`
  padding: 20px 15px;
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

  const buttons = options.map((option, idx) => {
    return (
      <Button
        key={idx}
        isActive={option.value === selectedOption.value}
        onClick={() => setSelectedOption(option)}
      >
        {option.name}
      </Button>
    )
  })

  return (
    <Container className={className}>
      <Title>讀報</Title>
      <Buttons>{buttons}</Buttons>
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
