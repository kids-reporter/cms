import styled from 'styled-components'
import {
  buttonStyle,
  BlockStyleControls as _BlockStyleControls,
  InlineStyleControls as _InlineStyleControls,
} from './control-buttons'
import { BackgroundColorButton } from './bg-color'
import { BlockquoteButton } from './blockquote'
import { DividerButton } from './divider'
import { EmbeddedCodeButton } from './embedded-code'
import { EnlargeButton } from './enlarge'
import { FontColorButton } from './font-color'
import { ImageButton } from './image'
import { AnchorButton } from './anchor'
import { LinkButton } from './link'
import { SlideshowButton } from './slideshow'
import { NewsReadingButton } from './news-reading'

export const withStyle = (Button: React.ComponentType<any>) => {
  return styled(Button)`
    ${buttonStyle}
  `
}

export const BlockStyleControls = _BlockStyleControls
export const InlineStyleControls = _InlineStyleControls
export const CustomBlockquoteButton = withStyle(BlockquoteButton)
export const CustomAnchorButton = withStyle(AnchorButton)
export const CustomLinkButton = withStyle(LinkButton)
export const CustomEnlargeButton = styled(withStyle(EnlargeButton))`
  color: #999;
`
export const CustomImageButton = withStyle(ImageButton)
export const CustomSlideshowButton = withStyle(SlideshowButton)
export const CustomEmbeddedCodeButton = withStyle(EmbeddedCodeButton)
export const CustomNewsReadingButton = withStyle(NewsReadingButton)
export const CustomBackgroundColorButton = withStyle(BackgroundColorButton)
export const CustomFontColorButton = withStyle(FontColorButton)
export const CustomDividerButton = withStyle(DividerButton)
