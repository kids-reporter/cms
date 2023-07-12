import { list } from '@keystone-6/core';
import { relationship, select, text, timestamp } from '@keystone-6/core/fields';

const listConfigurations = list ({
  fields: {
    slug: text({
      label: '名稱', validation: { isRequired: true } 
    }),
    title: text({
      isIndexed: 'unique',
      label: '中文名稱', 
      validation: { isRequired: true} 
    }),
    status: select({
      options: [ 
        { label: 'inactive', value: 'inactive' }, 
        { label: 'active', value: 'active' }, 
        { label: 'archived', value: 'archived' }],  
    }),
    category: relationship({
      ref: 'Category',
      many: false,
    }),
    relatedPost: relationship({
      ref: 'Post',
      many: true,
    }),
    createdAt: timestamp(),
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
