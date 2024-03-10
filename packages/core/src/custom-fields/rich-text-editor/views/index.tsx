import React from 'react'
import { Stack } from '@keystone-ui/core'; // eslint-disable-line
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
  JSONValue,
} from '@keystone-6/core/types'
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { RichTextEditor } from '@kids-reporter/draft-editor'

export const Field = ({
  field,
  value,
  onChange,
  autoFocus, // eslint-disable-line
}: FieldProps<typeof controller>) => {
  return (
    <FieldContainer>
      <FieldLabel>
        {field.label}
        <Stack>
          <RichTextEditor
            disabledButtons={field.disabledButtons}
            editorState={value}
            onChange={(editorState: EditorState) => onChange?.(editorState)}
          />
        </Stack>
      </FieldLabel>
    </FieldContainer>
  )
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = item[field.path] + ''
  return linkTo ? (
    <CellLink {...linkTo}>{value}</CellLink>
  ) : (
    <CellContainer>{value}</CellContainer>
  )
}
Cell.supportsLinkTo = true

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  )
}

export const controller = (
  config: FieldControllerConfig<{ disabledButtons: string[] }>
): FieldController<EditorState, JSONValue> & { disabledButtons: string[] } => {
  return {
    description: '',
    disabledButtons: config.fieldMeta?.disabledButtons ?? [],
    path: config.path,
    label: config.label,
    graphqlSelection: config.path,
    defaultValue: EditorState.createEmpty(),
    deserialize: (data) => {
      const rawContentState = data[config.path]
      if (rawContentState === null) {
        return EditorState.createEmpty()
      }
      try {
        const contentState = convertFromRaw(rawContentState)
        const editorState = EditorState.createWithContent(contentState)
        return editorState
      } catch (err) {
        console.error(err)
        return EditorState.createEmpty()
      }
    },
    serialize: (editorState: EditorState) => {
      if (!editorState) {
        return { [config.path]: null }
      }

      try {
        const rawContentState = convertToRaw(editorState.getCurrentContent())
        return {
          [config.path]: rawContentState,
        }
      } catch (err) {
        console.error(err)
        return { [config.path]: null }
      }
    },
  }
}
