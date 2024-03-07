import React, { useState } from 'react'
import { AlertDialog } from '@keystone-ui/modals'
import { EditorState, RichUtils } from 'draft-js'
import { TextInput } from '@keystone-ui/fields'
import { ENTITY } from '@kids-reporter/draft-renderer'

const styles = {
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 10,
  },
}

export const LinkButton = (props: {
  className?: string
  isActive: boolean
  editorState: EditorState
  onChange: (arg0: EditorState) => void
  onEditStart: () => void
  onEditFinish: () => void
}) => {
  const { isActive, editorState, onChange } = props

  const [toShowUrlInput, setToShowUrlInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')

  const promptForLink = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      props.onEditStart()
      setToShowUrlInput(true)
    }
  }

  const confirmLink = () => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      ENTITY.Link,
      'MUTABLE',
      { url: urlValue }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })
    onChange(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    )

    setToShowUrlInput(false)
    setUrlValue('')
    props.onEditFinish()
  }

  const onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      confirmLink()
    }
  }

  const removeLink = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null))
    }
    setToShowUrlInput(false)
    setUrlValue('')
    props.onEditFinish()
  }

  const urlInput = (
    <AlertDialog
      title="編輯外部連結或內部錨點(ID)"
      isOpen={toShowUrlInput}
      actions={{
        cancel: {
          label: 'Cancel',
          action: removeLink,
        },
        confirm: {
          label: 'Confirm',
          action: confirmLink,
        },
      }}
    >
      <p>
        <br />
        外部連結範例:
        <br />
        https://kids.twreporter.org/article/article1#part1
        <br />
        <br />
        內部錨點範例:
        <br />
        #part1
      </p>
      <TextInput
        onChange={(e) => setUrlValue(e.target.value)}
        style={styles.urlInput}
        type="text"
        value={urlValue}
        onKeyDown={onLinkInputKeyDown}
      />
    </AlertDialog>
  )

  return (
    <React.Fragment>
      {urlInput}
      <div
        className={props.className}
        onMouseDown={isActive ? removeLink : promptForLink}
      >
        <i className="fas fa-link"></i>
      </div>
    </React.Fragment>
  )
}
