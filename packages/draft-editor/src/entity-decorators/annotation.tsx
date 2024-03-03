import React, { useState, useEffect } from 'react'
import { EditorState, ContentState, CompositeDecorator } from 'draft-js'
import styled from 'styled-components'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import {
  linkDecorator,
  annotationDecorator,
} from '@kids-reporter/draft-renderer'
import buttonNames from '../buttons/bt-names'
import { RichTextEditor } from '../draft-editor'

export const renderDecorator = new CompositeDecorator([
  annotationDecorator,
  linkDecorator,
])

const disabledButtons = [
  buttonNames.h2,
  buttonNames.h3,
  buttonNames.code,
  buttonNames.codeBlock,
  buttonNames.blockquote,
  buttonNames.annotation,
  buttonNames.embed,
  buttonNames.image,
  buttonNames.infoBox,
  buttonNames.slideshow,
  buttonNames.newsReading,
  buttonNames.anchor,
]

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
  editorStateValue: EditorState
  onConfirm: (editorState: EditorState) => void
  onCancel: () => void
}) => {
  const { isOpen, editorStateValue, onConfirm, onCancel } = props
  const [editorState, setEditorState] = useState({
    value: editorStateValue,
  })

  return (
    <DrawerController isOpen={isOpen}>
      <Drawer
        title="註解"
        actions={{
          cancel: {
            label: 'Cancel',
            action: () => onCancel(),
          },
          confirm: {
            label: 'Confirm',
            action: () => onConfirm(editorState.value),
          },
        }}
      >
        <RichTextEditor
          disabledButtons={disabledButtons}
          editorState={editorState.value}
          onChange={(editorState: EditorState) => {
            setEditorState({
              value: editorState,
            })
          }}
        />
      </Drawer>
    </DrawerController>
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
  const [editorState, setEditorState] = useState({
    value: EditorState.createEmpty(renderDecorator),
  })

  useEffect(() => {
    setEditorState(
      contentState?.getEntity(entityKey).getData()?.rawContentState
    )
  })

  const onEditorStateChange = (editorState: EditorState) => {
    setIsModalOpen(false)
    setEditorState({ value: editorState })
    props.onEditFinish({
      entityKey,
      entityData: {
        rawContentState: editorState,
      },
    })
  }

  return (
    <>
      {isModalOpen && (
        <AnnotationEditor
          isOpen={isModalOpen}
          editorStateValue={editorState.value}
          onConfirm={onEditorStateChange}
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
