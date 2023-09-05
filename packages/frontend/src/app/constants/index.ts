export const CMS_URL = 'https://dev-kids-cms.twreporter.org'
export const API_URL = 'https://dev-kids-cms.twreporter.org/api/graphql'

export const SUBSCRIBE_URL = 'http://eepurl.com/idk8VH'
export const MAIN_SITE_URL = 'https://www.twreporter.org/'
export const DONATE_URL = 'https://support.twreporter.org/'
export const CREDIT_DONATE_URL = 'https://www.twreporter.org/a/credit-donate'

export const BACK_TO_TOP_ELEMENT_ID = 'back-to-top'

export enum Theme {
  YELLOW = 'yellow',
  BLUE = 'blue',
  RED = 'red',
}

// TODO: set category mapping
export const GetThemeFromCategory = (Category: any): Theme => {
  switch (Category) {
    default:
      return Theme.YELLOW
  }
}

export enum ThemeColor {
  YELLOW = '#F8C341',
  BLUE = '#27B5F7',
  RED = '#F76977',
}

export const DEFAULT_THEME_COLOR = ThemeColor.YELLOW

export enum AuthorRole {
  CONSULTANTS = '諮詢專家',
  WRITERS = '文字',
  PHOTOGRAPHERS = '攝影',
  DESIGNERS = '設計',
  REVIEWERS = '核稿',
  AUDITORS = '審閱',
  EDITORS = '責任編輯',
}
export const AUTHOR_ROLES_IN_ORDER = [
  AuthorRole.CONSULTANTS,
  AuthorRole.WRITERS,
  AuthorRole.PHOTOGRAPHERS,
  AuthorRole.DESIGNERS,
  AuthorRole.REVIEWERS,
  AuthorRole.AUDITORS,
  AuthorRole.EDITORS,
]

export const DEFAULT_AVATAR = '/images/avatar_default.png'
