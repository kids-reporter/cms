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
    heroImage: relationship({
      label: '列表頁首圖',
      ref: 'Photo',
    }),
    ogTitle: text({
      label: 'FB分享標題', 
      validation: { isRequired: false} 
    }),
    ogDescription: text({
      label: 'FB分享說明', 
      validation: { isRequired: false} 
    }),
    ogImage: relationship({
      label: 'FB分享縮圖',  
      ref: 'Photo',
    }),
    subCategory: relationship({
      ref: 'SubCategory',
      many: true,
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
    })
  },
  access: {
    operation: () => true,
  },
})
export default listConfigurations
