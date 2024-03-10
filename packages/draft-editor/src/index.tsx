import React from 'react'
import {
  RichTextEditor as _RichTextEditor,
  RichTextEditorProps,
} from './rich-text-editor'
import buttonNames from './buttons/bt-names'
import { editableAnnotationDecorator } from './entity-decorators/annotation'
import { editableLinkDecorator } from './entity-decorators/link'
import { editableTOCAnchorDecorator } from './entity-decorators/toc-anchor'
import { editableAnchorDecorator } from './entity-decorators/anchor'

const decorators = [
  editableAnnotationDecorator,
  editableLinkDecorator,
  editableTOCAnchorDecorator,
  editableAnchorDecorator,
]

const RichTextEditor = (props: RichTextEditorProps) => {
  return <_RichTextEditor decorators={decorators} {...props} />
}

export { RichTextEditor, buttonNames }

export default {
  RichTextEditor,
  buttonNames,
}
