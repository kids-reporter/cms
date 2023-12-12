import { group, graphql } from '@keystone-6/core'
import { virtual, relationship, text } from '@keystone-6/core/fields'

// TODO: change parameter to relationship type for type check
export const createOrderedRelationship = (config: {
  name: string
  ref: string
  label: string
  many: boolean
}) => {
  const relationshipField = config.name
  const orderField = `${relationshipField}_order`
  const orderedRelationshipField = `${relationshipField}_ordered`
  const targetType = config.ref // TODO: handle 2-sided ref

  return group({
    label: config.label,
    description: '選取與排序',
    fields: {
      [relationshipField]: relationship({
        ref: targetType,
        many: true,
        label: '選取',
        ui: {
          // views: './lists/views/ordered-relationship',
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'edit' },
          listView: { fieldMode: 'hidden' },
          hideCreate: true,
        },
        /*
        hooks: {
            // TODO: add hook to modify order field when add/delete
        }
        */
      }),
      [orderField]: text({
        label: '排序',
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

              // Query relationship & order to find target ids/ordered ids
              let targetIds, orderedIds
              try {
                const source = await context.query[sourceType].findOne({
                  where: { id: item.id.toString() },
                  query: `${orderField} ${relationshipField} { id }`,
                })
                const order = source?.[orderField]
                const relationships = source?.[relationshipField]
                orderedIds = order ? order?.split(',') : [] // TODO: error handling for empty orderFieldName
                targetIds = relationships?.map((relationship) => {
                  return relationship.id
                })
              } catch (err) {
                console.error(err)
              }

              // Query targets by ids
              let targets
              try {
                targets = await context.query[targetType].findMany({
                  where: { id: { in: targetIds } },
                  query: 'id', // TODO: handle arguments
                })
              } catch (err) {
                console.error(err)
              }

              // Order targets
              const orderedTargets =
                orderedIds?.length > 0
                  ? orderedIds.map((id: string) => {
                      return targets?.find((target) => target.id === id)
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
    },
  })
}
