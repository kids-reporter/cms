import {
  customFields,
  richTextEditorButtonNames,
} from '@kids-reporter/cms-core'
import { list } from '@keystone-6/core'
import { relationship, text, select, timestamp } from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    slug: text({
      isIndexed: 'unique',
      label: '英文名稱（用於網址）',
      validation: { isRequired: true },
    }),
    title: text({
      validation: { isRequired: true },
      label: '專題標題',
    }),
    subtitle: text({
      label: '副標',
      validation: { isRequired: false },
    }),
    status: select({
      isIndexed: true,
      defaultValue: 'draft',
      options: [
        { label: 'draft', value: 'draft' },
        { label: 'published', value: 'published' },
      ],
      label: '狀態',
    }),
    publishedDate: timestamp({
      isIndexed: true,
      label: '發布時間',
    }),
    heroImage: relationship({
      ref: 'Photo',
      label: '首圖',
    }),
    mobileHeroImage: relationship({
      ref: 'Photo',
      label: '手機首圖',
    }),
    content: customFields.richTextEditor({
      label: '前言',
      disabledButtons: [
        richTextEditorButtonNames.code,
        richTextEditorButtonNames.codeBlock,
        richTextEditorButtonNames.h2,
        richTextEditorButtonNames.newsReading,
      ],
    }),
    credits: customFields.richTextEditor({
      label: '團隊成員',
      disabledButtons: [
        richTextEditorButtonNames.annotation,
        richTextEditorButtonNames.blockquote,
        richTextEditorButtonNames.ol,
        richTextEditorButtonNames.ul,
        richTextEditorButtonNames.code,
        richTextEditorButtonNames.codeBlock,
        richTextEditorButtonNames.embed,
        richTextEditorButtonNames.h2,
        richTextEditorButtonNames.h3,
        richTextEditorButtonNames.h4,
        richTextEditorButtonNames.h5,
        richTextEditorButtonNames.image,
        richTextEditorButtonNames.infoBox,
        richTextEditorButtonNames.slideshow,
        richTextEditorButtonNames.newsReading,
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    relatedPosts: relationship({
      ref: 'Post.projects',
      label: '相關文章',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    projectCategories: relationship({
      many: true,
      label: '分類',
      ref: 'ProjectCategory.projects',
      ui: {
        hideCreate: true,
      },
    }),
    tags: relationship({
      ref: 'Tag.projects',
      label: '標籤',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    ogTitle: text({
      label: 'FB分享標題',
      validation: { isRequired: false },
    }),
    ogDescription: text({
      label: 'FB分享說明',
      validation: { isRequired: false },
    }),
    ogImage: relationship({
      ref: 'Photo',
      label: 'FB分享縮圖',
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
  access: () => true,
  ui: {
    label: 'Projects（專題）',
  },
})

export default listConfigurations
