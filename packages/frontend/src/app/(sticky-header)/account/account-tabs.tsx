'use client'
import { useState } from 'react'
import Link from 'next/link'
import { EditAvatarIcon } from '@/app/icons'

enum Tab {
  INFO,
  MY_READINGS,
  SETTINGS,
  SUBSCRIBE_NEWSLETTER,
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
export const AccountTabs = () => {
  const [tab, setTab] = useState(Tab.INFO)

  const infoTab = (
    <div className="flex flex-row justify-center items-center">
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
    <>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={() => {
            setTab(Tab.INFO)
          }}
        >
          個人資料
        </button>
        <button
          onClick={() => {
            setTab(Tab.MY_READINGS)
          }}
        >
          我的閱讀
        </button>
        <button
          onClick={() => {
            setTab(Tab.SETTINGS)
          }}
        >
          閱讀設定
        </button>
        <button
          onClick={() => {
            setTab(Tab.SUBSCRIBE_NEWSLETTER)
          }}
        >
          訂閱電子報
        </button>
        <Link href={'/logout'}>登出</Link>
      </div>
      {tab === Tab.INFO && infoTab}
      {tab === Tab.MY_READINGS && myReadingsTab}
      {tab === Tab.SETTINGS && settingsTab}
      {tab === Tab.SUBSCRIBE_NEWSLETTER && subscribeNewsletterTab}
    </>
  )
}
