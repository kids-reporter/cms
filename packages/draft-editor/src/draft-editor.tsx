import React from 'react'
import {
  ContentBlock,
  DraftBlockType,
  DraftEditorCommand,
  Editor,
  EditorState,
  KeyBindingUtil,
  RichUtils,
  getDefaultKeyBinding,
  CompositeDecorator,
} from 'draft-js'
import {
  blockRenderMap,
  customStyleFn,
  annotationDecorator,
  linkDecorator,
  ENTITY,
} from '@kids-reporter/draft-renderer'
import buttonNames from './buttons/bt-names'
import { RichTextEditorProps } from './draft-editor.type'
import { atomicBlockRenderer } from './block-renderer-fn'
import {
  DraftEditorContainer,
  DraftEditorWrapper,
  DraftEditorControls,
  DraftEditorControlsWrapper,
  EnlargeButtonWrapper,
  TextEditorWrapper,
} from './styled'
import {
  BlockStyleControls,
  InlineStyleControls,
  CustomEnlargeButton,
  CustomTOCAnchorButton,
  CustomInnerAnchorButton,
  CustomLinkButton,
  CustomBackgroundColorButton,
  CustomFontColorButton,
  CustomBlockquoteButton,
  CustomImageButton,
  CustomSlideshowButton,
  CustomEmbeddedCodeButton,
  CustomNewsReadingButton,
  CustomDividerButton,
  withStyle,
} from './buttons'
import { ImageSelector } from './buttons/selector/image-selector'
import { createAnnotationButton } from './buttons/annotation'
import { createInfoBoxButton } from './buttons/info-box'
import { customStylePrefix as bgColorPrefix } from './buttons/bg-color'
import { customStylePrefix as fontColorPrefix } from './buttons/font-color'
import { editableAnchorDecorator } from './entity-decorators/anchor'
import { editableInnerAnchorDecorator } from './entity-decorators/inner-anchor'

const styleSource = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://storage.googleapis.com/static-readr-tw-dev/cdn/draft-js/rich-editor.css',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
].map((src, index) => (
  <link
    key={`style-src-${index}`}
    href={src}
    rel="stylesheet"
    type="text/css"
  />
))

const decorator = new CompositeDecorator([annotationDecorator, linkDecorator])

type State = {
  isEnlarged: boolean
  readOnly: boolean
}

class RichTextEditor extends React.Component<RichTextEditorProps, State> {
  editorRef = null
  editorDecorator

  constructor(props: RichTextEditorProps) {
    super(props)
    this.state = {
      isEnlarged: false,
      readOnly: false,
    }
    this.editorDecorator = new CompositeDecorator([
      annotationDecorator,
      linkDecorator,
      {
        ...editableAnchorDecorator,
        props: {
          ...this.customEditProps,
        },
      },
      {
        ...editableInnerAnchorDecorator,
        props: {
          ...this.customEditProps,
        },
      },
    ])
  }

  onChange = (editorState: EditorState) => {
    this.props.onChange(editorState)
  }

  handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  handleReturn = (event: React.KeyboardEvent) => {
    if (KeyBindingUtil.isSoftNewlineEvent(event)) {
      const { onChange, editorState } = this.props
      onChange(RichUtils.insertSoftNewline(editorState))
      return 'handled'
    }

    return 'not-handled'
  }

