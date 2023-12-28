import { graphql } from '@keystone-6/core'
import {
  json,
  virtual,
  relationship,
  RelationshipFieldConfig,
} from '@keystone-6/core/fields'
import { BaseListTypeInfo } from '@keystone-6/core/types'
import { RelationshipInfo } from '../views/relationship-order-editor'

const orderJsonSuffix = 'OrderJson'

export type OrderedRelationshipConfig = {
  fieldName: string
  relationshipConfig: RelationshipFieldConfig<BaseListTypeInfo>
  // refLabelField must be specified because it varies in difference lists,
  // ex: 'title' in Post list/'name' in Tag list
  refLabelField: string
}

// Create 3 fields for manual ordered relationship:
// 1. relationship field - for saving relationship
// 2. json field - for saving manual order
// 3. virtual field - for api query
const relationshipAndExtendedFields = ({
  fieldName,
  relationshipConfig,
}: {
  fieldName: string
  relationshipConfig: RelationshipFieldConfig<BaseListTypeInfo>
}) => {
  const relationshipField = fieldName
  const orderJSONField = `${relationshipField}${orderJsonSuffix}`
  const orderedRelationshipField = `${relationshipField}Ordered`
  const refList = relationshipConfig?.ref?.split('.')?.[0]

  if (!fieldName || !refList) {
    throw Error(`Invalid arguments! ${fieldName} ${refList}`)
  }

  return {
    [relationshipField]: relationship(relationshipConfig),
    [orderJSONField]: json({
      label: '排序',
      defaultValue: [],
      ui: {
        views: './lists/views/relationship-order-editor',
        createView: {
          fieldMode: 'edit',
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
          type: graphql.list(graphql.nonNull(lists[refList].types.output)),
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
          async resolve(item, args, context, info) {
            const list = info.parentType?.name

            // Query relationship & order to find target ids/ordered ids
            const source = await context.query[list].findOne({
              where: { id: item?.id?.toString() },
              query: `${orderJSONField} ${relationshipField} { id }`,
            })
            const order = source?.[orderJSONField]
            const relationships = source?.[relationshipField]
            const orderedIds = order?.map((item) => item?.id) ?? []
            const targetIds =
              relationships?.map((relationship: any) => {
                return relationship?.id
              }) ?? []

            // Query targets by ids
            const targets = await context.db?.[refList]?.findMany({
              where: { id: { in: targetIds } },
              take: args.take,
              skip: args.skip,
              orderBy: {
                publishedDate: 'desc',
              },
            })

            // Order targets
            const orderedTargets =
              orderedIds?.length > 0 && targets?.length > 0
                ? orderedIds.map((id: string) => {
                    return targets.find(
                      (target: any) => `${target?.id}` === `${id}`
                    )
                  })
                : targets

            return orderedTargets
          },
        }),
      ui: {
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
    }),
  }
}

type RelationshipInput =
  | {
      disconnect?: { id: string }[]
      connect?: { id: string }[]
    }
  | undefined

// Mutate order field when relationships change in list hook
const mutateOrderFieldHook = ({
  fieldName,
  relationshipConfig,
  refLabelField,
}: OrderedRelationshipConfig) => {
  const relationshipField = fieldName
  const orderJSONField = `${relationshipField}${orderJsonSuffix}`
  const refList = relationshipConfig?.ref?.split('.')?.[0]

  return async ({ inputData, item, resolvedData, context }) => {
    if (!refList) {
      console.error('Invalid ref list!')
      return
    }

    const relationships: RelationshipInput = inputData?.[relationshipField]
    let orderJSON: RelationshipInfo[] =
      inputData?.[orderJSONField] || item?.[orderJSONField] || []

    // Remove disconnected relationships from json
    const disconnect = relationships?.disconnect
    if (Array.isArray(disconnect) && disconnect.length > 0) {
      const ids = disconnect.map(({ id }) => id)
      orderJSON = orderJSON.filter((item) => !ids.includes(item?.id))
    }

    // Append connected relationships to end of json
    const connect = relationships?.connect
    if (Array.isArray(connect) && connect.length > 0) {
      const ids = connect.map(({ id }) => id)
      const items = await context.query[refList].findMany({
        where: { id: { in: ids } },
        query: `id ${refLabelField}`,
      })
      const newRelationships = items.map((item) => {
        return {
          id: item.id,
          label: item[refLabelField],
        }
      })
      orderJSON = [...orderJSON, ...newRelationships]
    }

    // Mutate order json field
    resolvedData[orderJSONField] = orderJSON
  }
}

export default { relationshipAndExtendedFields, mutateOrderFieldHook }
