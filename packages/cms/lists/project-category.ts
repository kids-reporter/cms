import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'
import { slugConfig } from './config'

const listConfigurations = list({
  fields: {
    slug: slugConfig,
    name: text({
      isIndexed: 'unique',
      label: '類別中文名稱',
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
      label: 'og:title',
      validation: { isRequired: false },
    }),
    ogDescription: text({
      label: 'og:description',
      validation: { isRequired: false },
    }),
    ogImage: relationship({
      label: 'og:image',
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
  ui: {
    label: 'Topics Categories',
    listView: {
      initialColumns: ['slug', 'name'],
    },
  },
})

export default listConfigurations
