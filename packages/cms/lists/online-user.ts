import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import { allowAllRoles } from './utils/access-control-list'

const listConfigurations = list({
  fields: {
    user: relationship({
      ref: 'User',
      many: false,
    }),
    canonicalPath: text({
      isIndexed: true,
    }),
    lastOnlineAt: timestamp({
      isIndexed: true,
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
      create: allowAllRoles(),
      update: allowAllRoles(),
      delete: allowAllRoles(),
    },
  },
  ui: {
    label: 'Online Users',
    isHidden: true,
    hideCreate: true,
    createView: {
      defaultFieldMode: 'hidden',
    },
    itemView: {
      defaultFieldMode: 'read',
    },
    listView: {
      defaultFieldMode: 'read',
      initialColumns: [],
      initialSort: {
        field: 'id',
        direction: 'DESC',
      },
    },
  },
  db: {
    idField: {
      kind: 'cuid',
    },
  },
})
export default listConfigurations
