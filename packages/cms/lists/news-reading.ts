import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'

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
    label: 'News-readings-groups',
    singular: 'News-readings-group',
    plural: 'News-readings-groups',
  },
  access: {
    operation: () => true,
  },
})

export { NewsReadingGroupItem, NewsReadingGroup }
