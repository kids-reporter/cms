export const CMS_URL = 'https://dev-kids-cms.twreporter.org'
export const API_URL = 'https://dev-kids-cms.twreporter.org/api/graphql'

export const BACK_TO_TOP_ELEMENT_ID = 'back-to-top'

export enum Theme {
  YELLOW = 'yellow',
  BLUE = 'blue',
  RED = 'red',
}

export enum ThemeColor {
  YELLOW = '#F8C341',
  BLUE = '#27B5F7',
  RED = '#F76977',
}

export const DEFAULT_THEME_COLOR = ThemeColor.YELLOW

export enum AuthorGroup {
  WRITERS = 'writers',
  DESIGNERS = 'designers',
  REVIEWERS = 'reviewers',
  EDITORS = 'editors',
  PHOTOGRAPHERS = 'photographers',
  ENGINEERS = 'engineers',
}
export const AUTHOR_GROUPS = Object.values(AuthorGroup)

export const DEFAULT_AVATAR = '/images/avatar_default.png'
