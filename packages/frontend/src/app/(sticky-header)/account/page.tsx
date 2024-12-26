import { Metadata } from 'next'
import { GENERAL_DESCRIPTION } from '@/app/constants'
import { AccountTabs } from './account-tabs'
// import { isProduction } from '@/environment-variables'

export const metadata: Metadata = {
  title: '關於少年報導者 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

// export const revalidate = isProduction ? 86400 : 0 // 1 day
export default async function Account() {
  return (
    <main className="flex flex-row justify-center items-center gap-10">
      <AccountTabs />
    </main>
  )
}
