import { group, graphql } from '@keystone-6/core'
import { relationship, json, virtual } from '@keystone-6/core/fields'

/*
type RelationshipJSON = {
  id?: string
  name: string
  title: string
  slug: string
}[]

type RelationshipInput =
  | {
      disconnect?: { id: string }[]
      connect?: { id: string }[]
    }
  | undefined

  function resolveAuthorsJSON(relationshipJSON: RelationshipJSON): RelationshipJSON {
    return relationshipJSON
      .filter(
        (item) =>
          typeof item === 'object' &&
          typeof item.name === 'string'
      )
  }
*/

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
        label: '',
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'edit' },
          listView: { fieldMode: 'hidden' },
          hideCreate: true,
        },
        /*
        hooks: {
          resolveInput: async ({ inputData, item, resolvedData, context }) => {
            let authorsJSON: RelationshipJSON =
              inputData?.authorsJSON || item?.authorsJSON || []
            authorsJSON = resolveAuthorsJSON(authorsJSON)

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
        */
      }),
      [orderField]: json({
        label: '順序',
        defaultValue: [],
        ui: {
          views: './lists/views/ordered-relationship',
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
      }),
      [orderedRelationshipField]: virtual({
        field: (lists) =>
          graphql.field({
            type: graphql.list(graphql.nonNull(lists[targetType].types.output)),
            async resolve(item, args, context, info) {
              // TODO: error handling
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
                targets = await context.db?.[targetType]?.findMany({
                  where: { id: { in: targetIds } },
                })
              } catch (err) {
                console.error(err)
              }

              // Order targets
              const orderedTargets =
                orderedIds?.length > 0 && targets?.length > 0
                  ? orderedIds.map((id: string) => {
                      return targets.find(
                        (target) => `${target.id}` === `${id}`
                      )
                    })
                  : []

              return orderedTargets
            },
          }),
        ui: {
          itemView: { fieldMode: 'hidden' },
          listView: { fieldMode: 'hidden' },
        },
      }),
    },
  })
}
