import { list } from '@keystone-6/core'
import { relationship, select, text, timestamp } from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    slug: text({
      isIndexed: 'unique',
      label: '英文名稱（用於網址）',
      validation: { isRequired: true },
    }),
    title: text({
      isIndexed: 'unique',
      label: '類別中文名稱',
      validation: { isRequired: true },
    }),
    status: select({
      options: [
        { label: 'inactive', value: 'inactive' },
        { label: 'active', value: 'active' },
      ],
    }),
    subcategories: relationship({
      ref: 'Subcategory.category',
      many: true,
      ui: {
        hideCreate: true,
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
    createdAt: timestamp(),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
  },
  access: {
    operation: () => true,
  },
})
export default listConfigurations
