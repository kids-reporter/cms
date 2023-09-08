import { graphql, list } from '@keystone-6/core'
import {
  virtual,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    slug: text({
      isIndexed: 'unique',
      label: '英文名稱（用於網址）',
      validation: { isRequired: true },
    }),
    title: text({
      isIndexed: 'unique',
      label: '類別中文名稱',
      validation: { isRequired: true },
    }),
    name: text({
      isIndexed: 'unique',
      label: '類別中文名稱',
      validation: { isRequired: true },
    }),
    status: select({
      options: [
        { label: 'inactive', value: 'inactive' },
        { label: 'active', value: 'active' },
      ],
    }),
    subcategories: relationship({
      ref: 'Subcategory.category',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    projects: relationship({
      label: '專題',
      ref: 'Project.categories',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    heroImage: relationship({
      label: '列表頁首圖',
      ref: 'Photo',
    }),
    ogTitle: text({
      label: 'FB分享標題',
      validation: { isRequired: false },
    }),
    ogDescription: text({
      label: 'FB分享說明',
      validation: { isRequired: false },
    }),
    ogImage: relationship({
      label: 'FB分享縮圖',
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
    operation: () => true,
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
