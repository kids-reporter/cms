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
      label: '次次類別中文名稱',
      validation: { isRequired: true },
    }),
    nameForCMS: text({
      isIndexed: 'unique',
      label: '次次類別中文名稱（使用於 CMS）',
      validation: { isRequired: true },
    }),
    subcategory: relationship({
      ref: 'Subcategory.subSubcategories',
      many: false,
      ui: {
        hideCreate: true,
      },
    }),
    relatedPosts: relationship({
      label: '相關文章',
      ref: 'Post.subSubcategories',
      many: true,
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
  ui: {
    label: 'Sub-subcategories',
    labelField: 'nameForCMS',
    singular: 'Sub-subcategory',
    plural: 'Sub-subcategories',
    listView: {
      initialColumns: ['slug', 'name'],
    },
  },
  access: {
    operation: () => true,
  },
})

export default listConfigurations
