import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'
import { graphql, list } from '@keystone-6/core'
import {
  virtual,
  relationship,
  text,
  timestamp,
  select,
} from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    slug: text({
      isIndexed: 'unique',
      label: 'Slug',
      validation: {
        isRequired: true,
        match: {
          regex: /^[a-z0-9-]+$/,
          explanation: '請輸入正確格式，僅能使用小寫英文、數字和符號(-)',
        },
      },
    }),
    name: text({
      isIndexed: 'unique',
      label: '類別中文名稱',
      validation: { isRequired: true },
    }),
    subcategories: relationship({
      ref: 'Subcategory.category',
      many: true,
      ui: {
        hideCreate: true,
      },
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
    relatedPosts: virtual({
      field: (lists) =>
        graphql.field({
          type: graphql.list(lists.Post.types.output),
          args: {
            take: graphql.arg({
              type: graphql.nonNull(graphql.Int),
              defaultValue: 12,
            }),
            skip: graphql.arg({
              type: graphql.nonNull(graphql.Int),
              defaultValue: 0,
            }),
          },
          async resolve(item: Record<string, any>, args, context) {
            // category id
            const itemId = item?.id

            // find category item via GQL query
            const category = await context.query.Category.findOne({
              where: { id: itemId },
              query: 'subcategories { subSubcategories { id slug } }',
            })

            // collect all subSubcategory ids under a category
            const subSubcategoryIds = collectSubSubcategoryIds(
              category as CategroyItem
            )

            if (subSubcategoryIds.length === 0) {
              return []
            }

            // find published posts with
            // at least one specified subSubcategory
            const posts = await context.prisma.Post.findMany({
              where: {
                OR: [{ status: 'published' }, { status: 'archived' }],
                subSubcategories: {
                  some: {
                    id: {
                      in: subSubcategoryIds,
                    },
                  },
                },
              },
              take: args.take,
              skip: args.skip,
              orderBy: {
                publishedDate: 'desc',
              },
            })
            return posts
          },
        }),
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    relatedPostsCount: virtual({
      field: () =>
        graphql.field({
          type: graphql.Int,
          async resolve(item: Record<string, any>, args, context) {
            // category id
            const itemId = item?.id

            // find category item via GQL query
            const category = await context.query.Category.findOne({
              where: { id: itemId },
              query: 'subcategories { subSubcategories { id slug } }',
            })

            // collect all subSubcategory ids under a category
            const subSubcategoryIds = collectSubSubcategoryIds(
              category as CategroyItem
            )

            if (subSubcategoryIds.length === 0) {
              return 0
            }

            // find published posts with
            // at least one specified subSubcategory
            const count = await context.prisma.Post.count({
              where: {
                OR: [{ status: 'published' }, { status: 'archived' }],
                subSubcategories: {
                  some: {
                    id: {
                      in: subSubcategoryIds,
                    },
                  },
                },
              },
            })
            return count
          },
        }),
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
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
    label: 'Categories',
    listView: {
      initialColumns: ['slug', 'name'],
    },
  },
})

type CategroyItem = {
  subcategories: {
    subSubcategories: {
      id: string
      slug: string
    }[]
  }[]
}

function collectSubSubcategoryIds(category: CategroyItem): number[] {
  const ids = []
  const subcategories = category?.subcategories || []
  for (const subcategory of subcategories) {
    const subSubcategories = subcategory.subSubcategories || []
    for (const subSubcategory of subSubcategories) {
      if (subSubcategory?.id) {
        const id = parseInt(subSubcategory.id)
        ids.push(id)
      }
    }
  }
  return ids
}

export default listConfigurations
