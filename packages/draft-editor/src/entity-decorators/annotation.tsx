import React, { useState, useEffect } from 'react'
import { ContentState } from 'draft-js'
import styled from 'styled-components'
import { AlertDialog } from '@keystone-ui/modals'
import { TextInput } from '@keystone-ui/fields'
import { annotationDecorator } from '@kids-reporter/draft-renderer'

const Wrapper = styled.span`
  display: inline;
  color: #8e8e8e;
`

const EditButton = styled.div`
  display: inline;
  cursor: pointer;
  padding-left: 2px;
  padding-right: 2px;
`

export const AnnotationEditor = (props: {
  isOpen: boolean
  urlValue: string
  onConfirm: (linkURL: string) => void
  onCancel: () => void
}) => {
  const { isOpen, urlValue, onConfirm, onCancel } = props
  const [url, setURL] = useState(urlValue)

  return (
    <AlertDialog
      title="編輯連結"
      isOpen={isOpen}
      actions={{
        cancel: {
          label: 'Cancel',
          action: () => onCancel(),
        },
        confirm: {
          label: 'Confirm',
          action: () => onConfirm(url),
        },
      }}
    >
      <TextInput
        placeholder="連結"
        type="text"
        value={url}
        onChange={(e) => setURL(e.target.value)}
      />
    </AlertDialog>
  )
}

const EditableAnnotation = (props: {
  onEditStart: () => void
  onEditFinish: (arg0?: { entityKey?: string; entityData?: object }) => void
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
}) => {
  const { children, contentState, entityKey } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [url, setURL] = useState(
    contentState?.getEntity(entityKey)?.getData()?.url
  )

  useEffect(() => {
    setURL(contentState?.getEntity(entityKey).getData()?.url)
  })

  const onURLChange = (url: string) => {
    setIsModalOpen(false)
    setURL(url)
    props.onEditFinish({
      entityKey,
      entityData: {
        url: url,
      },
    })
  }

  return (
    <>
      {isModalOpen && (
        <AnnotationEditor
          isOpen={isModalOpen}
          urlValue={url}
          onConfirm={onURLChange}
          onCancel={() => {
            setIsModalOpen(false)
            props.onEditFinish()
          }}
        />
      )}
      <Wrapper>
        <annotationDecorator.component
          {...{ children, contentState, entityKey }}
        />
        <EditButton
          onClick={(e) => {
            e.preventDefault()
            setIsModalOpen(true)
            props.onEditStart()
          }}
        >
          <i className="fas fa-pen"></i>
        </EditButton>
      </Wrapper>
    </>
  )
}

export const edtiableAnnotationDecorator = {
  strategy: annotationDecorator.strategy,
  component: EditableAnnotation,
}
