import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GENERAL_DESCRIPTION, IS_LOGIN_ENABLED } from '@/app/constants'
import { AccountTabs, AccountSettings } from './account-tabs'

export const metadata: Metadata = {
  title: '關於少年報導者 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

const mockup: AccountSettings = {
  info: [
    { label: '姓名', value: '孫小美' },
    { label: '電子信箱', value: 'user@email.com' },
    { label: '加入日期', value: '2023/09/01' },
  ],
  settings: {
    isGuideEnabled: true,
    qa: { isQAEnabled: true, selectedNum: 1 },
    isRecommendationEnabled: false,
  },
}

export default async function Account() {
  if (!IS_LOGIN_ENABLED) {
    notFound()
  }

  return (
    <main
      style={{ width: '95vw' }}
      className="flex flex-row justify-center gap-10 md:mb-40 mb-32"
    >
      <AccountTabs accoutSettings={mockup} />
    </main>
  )
}
