import envVars from '../environment-variables'
import {
  customFields,
  richTextEditorButtonNames,
} from '@kids-reporter/cms-core'
import { graphql, list } from '@keystone-6/core'
import {
  json,
  virtual,
  relationship,
  timestamp,
  text,
  select,
} from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'

const listConfigurations = list({
  fields: {
    title: text({
      label: '標題',
      validation: { isRequired: true },
      isIndexed: true,
    }),
    slug: text({
      validation: { isRequired: true },
      label: '網址名稱（英文）',
      isIndexed: 'unique',
    }),
    subtitle: text({
      label: '副標',
      validation: { isRequired: false },
    }),
    status: select({
      label: '狀態',
      options: [
        { label: 'draft', value: 'draft' },
        { label: 'published', value: 'published' },
        { label: 'scheduled', value: 'scheduled' },
        { label: 'archived', value: 'archived' },
        { label: 'invisible', value: 'invisible' },
      ],
      defaultValue: 'draft',
      isIndexed: true,
    }),
    publishedDate: timestamp({
      isIndexed: true,
      label: '發布時間',
    }),
    themeColor: select({
      label: '主題色',
      options: [
        { label: '藍色', value: 'blue' },
        { label: '紅色', value: 'red' },
        { label: '黃色', value: 'yellow' },
      ],
      defaultValue: 'blue',
    }),
    mainProject: relationship({
      label: '文章所屬的主要專題（選擇後，文章最頂端會有該專題的按鈕）',
      ref: 'Project',
      many: false,
      ui: {
        hideCreate: true,
      },
    }),
    subSubcategories: relationship({
      ref: 'SubSubcategory.relatedPosts',
      label: '次次分類',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    authors: relationship({
      ref: 'Author.posts',
      many: true,
      label: '作者',
      ui: {
        hideCreate: true,
      },
    }),
    authorsJSON: json({
      label: '作者列',
      defaultValue: [],
      ui: {
        views: './lists/views/authorsJSON-editor',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
    heroImage: relationship({
      label: '首圖',
      ref: 'Photo',
    }),
    heroCaption: text({
      label: '首圖圖說',
      validation: { isRequired: false },
    }),
    newsReadingGroup: relationship({
      label: '讀報',
      ref: 'NewsReadingGroup',
      many: false,
    }),
    brief: customFields.richTextEditor({
      label: '前言',
      disabledButtons: [
        richTextEditorButtonNames.blockquote,
        richTextEditorButtonNames.code,
        richTextEditorButtonNames.codeBlock,
        richTextEditorButtonNames.embed,
        richTextEditorButtonNames.h2,
        richTextEditorButtonNames.h3,
        richTextEditorButtonNames.h4,
        richTextEditorButtonNames.h5,
        richTextEditorButtonNames.image,
        richTextEditorButtonNames.infoBox,
        richTextEditorButtonNames.slideshow,
        richTextEditorButtonNames.newsReading,
        richTextEditorButtonNames.divider,
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    content: customFields.richTextEditor({
      label: '內文',
      disabledButtons: [
        richTextEditorButtonNames.h2,
        richTextEditorButtonNames.code,
        richTextEditorButtonNames.codeBlock,
        richTextEditorButtonNames.newsReading,
      ],
      ui: {
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    projects: relationship({
      label: '專題',
      ref: 'Project.relatedPosts',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    tags: relationship({
      ref: 'Tag.posts',
      many: true,
      label: '標籤',
    }),
    relatedPosts: relationship({
      ref: 'Post',
      many: true,
      label: '相關文章',
      ui: {
        hideCreate: true,
      },
    }),
    ogTitle: text({
      validation: { isRequired: false },
      label: 'FB分享標題',
    }),
    ogDescription: text({
      label: 'FB分享說明',
      validation: { isRequired: false },
    }),
    ogImage: relationship({
      label: 'FB分享縮圖',
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
    preview: virtual({
      field: graphql.field({
        type: graphql.JSON,
        resolve(item: Record<string, unknown>): Record<string, string> {
          return {
            href: `${envVars.previewServerOrigin}/article/${item.slug}`,
            label: '文章預覽',
            buttonLabel: 'Preview',
          }
        },
      }),
      ui: {
        // A module path that is resolved from where `keystone start` is run
        views: './lists/views/link-button',
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldPosition: 'sidebar',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
  },
  ui: {
    label: 'Posts（文章）',
    labelField: 'title',
    listView: {
      initialColumns: ['title', 'slug', 'status'],
      initialSort: { field: 'publishedDate', direction: 'DESC' },
      pageSize: 50,
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
    filter: {
      query: ({ session }) => {
        if (session?.data?.role === RoleEnum.FrontendHeadlessAccount) {
          return { status: { equals: 'published' } }
        }
        return {}
      },
    },
  },
  hooks: {
    resolveInput: async ({ inputData, item, resolvedData, context }) => {
      let authorsJSON: AuthorsJSON =
        inputData?.authorsJSON || item?.authorsJSON || []
      authorsJSON = resolveAuthorsJSON(authorsJSON)

      // `authors` is a relationship field.
      // Therefore, `authors` only store author id
      const relationshipAuthors: RelationshipInput = inputData?.authors
      if (relationshipAuthors) {
        const disconnect = relationshipAuthors?.disconnect
        // delete disconnected authors from `authorsJSON`
        if (Array.isArray(disconnect) && disconnect.length > 0) {
          disconnect.forEach(({ id }) => {
            authorsJSON = authorsJSON.filter((item) => {
              // if `item.id` is not existed,
              // which means it is manually added by users,
              // and then we don't filter this item out.
              if (!item.id) {
                return true
              }
              // filter out disconnected item
              return item.id !== id
            })
          })
        }

        // add new connected authors into `authorsJSON`
        const connect = relationshipAuthors?.connect
        if (Array.isArray(connect) && connect.length > 0) {
          const ids = connect.map(({ id }) => id)
          // find author items via gql query
          const items = await context.query.Author.findMany({
            where: { id: { in: ids } },
            query: 'id name',
          })
          items.forEach((item) => {
            authorsJSON.push({
              id: item.id,
              name: item.name,
              type: 'link',
              role: heuristicallyPickRole(item.name),
            })
          })
        }
      }

      resolvedData.authorsJSON = authorsJSON
      return resolvedData
    },
  },
})

/**
 * This function is used to resolve field `authorsJSON`.
 * It filters out invalid data and
 * adds missing properties, such as `type`.
 */
function resolveAuthorsJSON(authorsJSON: AuthorsJSON): AuthorsJSON {
  return authorsJSON
    .filter(
      (item) =>
        typeof item === 'object' &&
        typeof item.name === 'string' &&
        typeof item.role === 'string'
    )
    .map((item) => {
      if (item.id) {
        item.type = 'link'
      } else {
        item.type = 'string'
      }
      return item
    })
}

function heuristicallyPickRole(authorName: string): string {
  switch (authorName) {
    case '陳韻如': {
      return '責任編輯'
    }
    case '邱紹雯':
    case '楊惠君': {
      return '核稿'
    }
    case '王家琛':
    case '黃禹禛':
    case '鄭涵文': {
      return '設計'
    }
    default:
      return '文字'
  }
}

type AuthorsJSON = {
  id?: string
  name: string
  type?: 'link' | 'string'
  role: string
}[]

type RelationshipInput =
  | {
      disconnect?: { id: string }[]
      connect?: { id: string }[]
    }
  | undefined

export default listConfigurations
