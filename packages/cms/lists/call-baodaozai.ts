import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'
import { list } from '@keystone-6/core'
import { text, timestamp } from '@keystone-6/core/fields'
import {
  customFields,
  richTextEditorButtonNames,
} from '@kids-reporter/cms-core'

const genRichTextEditorConfig = (label: string) => {
  return customFields.richTextEditor({
    label: label,
    disabledButtons: [
      richTextEditorButtonNames.blockquote,
      richTextEditorButtonNames.code,
      richTextEditorButtonNames.codeBlock,
      richTextEditorButtonNames.embed,
      richTextEditorButtonNames.h2,
      richTextEditorButtonNames.h3,
      richTextEditorButtonNames.h4,
      richTextEditorButtonNames.h5,
      richTextEditorButtonNames.image,
      richTextEditorButtonNames.imageLink,
      richTextEditorButtonNames.infoBox,
      richTextEditorButtonNames.slideshow,
      richTextEditorButtonNames.newsReading,
      richTextEditorButtonNames.divider,
      richTextEditorButtonNames.tocAnchor,
      richTextEditorButtonNames.anchor,
      richTextEditorButtonNames.annotation,
      richTextEditorButtonNames.backgroundColor,
      richTextEditorButtonNames.fontColor,
      richTextEditorButtonNames.ul,
      richTextEditorButtonNames.ol,
    ],
    ui: {
      listView: {
        fieldMode: 'hidden',
      },
    },
  })
}

const listConfigurations = list({
  fields: {
    name: text({
      isIndexed: 'unique',
      label: '設定適用範圍（英文）',
      validation: { isRequired: true },
      access: {
        update: () => false,
      },
    }),
    nameTC: text({
      label: '設定適用範圍（中文）',
      validation: { isRequired: true },
    }),
    home: genRichTextEditorConfig('首頁'),
    topics: genRichTextEditorConfig('專題集合頁'),
    topic: genRichTextEditorConfig('專題頁'),
    news: genRichTextEditorConfig('新聞集合頁'),
    comics: genRichTextEditorConfig('漫畫集合頁'),
    lessons: genRichTextEditorConfig('教案集合頁'),
    podcasts: genRichTextEditorConfig('podcast集合頁'),
    aboutUs: genRichTextEditorConfig('關於我們'),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
  },
  access: {
    operation: {
      query: allowAllRoles(),
      create: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      update: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      delete: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    },
  },
  ui: {
    label: 'Call Baodaozai',
    singular: 'Call Baodaozai',
    plural: 'Call Baodaozai',
    listView: {
      initialColumns: ['nameTC', 'name'],
    },
  },
})

export default listConfigurations
