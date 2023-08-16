import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'

const listConfigurations = list({
  fields: {
    slug: text({
      isIndexed: 'unique',
      label: '作者英文姓名（用於網址）',
      validation: { isRequired: true },
    }),
    name: text({
      isIndexed: true,
      label: '作者姓名',
      validation: { isRequired: true },
    }),
    email: text(),
    bio: text({
      label: '簡介',
    }),
    avatar: relationship({
      ref: 'Photo',
      many: false,
      label: '大頭照',
    }),
    posts: relationship({
      ref: 'Post.authors',
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
