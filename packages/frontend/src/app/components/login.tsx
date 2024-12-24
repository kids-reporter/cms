'use client'
import { useState } from 'react'

enum LoginStep {
  INITIAL,
  ENTER_EMAIL,
  ENTER_OTP,
  SUBSCRIBE_NEWSLETTER,
  LOADING,
}

const LoginBtn = (props: {
  children?: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div
      className="flex flex-row items-center justify-center rounded-full border p-3 bg-white hover:bg-gray-100 hover:cursor-pointer gap-1"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

export const LoginComponent = () => {
  const [step, setStep] = useState(LoginStep.INITIAL)

  const loginBtns = (
    <div className="flex flex-col gap-4">
      <LoginBtn
        onClick={() => {
          console.log('google')
        }}
      >
        <img alt="google" src="/assets/images/google.svg" />
        {'使用Google帳號'}
      </LoginBtn>
      <LoginBtn
        onClick={() => {
          console.log('fb')
        }}
      >
        <img
          alt="facebook"
          style={{ backgroundColor: 'rgb(66, 103, 178)' }}
          src="/assets/images/facebook.svg"
        />
        {'使用Facebook帳號'}
      </LoginBtn>
      <LoginBtn
        onClick={() => {
          setStep(LoginStep.ENTER_EMAIL)
        }}
      >
        <img alt="email" src="/assets/images/letter.svg" />
        {'使用電子信箱'}
      </LoginBtn>
    </div>
  )

  const enterEmail = (
    <div className="flex flex-col items-center justify-center">
      <img alt="email" src="/assets/images/letter.svg" />
      <span>輸入電子信箱</span>
      <span>我們會將驗證碼寄送給您</span>
      <input placeholder="example@mail.com" value=""></input>
      <button
        onClick={() => {
          setStep(LoginStep.ENTER_OTP)
        }}
      >
        確認
      </button>
      <button
        onClick={() => {
          setStep(LoginStep.INITIAL)
        }}
      >
        其他註冊方式
      </button>
    </div>
  )

  const enterOTP = (
    <div className="flex flex-col items-center justify-center">
      <img alt="email" src="/assets/images/letter.svg" />
      <span>輸入驗證碼 </span>
      <span>我們會將驗證碼寄送給您</span>
      <input placeholder="123456" value=""></input>
      <span>請在15分鐘內輸入</span>
      <button
        onClick={() => {
          setStep(LoginStep.SUBSCRIBE_NEWSLETTER)
        }}
      >
        確認
      </button>
      <button
        onClick={() => {
          setStep(LoginStep.INITIAL)
        }}
      >
        再寄一次驗證碼
      </button>
    </div>
  )

  const subscribeNewsletter = (
    <div className="flex flex-col items-center justify-center">
      <span>註冊成功 現在訂閱電子報</span>
      <span>報導仔新聞聯絡簿</span>
      <span>每月</span>
      <span>
        兒少新聞平台《少年報導者》的最新專題和活動消息，就讓可愛的報導仔來告訴你！
      </span>
      <button
        onClick={() => {
          setStep(LoginStep.SUBSCRIBE_NEWSLETTER)
        }}
      >
        前往訂閱
      </button>
      <button
        onClick={() => {
          setStep(LoginStep.SUBSCRIBE_NEWSLETTER)
        }}
      >
        不訂閱，回首頁
      </button>
    </div>
  )

  const loading = (
    <div className="flex flex-col items-center justify-center">
      <span>請稍候</span>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center">
      {step === LoginStep.INITIAL && loginBtns}
      {step === LoginStep.ENTER_EMAIL && enterEmail}
      {step === LoginStep.ENTER_OTP && enterOTP}
      {step === LoginStep.SUBSCRIBE_NEWSLETTER && subscribeNewsletter}
      {step === LoginStep.LOADING && loading}
    </div>
  )
}

export default LoginComponent
