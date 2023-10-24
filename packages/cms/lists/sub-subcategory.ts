import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'

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
        itemView: {
          fieldMode: 'hidden',
        },
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
  ui: {
    label: 'Sub Subcategories（次次分類）',
    labelField: 'nameForCMS',
    singular: 'Sub Subcategory',
    plural: 'Sub Subcategories',
    listView: {
      initialColumns: ['slug', 'name'],
    },
  },
  access: {
    operation: {
      query: allowAllRoles(),
      create: allowRoles([
        RoleEnum.Owner,
        RoleEnum.Admin,
        RoleEnum.Editor,
        RoleEnum.Contributor,
      ]),
      update: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      delete: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    },
  },
})

export default listConfigurations
