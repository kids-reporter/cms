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
      label: '類別中文名稱',
      validation: { isRequired: true },
    }),
    projects: relationship({
      label: '專題',
      ref: 'Project.projectCategories',
      many: true,
      ui: {
        hideCreate: true,
        itemView: {
          fieldMode: 'hidden',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    heroImage: relationship({
      label: '列表頁首圖',
      ref: 'Photo',
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
  },
  access: {
    operation: () => true,
  },
  ui: {
    label: 'Project Categories（專題分類）',
    listView: {
      initialColumns: ['slug', 'name'],
    },
  },
})

export default listConfigurations
