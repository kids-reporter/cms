import { createContext, useContext } from 'react'
import { FontSizeLevel } from '@/app/constants'

type Article = {
  fontSize: FontSizeLevel
  onFontSizeChange: () => void
}

export const ArticleContext = createContext<Article>({
  fontSize: FontSizeLevel.NORMAL,
  onFontSizeChange: () => undefined,
})

export const useArticleContext = () => useContext(ArticleContext)
