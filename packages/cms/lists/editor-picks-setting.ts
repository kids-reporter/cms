import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'
import { list, group } from '@keystone-6/core'
import {
  relationship,
  text,
  timestamp,
  RelationshipFieldConfig,
} from '@keystone-6/core/fields'
import { BaseListTypeInfo } from '@keystone-6/core/types'
import {
  orderedRelationshipExtendedFields,
  orderedRelationshipMutationHook,
} from './utils/create-ordered-relationship'

const orderedRelationship: {
  fieldName: string
  relationshipConfig: RelationshipFieldConfig<BaseListTypeInfo>
  refLabelField: string
} = {
  fieldName: 'editorPicksOfPosts',
  relationshipConfig: {
    ref: 'Post',
    many: true,
  },
  refLabelField: 'title',
}

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
    ...group({
      label: '精選文章',
      description: '首頁按順序呈現精選文章5篇',
      fields: {
        [orderedRelationship.fieldName]: relationship(
          orderedRelationship.relationshipConfig
        ),
        ...orderedRelationshipExtendedFields(orderedRelationship),
      },
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
  hooks: {
    resolveInput: async ({ inputData, item, resolvedData, context }) => {
      await orderedRelationshipMutationHook(orderedRelationship)({
        inputData,
        item,
        resolvedData,
        context,
      })
      return resolvedData
    },
  },
})

export default listConfigurations
