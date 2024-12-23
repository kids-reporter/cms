import { Metadata } from 'next'
// import Link from 'next/link'
import { GENERAL_DESCRIPTION } from '@/app/constants'
// import { isProduction } from '@/environment-variables'

export const metadata: Metadata = {
  title: '關於少年報導者 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

// export const revalidate = isProduction ? 86400 : 0 // 1 day

export default async function Login() {
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      {'登入'}
      {'免費獲得電子報儲存喜愛的深度報導'}
      <div id="team" style={{ width: '95vw', scrollMarginTop: '62px' }}></div>
      <div
        id="consultants"
        style={{ width: '95vw', scrollMarginTop: '62px' }}
      ></div>
      {'使用Google帳號'}
      {'使用Facebook帳號'}
      {'使用電子信箱'}
      {'我還沒有帳號，現在去註冊'}
      {'完成帳號登入代表你同意我們的隱私權政策'}
    </main>
  )
}
