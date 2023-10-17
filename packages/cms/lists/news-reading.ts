import { list } from '@keystone-6/core'
import { integer, relationship, text, timestamp } from '@keystone-6/core/fields'

const NewsReadingGroupItem = list({
  fields: {
    name: text({
      label: '語言類別',
      validation: { isRequired: true },
    }),
    embedCode: text({
      label: 'Sopotify Iframe Embed Code',
      validation: { isRequired: true },
      ui: { displayMode: 'textarea' },
    }),
    order: integer({
      label: '排序（由小至大排列）',
      hooks: {
        resolveInput: ({ operation, resolvedData, fieldKey }) => {
          const itemOrder = [
            '中文',
            '烏克蘭語',
            '俄語',
            '英語',
            '日語',
            '印尼語',
            '泰語',
            '越語',
            '菲律賓語',
            '台語',
            '客語',
            '粵語',
            '法語',
          ]
          if (
            // `order` field is not specified
            resolvedData[fieldKey] === undefined &&
            // create a new item
            (operation === 'create' ||
              // update old item's `name` field
              (operation === 'update' && resolvedData['name'] !== undefined))
          ) {
            const itemName = resolvedData['name']
            const idx = itemOrder.indexOf(itemName)
            return idx + 1
          }
          return resolvedData[fieldKey]
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
  ui: {
    isHidden: true,
    hideCreate: true,
    label: 'News-reading-group-item',
    singular: 'News-reading-group-item',
    plural: 'News-reading-group-items',
  },
  access: {
    operation: () => true,
  },
})

const NewsReadingGroup = list({
  fields: {
    name: text({
      isIndexed: true,
      label: '讀報主題',
      validation: { isRequired: true },
    }),
    items: relationship({
      label: '語言類別',
      ref: 'NewsReadingGroupItem',
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
  ui: {
    label: 'News Readings Groups（讀報）',
    singular: 'News Readings Group',
    plural: 'News Readings Groups',
  },
  access: {
    operation: () => true,
  },
})

export { NewsReadingGroupItem, NewsReadingGroup }
