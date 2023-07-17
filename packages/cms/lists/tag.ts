import { list } from '@keystone-6/core';
import { relationship, checkbox, select, text, timestamp } from '@keystone-6/core/fields';
	  
const listConfigurations = list ({
  fields: {
	name: text({
      isIndexed: 'unique', 
      label: '標籤名稱', 
      validation: { isRequired: true} 
    }),
    status: select({
      defaultValue: 'active', 
      options: [ 
        { label: 'inactive', value: 'inactive' }, 
        { label: 'active', value: 'active' }, 
        { label: 'archived', value: 'archived' }
      ], 
      label: '狀態',
    }),
    ogTitle: text({
      validation: { isRequired: false}, 
      label: 'FB分享標題' 
    }),
    ogDescription: text({
      validation: { isRequired: false}, 
      label: 'FB分享說明',  
    }),
    ogImage: relationship({
      ref: 'Photo',
      label: 'FB分享縮圖' 
    }),
    posts: relationship({
      ref: 'Post.tags',
      many: true,
      label: '相關文章',
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
})
export default listConfigurations
