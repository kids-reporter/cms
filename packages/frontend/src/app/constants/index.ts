import { releaseTarget } from '../environment-variables'

let CMS_URL = ''
let API_URL = ''

switch (releaseTarget) {
  case 'local': {
    CMS_URL = 'http://localhost:3001'
    API_URL = 'http://localhost:3001/api/graphql'
    break
  }
  case 'dev': {
    CMS_URL = 'https://dev-kids-cms.twreporter.org'
    API_URL = 'https://dev-kids-cms.twreporter.org/api/graphql'
    break
  }
  case 'staging': {
    CMS_URL = 'https://staging-kids-cms.twreporter.org'
    API_URL = 'https://staging-kids-cms.twreporter.org/api/graphql'
    break
  }
  case 'prod':
  default: {
    CMS_URL = 'https://kids-cms.twreporter.org'
    API_URL = 'https://kids-cms.twreporter.org/api/graphql'
    break
  }
}

export { CMS_URL, API_URL }

export const SUBSCRIBE_URL = 'http://eepurl.com/idk8VH'
export const CONTRIBUTE_FORM = 'https://forms.gle/7Yh4iPjfq92NDaSm9'
export const MAIN_SITE_URL = 'https://www.twreporter.org/'
export const DONATE_URL = 'https://support.twreporter.org/'
export const CREDIT_DONATE_URL = 'https://www.twreporter.org/a/credit-donate'
export const EMAIL = 'kidsnews@twreporter.org'

export const TOPIC_PAGE_ROUTE = '/topic/page/'

export const BACK_TO_TOP_ELEMENT_ID = 'back-to-top'

export enum FontSizeLevel {
  NORMAL = 'normal',
  LARGE = 'large',
}

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

export const POST_PER_PAGE = 9

export const POST_CONTENT_GQL = `
title
slug
ogDescription
heroImage {
  resized {
    medium
  }
  imageFile {
    url
  }
}
subSubcategories {
  name
  subcategory {
    name
  }
}
publishedDate
`
