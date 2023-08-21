import { BlockquoteInArticleBody } from './blockquote'
import {
  EmbeddedCodeBlock,
  EmbeddedCodeInArticleBody,
} from './embedded-code-block'
import { ImageBlock, ImageInArticleBody } from './image-block'
import { InfoBoxInArticleBody } from './info-box-block'
import { SlideshowBlock, SlideshowInArticleBody } from './slideshow-block'
import { NewsReading } from './news-reading'

export const blockRenderers = {
  BlockquoteInArticleBody,
  EmbeddedCodeBlock,
  EmbeddedCodeInArticleBody,
  ImageBlock,
  ImageInArticleBody,
  InfoBoxInArticleBody,
  NewsReading,
  SlideshowBlock,
  SlideshowInArticleBody,
}
