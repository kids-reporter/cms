import { list } from '@keystone-6/core'
import { timestamp, text, file } from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    name: text({
      label: '標題',
      validation: { isRequired: true },
    }),
    file: file({
      label: '檔案',
      storage: 'files',
    }),
    description: text({
      label: '描述',
      ui: {
        displayMode: 'textarea',
      },
    }),
    createdAt: timestamp(),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    })
  },

  access: {
    operation: () => true,
  },

  hooks: {},
})

export default listConfigurations
