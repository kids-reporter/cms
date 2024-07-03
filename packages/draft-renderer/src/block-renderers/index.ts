import { BlockquoteInArticleBody } from './blockquote'
import { Divider } from './divider'
import {
  EmbeddedCodeBlock,
  EmbeddedCodeInArticleBody,
} from './embedded-code-block'
import { ImageBlock, ImageInArticleBody } from './image-block'
import { ImageLinkInArticleBody } from './image-link'
import { InfoBoxInArticleBody } from './info-box-block'
import { SlideshowBlock, SlideshowInArticleBody } from './slideshow-block'
import { NewsReading } from './news-reading'

export const blockRenderers = {
  BlockquoteInArticleBody,
  Divider,
  EmbeddedCodeBlock,
  EmbeddedCodeInArticleBody,
  ImageBlock,
  ImageInArticleBody,
  ImageLinkInArticleBody,
  InfoBoxInArticleBody,
  NewsReading,
  SlideshowBlock,
  SlideshowInArticleBody,
}
