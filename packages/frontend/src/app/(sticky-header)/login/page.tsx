import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GENERAL_DESCRIPTION, IS_LOGIN_ENABLED } from '@/app/constants'
import { LoginComponent } from '@/app/components/login'
// import { isProduction } from '@/environment-variables'

export const metadata: Metadata = {
  title: '關於少年報導者 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

// export const revalidate = isProduction ? 86400 : 0 // 1 day
export default async function Login() {
  if (!IS_LOGIN_ENABLED) {
    notFound()
  }

  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <span>登入</span>
      <LoginComponent />
      <Link href={'/register'}>我還沒有帳號，現在去註冊</Link>
      <span>完成帳號登入代表你同意我們的隱私權政策</span>
    </main>
  )
}
