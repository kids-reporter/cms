import { virtual, relationship, text } from '@keystone-6/core/fields'
import { graphql } from '@keystone-6/core'

// TODO: change parameter to relationship type
export const createOrderedRelationship = (config: {
  name: string
  ref: string
  label: string
}) => {
  const relationshipField = config.name
  const orderField = `${relationshipField}_order`
  const orderedRelationshipField = `${relationshipField}_ordered`
  const targetType = config.ref // TODO: handle 2-sided ref

  return {
    [relationshipField]: relationship({
      ref: targetType,
      many: true,
      label: config.label,
      ui: {
        // views: './lists/views/ordered-relationship',
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        hideCreate: true,
      },
    }),
    [orderField]: text({
      label: orderField,
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'edit',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
      /* TODO: hide this field from api if possible
        graphql: {
          omit: {
            read: true,
            create: true,
            update: true,
          },
        },
        */
    }),
    [orderedRelationshipField]: virtual({
      field: (lists) =>
        graphql.field({
          type: graphql.list(graphql.nonNull(lists[targetType].types.output)),
          async resolve(item, args, context, info) {
            const sourceType = info.parentType?.name
            const source = await context.query[sourceType].findOne({
              where: { id: item.id.toString() },
              query: `${orderField} ${relationshipField} { id }`,
            })
            const relationships = source[relationshipField]
            const ids = relationships.map((relationship) => {
              return relationship.id
            })
            const targets = await context.query[targetType].findMany({
              where: { id: { in: ids } },
              query: 'id', // TODO: handle arguments
            })
            const orderedIds = source[orderField]
              ? source[orderField]?.split(',')
              : [] // TODO: error handling for empty orderFieldName
            const orderedTargets =
              orderedIds?.length > 0
                ? orderedIds.map((id: string) => {
                    return targets.find((target) => target.id === id)
                  })
                : targets
            return orderedTargets
          },
        }),
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
    }),
  }
}
