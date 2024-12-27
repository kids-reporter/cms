import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GENERAL_DESCRIPTION, IS_LOGIN_ENABLED } from '@/app/constants'
import { AccountTabs, AccountSettings } from './account-tabs'
// import { isProduction } from '@/environment-variables'

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
}

// export const revalidate = isProduction ? 86400 : 0 // 1 day
export default async function Account() {
  if (!IS_LOGIN_ENABLED) {
    notFound()
  }

  return (
    <main className="flex flex-row justify-center items-center gap-10">
      <AccountTabs accoutSettings={mockup} />
    </main>
  )
}
