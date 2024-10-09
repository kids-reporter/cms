import { graphql, list } from '@keystone-6/core'
import { virtual, relationship, text, timestamp } from '@keystone-6/core/fields'
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
      label: '次類別中文名稱',
      validation: { isRequired: true },
    }),
    nameForCMS: text({
      isIndexed: 'unique',
      label: '次類別中文名稱（使用於 CMS）',
      validation: { isRequired: true },
    }),
    category: relationship({
      ref: 'Category.subcategories',
      many: false,
      ui: {
        hideCreate: true,
      },
    }),
    subSubcategories: relationship({
      ref: 'SubSubcategory.subcategory',
      many: true,
      ui: {
        hideCreate: true,
      },
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
            // subcategory id
            const itemId = item?.id

            // find subcategory item via GQL query
            const category = await context.query.Subcategory.findOne({
              where: { id: itemId },
              query: 'subSubcategories { id slug }',
            })

            // collect all subSubcategory ids under a category
            const subSubcategoryIds = collectSubSubcategoryIds(
              category as SubcategoryItem
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
            // subcategory id
            const itemId = item?.id

            // find subcategory item via GQL query
            const category = await context.query.Subcategory.findOne({
              where: { id: itemId },
              query: 'subSubcategories { id slug }',
            })

            // collect all subSubcategory ids under a category
            const subSubcategoryIds = collectSubSubcategoryIds(
              category as SubcategoryItem
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
    label: 'Subcategories',
    listView: {
      initialColumns: ['slug', 'name'],
    },
  },
})

type SubcategoryItem = {
  subSubcategories: {
    id: string
    slug: string
  }[]
}

function collectSubSubcategoryIds(subcategory: SubcategoryItem): number[] {
  const ids = []
  const subSubcategories = subcategory.subSubcategories || []
  for (const subSubcategory of subSubcategories) {
    if (subSubcategory?.id) {
      const id = parseInt(subSubcategory.id)
      ids.push(id)
    }
  }
  return ids
}

export default listConfigurations
