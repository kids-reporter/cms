import { text } from '@keystone-6/core/fields'

export const slugConfig = text({
  label: 'Slug',
  isIndexed: 'unique',
  validation: {
    isRequired: true,
    match: {
      regex: /^[a-z0-9-]+$/,
      explanation: '請輸入正確格式，僅能使用小寫英文、數字和符號(-)',
    },
  },
})
