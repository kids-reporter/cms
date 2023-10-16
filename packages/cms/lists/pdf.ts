import { list } from '@keystone-6/core'
import { timestamp, text, file } from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    name: text({
      label: '標題',
      validation: { isRequired: true },
      isIndexed: true,
    }),
    file: file({
      label: '上傳 PDF 檔案',
      storage: 'files',
    }),
    description: text({
      label: '檔案說明',
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
  ui: {
    label: 'PDF',
    singular: 'PDF',
    plural: 'PDFs',
    listView: {
      initialColumns: ['name', 'description'],
      initialSort: { field: 'updatedAt', direction: 'ASC' },
      pageSize: 50,
    },
    path: 'pdf',
  },

  hooks: {},
})

export default listConfigurations
