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
      label: 'Slug',
      validation: { isRequired: true },
    }),
    name: text({
      isIndexed: 'unique',
      label: '標籤名稱',
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
      label: 'og:title',
    }),
    ogDescription: text({
      validation: { isRequired: false },
      label: 'og:description',
    }),
    ogImage: relationship({
      ref: 'Photo',
      label: 'og:image',
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
    label: 'Tags',
  },
})
export default listConfigurations
