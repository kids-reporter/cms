import { list } from '@keystone-6/core'
import { relationship, select, text, timestamp } from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    slug: text({
      isIndexed: 'unique',
      label: '英文名稱（用於網址）',
      validation: { isRequired: true },
    }),
    name: text({
      label: '次次類別中文名稱',
      validation: { isRequired: true },
    }),
    nameForCMS: text({
      isIndexed: 'unique',
      label: '次次類別中文名稱（使用於 CMS）',
      validation: { isRequired: true },
    }),
    status: select({
      options: [
        { label: 'inactive', value: 'inactive' },
        { label: 'active', value: 'active' },
      ],
    }),
    subcategory: relationship({
      ref: 'Subcategory.subSubcategory',
      many: false,
      ui: {
        hideCreate: true,
      },
    }),
    relatedPost: relationship({
      ref: 'Post.subSubcategories',
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
  ui: {
    label: 'Sub-subcategories',
    labelField: 'nameForCMS',
    singular: 'Sub-subcategory',
    plural: 'Sub-subcategories',
  },
  access: {
    operation: () => true,
  },
})

export default listConfigurations
