import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    slug: text({
      isIndexed: 'unique',
      label: '英文名稱（用於網址）',
      validation: { isRequired: true },
    }),
    name: text({
      isIndexed: 'unique',
      label: '標籤中文名稱',
      validation: { isRequired: true },
    }),
    projects: relationship({
      label: '專題',
      ref: 'Project.tags',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    ogTitle: text({
      validation: { isRequired: false },
      label: 'FB分享標題',
    }),
    ogDescription: text({
      validation: { isRequired: false },
      label: 'FB分享說明',
    }),
    ogImage: relationship({
      ref: 'Photo',
      label: 'FB分享縮圖',
    }),
    posts: relationship({
      ref: 'Post.tags',
      many: true,
      label: '相關文章',
      ui: {
        hideCreate: true,
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
    operation: () => true,
  },
  ui: {
    label: 'Tags（標籤）',
  },
})
export default listConfigurations
