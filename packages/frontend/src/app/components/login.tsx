'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Arrow, Mailbox } from '@/app/icons/miscellaneous'

const SVGIcon = styled.svg`
  height: 24px;
  width: 24px;
  mask-image: url(${(props) => props.src});
  mask-size: cover;
`

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
      className="flex flex-row items-center justify-center rounded-full border border-2 p-3 bg-white hover:bg-gray-100 hover:cursor-pointer gap-1"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

const LoginTemplateComponent = (
  TitleComponent: React.ReactNode,
  hint: string,
  hintHref: string
) => {
  const TemplateComponent = () => {
    const [step, setStep] = useState(LoginStep.INITIAL)
    const [email, setEmail] = useState('')

    const handleEmailChange = (e) => {
      setEmail(e.target.value)
    }

    const loginBtns = (
      <>
        {TitleComponent}
        <div className="w-72 flex flex-col gap-4">
          <LoginBtn
            onClick={() => {
              console.log('google')
            }}
          >
            <img alt="google" src="/assets/images/google.svg" />
            <span className="font-bold text-base">使用Google帳號</span>
          </LoginBtn>
          <LoginBtn
            onClick={() => {
              console.log('fb')
            }}
          >
            <SVGIcon
              style={{ backgroundColor: 'rgb(66, 103, 178)' }}
              src={'/assets/images/facebook.svg'}
            />
            <span className="font-bold text-base">使用Facebook帳號</span>
          </LoginBtn>
          <LoginBtn
            onClick={() => {
              setStep(LoginStep.ENTER_EMAIL)
            }}
          >
            <SVGIcon
              style={{ backgroundColor: 'rgb(64, 64, 64)' }}
              src={'/assets/images/letter.svg'}
            />
            <span className="font-bold text-base">使用電子信箱</span>
          </LoginBtn>
        </div>
        <Link
          style={{ color: '#1A7AEB' }}
          className="mt-12 mb-16 text-sm"
          href={hintHref}
        >
          {hint}
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
      </>
    )

    const enterEmail = (
      <div className="w-72 flex flex-col items-center justify-center">
        <div
          style={{ backgroundColor: '#f1f1f1' }}
          className="w-16 h-16 flex flex-col justify-center items-center rounded-full mb-6"
        >
          {Mailbox}
        </div>
        <span style={{ fontSize: '28px' }} className="font-bold mb-2">
          輸入電子信箱
        </span>
        <span style={{ color: '#808080', fontSize: '16px' }} className="mb-10">
          我們會將驗證碼寄送給您
        </span>
        <input
          className="w-full mx-1 mb-10 py-2 border-b-2 border-black focus:outline-none placeholder-gray-300 text-center"
          placeholder="example@mail.com"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <button
          className="w-full py-2 rounded-full mb-6"
          style={{ color: 'white', backgroundColor: '#404040' }}
          onClick={() => {
            setStep(LoginStep.ENTER_OTP)
          }}
        >
          確認
        </button>
        <button
          className="flex flex-row justify-center items-center gap-2"
          style={{ color: '#808080' }}
          onClick={() => {
            setStep(LoginStep.INITIAL)
          }}
        >
          {Arrow}
          其他登入方式
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
      <div className="w-full flex flex-col items-center justify-center">
        {step === LoginStep.INITIAL && loginBtns}
        {step === LoginStep.ENTER_EMAIL && enterEmail}
        {step === LoginStep.ENTER_OTP && enterOTP}
        {step === LoginStep.SUBSCRIBE_NEWSLETTER && subscribeNewsletter}
        {step === LoginStep.LOADING && loading}
      </div>
    )
  }
  return TemplateComponent
}

export const LoginComponent = LoginTemplateComponent(
  <span style={{ fontSize: '28px' }} className="font-bold mb-16">
    登入
  </span>,
  '我還沒有帳號，現在去註冊',
  '/register'
)

export const RegisterComponent = LoginTemplateComponent(
  <>
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
  </>,
  '已經有帳號了，我要登入',
  '/login'
)
