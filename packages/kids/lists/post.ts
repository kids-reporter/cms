import { customFields, utils } from '@kids-reporter/cms-core'
import { list } from '@keystone-6/core'
import {
  checkbox,
  integer,
  relationship,
  timestamp,
  text,
  select,
  json,
} from '@keystone-6/core/fields'


const listConfigurations = list({
  fields: {
    slug: text({
      validation: { isRequired: true },
      label: '網址名稱（英文）',
      isIndexed: 'unique',
    }),
    name: text({
      label: '標題',
      validation: { isRequired: true },
    }),
    subtitle: text({
      label: '副標',
      validation: { isRequired: false },
      db: {
        isNullable: true,
      },
    }),
    status: select({
      label: '狀態',
      options: [
        { label: 'draft', value: 'draft' },
        { label: 'published', value: 'published' },
        { label: 'scheduled', value: 'scheduled' },
        { label: 'archived', value: 'archived' },
        { label: 'invisible', value: 'invisible' },
      ],
      defaultValue: 'draft',
      isIndexed: true,
    }),
    publishedDate: timestamp({
      isIndexed: true,
      label: '發佈日期',
    }),
    //categories: relationship({
    //  ref: 'Category',
    //  label: '分類',
    //  many: true,
    //}),
    writers: relationship({
      ref: 'Author.posts',
      many: true,
      label: '作者',
    }),
    manualOrderOfWriters: json({
      label: '作者手動排序結果',
    }),
    photographers: relationship({
      many: true,
      label: '攝影',
      ref: 'Author',
    }),
    manualOrderOfPhotographers: json({
      label: '攝影手動排序結果',
    }),
    editors: relationship({
      label: '責任編輯',
      many: true,
      ref: 'Author',
    }),
    manualOrderOfEditors: json({
      label: '影音手動排序結果',
    }),
    designers: relationship({
      label: '設計',
      many: true,
      ref: 'Author',
    }),
    manualOrderOfDesigners: json({
      label: '設計手動排序結果',
    }),
    engineers: relationship({
      many: true,
      label: '工程',
      ref: 'Author',
    }),
    manualOrderOfEngineers: json({
      label: '工程手動排序結果',
    }),
    reviewers: relationship({
      many: true,
      label: '核稿',
      ref: 'Author',
    }),
    manualOrderOfReviewers: json({
      label: '工程手動排序結果',
    }),
    otherByline: text({
      validation: { isRequired: false },
      label: '作者（其他）',
      db: {
        isNullable: true,
      },
    }),
    //heroVideo: relationship({
    //  label: 'Leading Video',
    //  ref: 'Video',
    //}),
    heroImage: relationship({
      label: '首圖',
      ref: 'Photo',
    }),
    heroCaption: text({
      label: '首圖圖說',
      validation: { isRequired: false },
      db: {
        isNullable: true,
      },
    }),
    heroImageSize: select({
      label: '首圖尺寸',
      options: [
        { label: 'extend', value: 'extend' },
        { label: 'normal', value: 'normal' },
        { label: 'small', value: 'small' },
      ],
      defaultValue: 'normal',
    }),
    brief: customFields.richTextEditor({
      label: '前言',
      disabledButtons: [],
    }),
    content: customFields.richTextEditor({
      label: '內文',
      disabledButtons: [],
    }),
    //projects: relationship({
    //  label: '專題',
    //  ref: 'Project.posts',
    //}),
    //tags: relationship({
    //  ref: 'Tag.posts',
    //  many: true,
    //  label: '標籤',
    //}),
    readingTime: integer({
      label: '閱讀時間',
    }),
    relatedPosts: relationship({
      ref: 'Post',
      many: true,
      label: '相關文章',
    }),
    manualOrderOfRelatedPosts: json({
      label: '相關文章手動排序結果',
    }),
    ogTitle: text({
      validation: { isRequired: false },
      label: 'FB分享標題',
      db: {
        isNullable: true,
      },
    }),
    ogDescription: text({
      label: 'FB分享說明',
      validation: { isRequired: false },
      db: {
        isNullable: true,
      },
    }),
    ogImage: relationship({
      label: 'FB分享縮圖',
      ref: 'Photo',
    }),
    createdAt: timestamp(),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    })
  },
  ui: {
    labelField: 'slug',
    listView: {
      initialColumns: ['id', 'slug', 'status'],
      initialSort: { field: 'publishedDate', direction: 'DESC' },
      pageSize: 50,
    },
  },
  access: {
    operation: {
      query: () => true,
      update: () => true,
      create: () => true,
      delete: () => true,
    },
  },
  hooks: {
  },
})
export default utils.addManualOrderRelationshipFields(
  [
    {
      fieldName: 'manualOrderOfWriters',
      targetFieldName: 'writers',
      targetListName: 'Author',
      targetListLabelField: 'name',
    },
    {
      fieldName: 'manualOrderOfPhotographers',
      targetFieldName: 'photographers',
      targetListName: 'Author',
      targetListLabelField: 'name',
    },
    {
      fieldName: 'manualOrderOfDesigners',
      targetFieldName: 'designers',
      targetListName: 'Author',
      targetListLabelField: 'name',
    },
    {
      fieldName: 'manualOrderOfEngineers',
      targetFieldName: 'engineers',
      targetListName: 'Author',
      targetListLabelField: 'name',
    },
    {
      fieldName: 'manualOrderOfReviewers',
      targetFieldName: 'reviewers',
      targetListName: 'Author',
      targetListLabelField: 'name',
    },
    {
      fieldName: 'manualOrderOfEditors',
      targetFieldName: 'editors',
      targetListName: 'Author',
      targetListLabelField: 'name',
    },
    {
      fieldName: 'manualOrderOfRelatedPosts',
      targetFieldName: 'relatedPosts',
      targetListName: 'Post',
      targetListLabelField: 'name',
    },
  ],
 listConfigurations
)
