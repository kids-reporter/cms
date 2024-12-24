import { Metadata } from 'next'
import Link from 'next/link'
import { GENERAL_DESCRIPTION } from '@/app/constants'
// import { isProduction } from '@/environment-variables'

export const metadata: Metadata = {
  title: '關於少年報導者 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

// export const revalidate = isProduction ? 86400 : 0 // 1 day

const LoginBtn = (component: React.ReactNode) => {
  return (
    <div className="flex flex-row items-center justify-center rounded-full border p-3 bg-white hover:bg-gray-100 hover:cursor-pointer gap-1">
      {component}
    </div>
  )
}

export default async function Login() {
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <span>{'登入'}</span>
      <div className="flex flex-col gap-4">
        {LoginBtn(
          <>
            <img alt="google" src="/assets/images/google.svg" />
            {'使用Google帳號'}
          </>
        )}
        {LoginBtn(
          <>
            <img
              alt="facebook"
              style={{ backgroundColor: 'rgb(66, 103, 178)' }}
              src="/assets/images/facebook.svg"
            />
            {'使用Facebook帳號'}
          </>
        )}
        {LoginBtn(
          <>
            <img alt="facebook" src="/assets/images/letter.svg" />
            {'使用電子信箱'}
          </>
        )}
      </div>
      <Link href={'/register'}>{'我還沒有帳號，現在去註冊'}</Link>
      <span>{'完成帳號登入代表你同意我們的隱私權政策'}</span>
    </main>
  )
}
