import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    name: text({
      isIndexed: true,
      label: '作者姓名',
      validation: { isRequired: true },
    }),
    email: text({
      isIndexed: 'unique',
      db: {
        isNullable: true,
      },
    }),
    bio: text({
      label: '簡介',
    }),
    posts: relationship({
      ref: 'Post.writers',
      many: true,
      label: '文章',
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
})
export default listConfigurations
