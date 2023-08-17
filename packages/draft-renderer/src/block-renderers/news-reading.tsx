import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Dropdown } from './dropdown'

const ArticleBodyContainer = styled.div`
  max-width: 600px;
  width: calc(280 / 320 * 100%);
  border: 1px solid #eaeaea;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
`

const Divider = styled.div`
  border: 1px solid #eaeaea;
  margin-bottom: 20px;
`

const IframeContainer = styled.div`
  padding: 20px;
`

type NewsReadingProps = {
  readings: {
    title: string
    iframeCode: string
  }[]
}

const NewsReading = function ({ readings }: NewsReadingProps) {
  const options = useMemo(
    () =>
      readings.map((r) => {
        return {
          name: r.title,
          value: r.title,
        }
      }),
    [readings]
  )
  const [selectedOption, setSelectedOption] = useState(options[0])
  const selectedReading = readings.find((r) => r.title === selectedOption.value)

  return (
    <ArticleBodyContainer>
      <Dropdown
        options={options}
        onChange={(option) => setSelectedOption(option)}
      />
      <Divider />
      {selectedReading?.iframeCode && (
        <IframeContainer>
          <div
            dangerouslySetInnerHTML={{ __html: selectedReading.iframeCode }}
          />
        </IframeContainer>
      )}
    </ArticleBodyContainer>
  )
}

export { NewsReading }
