import React, { useState } from 'react'
import { AtomicBlockUtils, EditorState, RawDraftContentState } from 'draft-js'
import { ImageLinkEditor } from '../block-renderers/image-link'
import { ImageAlignment } from '../buttons/selector/image-selector'

export const ImageLinkButton = (props: {
  editorState: EditorState
  onChange: (param: EditorState) => void
  className?: string
}) => {
  const { editorState, onChange: onEditorStateChange, className } = props

  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const promptForImageLinkEditor = () => {
    setIsEditorOpen(true)
  }

  const onChange = ({
    url,
    alignment,
    rawContentState,
  }: {
    url: string
    alignment: ImageAlignment
    rawContentState: RawDraftContentState
  }) => {
    const contentState = editorState.getCurrentContent()

    const contentStateWithEntity = contentState.createEntity(
      'IMAGE_LINK',
      'IMMUTABLE',
      {
        url,
        alignment,
        rawContentState,
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    //The third parameter here is a space string, not an empty string
    //If you set an empty string, you will get an error: Unknown DraftEntity key: null
    onEditorStateChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    )
    setIsEditorOpen(false)
  }

  return (
    <>
      {isEditorOpen && (
        <ImageLinkEditor
          isOpen={isEditorOpen}
          inputValue={{
            url: '',
            alignment: ImageAlignment.DEFAULT,
            rawContentState: { blocks: [], entityMap: {} },
          }}
          onConfirm={onChange}
          onCancel={() => {
            setIsEditorOpen(false)
          }}
        />
      )}

      <div className={className} onClick={promptForImageLinkEditor}>
        <i className="far fa-image"></i>
        <span> ImageLink</span>
      </div>
    </>
  )
}
