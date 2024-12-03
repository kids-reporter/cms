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
    home: customFields.richTextEditor({
      label: '首頁',
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
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    topics: customFields.richTextEditor({
      label: '專題集合頁',
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
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    topic: customFields.richTextEditor({
      label: '專題頁',
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
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    news: customFields.richTextEditor({
      label: '新聞集合頁',
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
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    comics: customFields.richTextEditor({
      label: '漫畫集合頁',
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
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    lessons: customFields.richTextEditor({
      label: '教案集合頁',
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
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    podcasts: customFields.richTextEditor({
      label: 'podcast集合頁',
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
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    aboutUs: customFields.richTextEditor({
      label: '關於我們',
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
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
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
