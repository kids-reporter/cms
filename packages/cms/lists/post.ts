import {
  customFields,
  richTextEditorButtonNames,
} from '@kids-reporter/cms-core'
import { graphql, list } from '@keystone-6/core'
import {
  virtual,
  relationship,
  timestamp,
  text,
  select,
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
    subSubcategories: relationship({
      ref: 'SubSubcategory.relatedPosts',
      label: '次次分類',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    authors: relationship({
      ref: 'Author.posts',
      many: true,
      label: '作者',
      ui: {
        hideCreate: true,
      },
    }),
    heroImage: relationship({
      label: '首圖',
      ref: 'Photo',
    }),
    heroCaption: text({
      label: '首圖圖說',
      validation: { isRequired: false },
    }),
    brief: customFields.richTextEditor({
      label: '前言',
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
        richTextEditorButtonNames.infoBox,
        richTextEditorButtonNames.slideshow,
      ],
    }),
    content: customFields.richTextEditor({
      label: '內文',
      disabledButtons: [
        richTextEditorButtonNames.h2,
        richTextEditorButtonNames.code,
        richTextEditorButtonNames.codeBlock,
      ],
    }),
    projects: relationship({
      label: '專題',
      ref: 'Project.relatedPosts',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    tags: relationship({
      ref: 'Tag.posts',
      many: true,
      label: '標籤',
    }),
    relatedPosts: relationship({
      ref: 'Post',
      many: true,
      label: '相關文章',
      ui: {
        hideCreate: true,
      },
    }),
    ogTitle: text({
      validation: { isRequired: false },
      label: 'FB分享標題',
    }),
    ogDescription: text({
      label: 'FB分享說明',
      validation: { isRequired: false },
    }),
    ogImage: relationship({
      label: 'FB分享縮圖',
      ref: 'Photo',
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
    preview: virtual({
      field: graphql.field({
        type: graphql.JSON,
        resolve(item: Record<string, unknown>): Record<string, string> {
          return {
            href: `https://dev-kids.twreporter.org/article/${item.slug}`,
            label: '文章預覽',
            buttonLabel: 'Preview',
          }
        },
      }),
      ui: {
        // A module path that is resolved from where `keystone start` is run
        views: './lists/views/link-button',
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
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
  hooks: {},
})
export default listConfigurations