  mapKeyToEditorCommand = (e: React.KeyboardEvent) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.props.editorState,
        4 /* maxDepth */
      )
      if (newEditorState !== this.props.editorState) {
        this.onChange(newEditorState)
      }
      return null
    }
    return getDefaultKeyBinding(e)
  }

  toggleBlockType = (blockType: DraftBlockType) => {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType))
  }

  toggleInlineStyle = (inlineStyle: string) => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    )
  }

  getEntityType = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent()
    const selection = editorState.getSelection()
    const startOffset = selection.getStartOffset()
    const startBlock = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())

    const endOffset = selection.getEndOffset()
    let entityInstance
    let entityKey

    if (!selection.isCollapsed()) {
      entityKey = startBlock.getEntityAt(startOffset)
    } else {
      entityKey = startBlock.getEntityAt(endOffset)
    }

    if (entityKey !== null) {
      entityInstance = contentState.getEntity(entityKey)
    }

    let entityType = ''
    if (entityInstance) {
      entityType = entityInstance.getType()
    }

    return entityType
  }

  toggleEnlarge = () => {
    this.setState({ isEnlarged: !this.state.isEnlarged })
  }

  commonEditProps = {
    onEditStart: () => {
      this.setState({
        // If custom block renderer requires mouse interaction,
        // [Draft.js document](https://draftjs.org/docs/advanced-topics-block-components#recommendations-and-other-notes)
        // suggests that we should temporarily set Editor
        // to readOnly={true} during the interaction.
        // In readOnly={true} condition, the user does not
        // trigger any selection changes within the editor
        // while interacting with custom block.
        // If we don't set readOnly={true},
        // it will cause some subtle bugs in InfoBox button.
        readOnly: true,
      })
    },
    onEditFinish: () => {
      this.setState({ readOnly: false })
    },
  }

  customEditProps = {
    onEditStart: this.commonEditProps.onEditStart,
    onEditFinish: ({
      entityKey,
      entityData,
    }: {
      entityKey?: string
      entityData?: { [key: string]: any }
    } = {}) => {
      if (entityKey && entityData) {
        const oldContentState = this.props.editorState.getCurrentContent()
        const newContentState = oldContentState.replaceEntityData(
          entityKey,
          entityData
        )
        this.onChange(
          EditorState.set(this.props.editorState, {
            currentContent: newContentState,
          })
        )
      }
      this.commonEditProps.onEditFinish()
    },
  }

  blockRendererFn = (block: ContentBlock) => {
    const atomicBlockObj = atomicBlockRenderer(block)
    if (atomicBlockObj) {
      // `onEditStart` and `onEditFinish` will be passed
      // into custom block component.
      // We can get them via `props.blockProps.onEditStart`
      // and `props.blockProps.onEditFinish` in the custom block components.
      atomicBlockObj['props'] = {
        ...this.customEditProps,
        RichTextEditorComponent: RichTextEditor,
        decorator,
        getMainEditorReadOnly: () => this.state.readOnly,
      }
    }
    return atomicBlockObj
  }

  render() {
    const { disabledButtons = [] } = this.props
    let { editorState } = this.props

    if (!(editorState instanceof EditorState)) {
      editorState = EditorState.createEmpty(this.editorDecorator)
    } else {
      editorState = EditorState.set(editorState, {
        decorator: this.editorDecorator,
      })
    }
    const { isEnlarged, readOnly } = this.state

    const entityType = this.getEntityType(editorState)

    const commonProps = {
      editorState: editorState,
      onChange: this.onChange,
      readOnly: this.state.readOnly,
    }

    return (
      <DraftEditorContainer isEnlarged={isEnlarged}>
        <DraftEditorWrapper>
          {styleSource}
          <DraftEditorControls>
            <DraftEditorControlsWrapper>
              <BlockStyleControls
                disabledButtons={disabledButtons}
                editorState={editorState}
                onToggle={this.toggleBlockType}
                readOnly={this.state.readOnly}
              />
              <InlineStyleControls
                disabledButtons={disabledButtons}
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
                readOnly={this.state.readOnly}
              />
              <EnlargeButtonWrapper>
                <CustomEnlargeButton
                  onToggle={this.toggleEnlarge}
                  isEnlarged={isEnlarged}
                ></CustomEnlargeButton>
              </EnlargeButtonWrapper>
              <CustomTOCAnchorButton
                isDisabled={disabledButtons.includes(buttonNames.tocAnchor)}
                isActive={entityType === ENTITY.TOCAnchor}
                {...commonProps}
              />
              <CustomInnerAnchorButton
                isDisabled={disabledButtons.includes(buttonNames.innerAnchor)}
                isActive={entityType === ENTITY.Anchor}
                {...commonProps}
              />
              <CustomLinkButton
                isDisabled={disabledButtons.includes(buttonNames.link)}
                isActive={entityType === ENTITY.Link}
                {...commonProps}
                {...this.commonEditProps}
              />
              <CustomBackgroundColorButton
                isDisabled={disabledButtons.includes(
                  buttonNames.backgroundColor
                )}
                isActive={
                  editorState
                    .getCurrentInlineStyle()
                    .find(
                      (styleName) =>
                        typeof styleName === 'string' &&
                        styleName.startsWith(bgColorPrefix)
                    ) !== undefined
                }
                {...commonProps}
                {...this.commonEditProps}
              ></CustomBackgroundColorButton>
              <CustomFontColorButton
                isDisabled={disabledButtons.includes(buttonNames.fontColor)}
                isActive={
                  editorState
                    .getCurrentInlineStyle()
                    .find(
                      (styleName) =>
                        typeof styleName === 'string' &&
                        styleName.startsWith(fontColorPrefix)
                    ) !== undefined
                }
                {...commonProps}
                {...this.commonEditProps}
              ></CustomFontColorButton>
              <CustomBlockquoteButton
                isDisabled={disabledButtons.includes(buttonNames.blockquote)}
                {...commonProps}
              />
              <CustomAnnotationButton
                isDisabled={disabledButtons.includes(buttonNames.annotation)}
                isActive={entityType === ENTITY.Annotation}
                {...commonProps}
                {...this.commonEditProps}
              />
              <CustomImageButton
                isDisabled={disabledButtons.includes(buttonNames.image)}
                ImageSelector={ImageSelector}
                {...commonProps}
              />
              <CustomSlideshowButton
                isDisabled={disabledButtons.includes(buttonNames.slideshow)}
                ImageSelector={ImageSelector}
                {...commonProps}
              />
              <CustomInfoBoxButton
                isDisabled={disabledButtons.includes(buttonNames.infoBox)}
                {...commonProps}
              />
              <CustomEmbeddedCodeButton
                isDisabled={disabledButtons.includes(buttonNames.embed)}
                {...commonProps}
              ></CustomEmbeddedCodeButton>
              <CustomNewsReadingButton
                isDisabled={disabledButtons.includes(buttonNames.newsReading)}
                {...commonProps}
              ></CustomNewsReadingButton>
              <CustomDividerButton
                isDisabled={disabledButtons.includes(buttonNames.divider)}
                {...commonProps}
              />
            </DraftEditorControlsWrapper>
          </DraftEditorControls>
          <TextEditorWrapper
            onClick={() => {
              if (this.editorRef) {
                // eslint-disable-next-line prettier/prettier
                (this.editorRef as HTMLElement)?.focus()
              }
            }}
          >
            <Editor
              blockRenderMap={blockRenderMap}
              blockRendererFn={this.blockRendererFn}
              customStyleFn={customStyleFn}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              handleReturn={this.handleReturn}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref={this.editorRef}
              spellCheck={true}
              readOnly={readOnly}
            />
          </TextEditorWrapper>
        </DraftEditorWrapper>
      </DraftEditorContainer>
    )
  }
}

const AnnotationButton = createAnnotationButton({
  InnerEditor: RichTextEditor,
  decorator,
})

const InfoBoxButton = createInfoBoxButton({
  InnerEditor: RichTextEditor,
  decorator,
})

const CustomAnnotationButton = withStyle(AnnotationButton)
const CustomInfoBoxButton = withStyle(InfoBoxButton)

export { RichTextEditor, decorator }

export default {
  RichTextEditor,
  decorator,
}
