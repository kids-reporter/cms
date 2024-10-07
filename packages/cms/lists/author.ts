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
      isIndexed: true,
      label: '作者姓名',
      validation: { isRequired: true },
    }),
    email: text(),
    bio: text({
      label: '簡介',
    }),
    avatar: relationship({
      ref: 'Photo',
      many: false,
      label: '大頭照',
    }),
    image: relationship({
      label: 'og:image',
      ref: 'Photo',
    }),
    posts: relationship({
      ref: 'Post.authors',
      many: true,
      label: '相關文章',
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
    label: 'Authors',
  },
})
export default listConfigurations
