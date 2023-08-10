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
      label: '次類別中文名稱',
      validation: { isRequired: true },
    }),
    nameForCMS: text({
      isIndexed: 'unique',
      label: '次類別中文名稱（使用於 CMS）',
      validation: { isRequired: true },
    }),
    status: select({
      options: [
        { label: 'inactive', value: 'inactive' },
        { label: 'active', value: 'active' },
      ],
    }),
    category: relationship({
      ref: 'Category.subcategories',
      many: false,
      ui: {
        hideCreate: true,
      },
    }),
    subSubcategories: relationship({
      ref: 'SubSubcategory.subcategory',
      many: true,
      ui: {
        hideCreate: true,
      },
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
