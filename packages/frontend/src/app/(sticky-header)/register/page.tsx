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
export default async function Register() {
  if (!IS_LOGIN_ENABLED) {
    notFound()
  }

  return (
    <main className="flex flex-col justify-center items-center my-24">
      <span style={{ fontSize: '28px' }} className="font-bold mb-2">
        註冊
      </span>
      <span
        style={{ color: '#404040' }}
        className="block text-base text-center mb-16"
      >
        免費獲得電子報
        <br />
        儲存喜愛的深度報導
      </span>
      <div className="w-72">
        <LoginComponent />
      </div>
      <Link
        style={{ color: '#1A7AEB' }}
        className="mt-12 mb-16 text-sm"
        href={'/login'}
      >
        已經有帳號了，我要登入
      </Link>
      <span style={{ color: '#808080' }} className="text-sm">
        完成帳號登入代表你同意我們的
        <a
          className="underline"
          href="https://www.twreporter.org/a/privacy-footer"
        >
          隱私權政策
        </a>
      </span>
    </main>
  )
}
