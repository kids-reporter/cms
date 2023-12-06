import { virtual, relationship, text } from '@keystone-6/core/fields'
import { graphql } from '@keystone-6/core'

export const createOrderedRelationship = (config: {
  name: string
  ref: string
  label: string
}) => {
  const fieldName = config.name
  const relationshipFieldName = `${fieldName}`
  const orderFieldName = `${fieldName}_orderedRelationship_order`
  const orderedRelationshipField = `${fieldName}_ordered`
  return {
    [relationshipFieldName]: relationship({
      ref: config.ref,
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
    [orderFieldName]: text({
      label: orderFieldName,
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
          type: graphql.list(graphql.nonNull(lists.Author.types.output)),
          async resolve(item, args, context, info) {
            console.log(info.parentType?.name)
            // console.log(item, args, context, info)
            const source = await context.query.Post.findOne({
              // TODO: replace Post
              where: { id: item.id.toString() },
              query: `${orderFieldName} ${relationshipFieldName} { id name }`,
            })
            const relationships = source[relationshipFieldName]
            const ids = relationships.map((relationship) => {
              return relationship.id
            })
            const targets = await context.query.Author.findMany({
              // TODO: replace Author
              where: { id: { in: ids } },
              query: 'id name email', // TODO: handle arguments
            })
            const orderedIds = source[orderFieldName]
              ? source[orderFieldName]?.split(',')
              : [] // TODO: error handling for empty orderFieldName
            const orderedTargets = orderedIds
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
