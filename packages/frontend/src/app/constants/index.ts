import { gqlEndpoint } from '@/environment-variables'

export const API_URL = gqlEndpoint

export const KIDS_URL_ORIGIN = 'https://kids.twreporter.org'
export const SUBSCRIBE_URL = 'http://eepurl.com/idk8VH'
export const CONTRIBUTE_FORM = 'https://forms.gle/7Yh4iPjfq92NDaSm9'
export const MAIN_SITE_URL = 'https://www.twreporter.org/'
export const DONATE_URL = 'https://support.twreporter.org/'
export const CREDIT_DONATE_URL = 'https://www.twreporter.org/a/credit-donate'
export const EMAIL = 'kidsnews@twreporter.org'

export const TOPIC_PAGE_ROUTE = '/topic/page/'

export const BACK_TO_TOP_ELEMENT_ID = 'back-to-top'

export const OG_SUFFIX = '少年報導者 The Reporter for Kids'

export const GENERAL_DESCRIPTION =
  '《少年報導者》是由非營利媒體《報導者》針對兒少打造的深度新聞報導品牌，與兒童和少年一起理解世界，參與未來。'

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
  COMIC_CONSULTANTS = '漫畫顧問',
  TEACH_DESIGN = '教學設計',
  DICTATION = '口述',
  AUTHORS = '作者',
  WRITERS = '文字',
  TRANSLATORS = '翻譯',
  PLANNERS = '企畫',
  INSTRUCTORS = '指導老師',
  PHOTOGRAPHERS = '攝影',
  LEAD_TEACHERS = '帶隊老師',
  PHOTO_INSTRUCTORS = '攝影指導',
  DESIGNERS = '設計',
  REVIEWERS = '核稿',
  AUDITORS = '審閱',
  EDITORS = '責任編輯',
  READERS = '讀報',
  DONATION_CONTACT = '捐書聯繫窗口',
  MARKETING = '行銷',
}

export const AUTHOR_ROLES_IN_ORDER = [
  AuthorRole.CONSULTANTS,
  AuthorRole.COMIC_CONSULTANTS,
  AuthorRole.TEACH_DESIGN,
  AuthorRole.DICTATION,
  AuthorRole.AUTHORS,
  AuthorRole.WRITERS,
  AuthorRole.TRANSLATORS,
  AuthorRole.PLANNERS,
  AuthorRole.INSTRUCTORS,
  AuthorRole.PHOTOGRAPHERS,
  AuthorRole.LEAD_TEACHERS,
  AuthorRole.PHOTO_INSTRUCTORS,
  AuthorRole.DESIGNERS,
  AuthorRole.REVIEWERS,
  AuthorRole.AUDITORS,
  AuthorRole.EDITORS,
  AuthorRole.READERS,
  AuthorRole.DONATION_CONTACT,
  AuthorRole.MARKETING,
]

export const DEFAULT_AVATAR = '/assets/images/avatar_default.png'

export const POST_PER_PAGE = 9

export const POST_CONTENT_GQL = `
title
slug
ogDescription
heroImage {
  resized {
    medium
  }
}
subSubcategories {
  name
  subcategory {
    name
    category {
      slug
      themeColor
    }
  }
}
publishedDate
`
