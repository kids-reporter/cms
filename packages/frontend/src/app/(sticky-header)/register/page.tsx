import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GENERAL_DESCRIPTION, IS_LOGIN_ENABLED } from '@/app/constants'
import { RegisterComponent } from '@/app/components/login'

export const metadata: Metadata = {
  title: '關於少年報導者 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

export default async function Register() {
  if (!IS_LOGIN_ENABLED) {
    notFound()
  }

  return (
    <main className="flex flex-col justify-center items-center my-24">
      <RegisterComponent />
    </main>
  )
}
