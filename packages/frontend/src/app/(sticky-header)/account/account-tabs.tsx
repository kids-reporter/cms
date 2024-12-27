'use client'
import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { EditAvatarIcon } from '@/app/icons'
import { ThemeColor } from '@/app/constants'

enum Tab {
  INFO,
  MY_READINGS,
  SETTINGS,
  SUBSCRIBE_NEWSLETTER,
}

export type AccountSettings = {
  info: { label: string; value: string }[]
}

const Divider = styled.div`
  width: 100%;
  border: 1px solid #eaeaea;
  margin-bottom: 20px;
  margin-top: 16px;
  maring-bottom: 16px;
`

// export const revalidate = isProduction ? 86400 : 0 // 1 day
export const AccountTabs = (props: { accoutSettings: AccountSettings }) => {
  const accountSettings = props.accoutSettings
  const [tab, setTab] = useState(Tab.INFO)

  const infoTab = (
    <div className="grow flex flex-col justify-center items-start">
      <span
        style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#232323',
          marginBottom: '32px',
        }}
      >
        個人資料
      </span>
      <div className="w-full flex flex-row justify-center items-start gap-8">
        <div className="grow flex flex-col justify-center items-start">
          {accountSettings?.info?.map((info, index) => {
            return (
              <>
                <div
                  key={`account-field-${index}`}
                  className="flex flex-row justify-center items-center"
                >
                  <span style={{ width: '120px' }}>{info?.label}</span>
                  <span>{info?.value}</span>
                </div>
                {index < accountSettings?.info?.length - 1 && <Divider />}
              </>
            )
          })}
        </div>
        <div
          className="h-full flex flex-col cursor-pointer"
          onClick={() => {
            console.log('edit icon')
          }}
        >
          {EditAvatarIcon}
        </div>
      </div>
    </div>
  )
  const myReadingsTab = <div></div>
  const settingsTab = (
    <div className="flex flex-col justify-center items-center">
      <span>閱讀設定</span>
      <div className="flex flex-row">
        <div>
          <span>文章前引導</span>
          <span>
            在每篇文章的起始處，加入能引起小讀者興趣的元件，在開場就抓住他的注意力！
          </span>
        </div>
        <span>開啟</span>
      </div>
      <div className="flex flex-row">
        <div>
          <span>文章後QA</span>
          <span>
            在每篇文章的結尾處，加入思辨題或選擇題，透過答題互動來強化小讀者的吸收。
          </span>
        </div>
        <span>開啟</span>
      </div>
      <div className="flex flex-row">
        <div>
          <span>推薦《報導者》相關文章</span>
          <span>
            針對思辨能力較強的小讀者，推薦與文章主題相關的《報導者》文章。
          </span>
        </div>
        <span>開啟</span>
      </div>
    </div>
  )
  const subscribeNewsletterTab = (
    <div className="flex flex-col justify-center items-center">
      <span>訂閱電子報</span>
      <div className="flex flex-row justify-center items-center">
        <div>
          <span>報導仔新聞聯絡簿</span>
          <span>每月</span>
          <span>
            兒少新聞平台《少年報導者》的最新專題和活動消息，就讓可愛的報導仔來告訴你！
          </span>
        </div>
        <Link href="">預覽</Link>
        <Link href="">前往訂閱</Link>
      </div>
    </div>
  )

  return (
    <div
      style={{
        width: 'var(--container-width)',
        maxWidth: 'var(--normal-container-max-width)',
      }}
      className="flex flex-row gap-8 justify-start mt-16"
    >
      <div className="w-48 flex flex-col items-start">
        <button
          style={{
            padding: '8px 16px',
            color: tab === Tab.INFO ? ThemeColor.BLUE : 'black',
          }}
          onClick={() => {
            setTab(Tab.INFO)
          }}
        >
          個人資料
        </button>
        <button
          style={{
            padding: '8px 16px',
            color: tab === Tab.MY_READINGS ? ThemeColor.BLUE : 'black',
          }}
          onClick={() => {
            setTab(Tab.MY_READINGS)
          }}
        >
          我的閱讀
        </button>
        <button
          style={{
            padding: '8px 16px',
            color: tab === Tab.SETTINGS ? ThemeColor.BLUE : 'black',
          }}
          onClick={() => {
            setTab(Tab.SETTINGS)
          }}
        >
          閱讀設定
        </button>
        <button
          style={{
            padding: '8px 16px',
            color: tab === Tab.SUBSCRIBE_NEWSLETTER ? ThemeColor.BLUE : 'black',
          }}
          onClick={() => {
            setTab(Tab.SUBSCRIBE_NEWSLETTER)
          }}
        >
          訂閱電子報
        </button>
        <Divider />
        <Link style={{ padding: '8px 16px' }} href={'/logout'}>
          登出
        </Link>
      </div>
      <div className="grow">
        {tab === Tab.INFO && infoTab}
        {tab === Tab.MY_READINGS && myReadingsTab}
        {tab === Tab.SETTINGS && settingsTab}
        {tab === Tab.SUBSCRIBE_NEWSLETTER && subscribeNewsletterTab}
      </div>
    </div>
  )
}
