import { Metadata } from 'next'
import Link from 'next/link'
import { GENERAL_DESCRIPTION } from '@/app/constants'
import { LoginBtns } from '@/app/components/login'
// import { isProduction } from '@/environment-variables'

export const metadata: Metadata = {
  title: '關於少年報導者 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

// export const revalidate = isProduction ? 86400 : 0 // 1 day
export default async function Register() {
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <span>註冊</span>
      <span>免費獲得電子報儲存喜愛的深度報導</span>
      <LoginBtns />
      <Link href={'/login'}>已經有帳號了，我要登入</Link>
      <span>完成帳號登入代表你同意我們的隱私權政策</span>
    </main>
  )
}
