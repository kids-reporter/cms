import { Metadata } from 'next'
import Link from 'next/link'
import { GENERAL_DESCRIPTION } from '@/app/constants'
import { EditAvatarIcon } from '@/app/icons'
// import { isProduction } from '@/environment-variables'

export const metadata: Metadata = {
  title: '關於少年報導者 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

const fieldMockup = {
  name: '姓名',
  email: '電子信箱',
  joinDate: '加入日期',
}

const valueMockup = {
  name: '孫小美',
  email: 'user@email.com',
  joinDate: '2023/09/01',
}

// export const revalidate = isProduction ? 86400 : 0 // 1 day
export default async function Login() {
  return (
    <main className="flex flex-row justify-center items-center gap-10">
      <div className="flex flex-col justify-center items-center">
        <span>個人資料</span>
        <span>我的閱讀</span>
        <span>閱讀設定</span>
        <span>訂閱電子報</span>
        <Link href={'/logout'}>登出</Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span>個人資料</span>
        {Object.keys(fieldMockup).map((key, index) => {
          return (
            <div
              key={`account-field-${index}`}
              className="flex flex-row justify-center items-center"
            >
              <span>{fieldMockup[key]}</span>
              <span>{valueMockup[key]}</span>
            </div>
          )
        })}
      </div>
      <div>{EditAvatarIcon}</div>
    </main>
  )
}
