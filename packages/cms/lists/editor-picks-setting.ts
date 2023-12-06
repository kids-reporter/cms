import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'
import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import { createOrderedRelationship } from './utils/create-ordered-relationship'

const listConfigurations = list({
  fields: {
    name: text({
      isIndexed: 'unique',
      label: '設定適用範圍（英文）',
      validation: { isRequired: true },
      access: {
        update: () => false,
      },
    }),
    nameForCMS: text({
      label: '設定適用範圍（中文）',
      validation: { isRequired: true },
    }),
    ...createOrderedRelationship({
      name: 'editorPicksOfPosts2',
      ref: 'Post',
      label: '精選文章(可排序)',
    }),
    editorPicksOfPosts: relationship({
      label: '精選文章',
      ref: 'Post',
      many: true,
    }),
    editorPicksOfProjects: relationship({
      label: '精選專題',
      ref: 'Project',
      many: true,
    }),
    editorPicksOfTags: relationship({
      label: '精選標籤',
      ref: 'Tag',
      many: true,
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
      create: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      update: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      delete: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    },
  },
  ui: {
    label: 'Editor Picks（精選設定）',
    singular: 'Editor Pick',
    plural: 'Editor Picks',
    listView: {
      initialColumns: ['nameForCMS', 'name'],
    },
  },
})

export default listConfigurations
