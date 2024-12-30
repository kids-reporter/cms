'use client'
import { useState, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { EditAvatarIcon } from '@/app/icons'
import { ThemeColor, KIDS_URL_ORIGIN } from '@/app/constants'

enum Tab {
  INFO,
  MY_READINGS,
  SETTINGS,
  SUBSCRIBE_NEWSLETTER,
}

export type AccountSettings = {
  info: { label: string; value: string }[]
  settings: any
}

const Title = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #232323;
  margin-bottom: 32px;
`

const SubTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #232323;
`

const Description = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #232323;
`

const Switch = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background: ${(props) => (props.disabled ? 'gray' : 'gray')};
  border-radius: 20px;
  padding: 0px;
  transition: 100ms ease-in-out;

  &:before {
    transition: 100ms ease-in-out;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 20px;
    top: 50%;
    left: 2px;
    background: white;
    transform: translate(0, -50%);
  }
`

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: ${(props) => (props.disabled ? 'gray' : 'gray')};
    &:before {
      transform: translate(20px, -50%);
    }
  }
`

const Divider = styled.div`
  width: 100%;
  border: 1px solid #eaeaea;
  margin-bottom: 20px;
  margin-top: 16px;
  maring-bottom: 16px;
`

const newsletterPreview = ''
const newsletterSubscription = ''

const isQAsEnabled = Array(3).fill(false)

export const AccountTabs = (props: { accoutSettings: AccountSettings }) => {
  const accountSettings = props.accoutSettings
  const fileInputRef = useRef<HTMLInputElement>()
  const [tab, setTab] = useState(Tab.INFO)

  const handleAvtarFileChange = () => {
    console.log('select avatar file')
  }

  const handleQANumSelectChange = () => {
    console.log('select')
  }

  const panelBtns = (
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
  )

  const infoTab = (
    <div className="grow flex flex-col justify-center items-start">
      <Title>個人資料</Title>
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
          onClick={() => fileInputRef?.current?.click()}
        >
          {EditAvatarIcon}
        </div>
        <input
          onChange={handleAvtarFileChange}
          multiple={false}
          ref={fileInputRef}
          type="file"
          hidden
        />
      </div>
    </div>
  )

  const myReadingsTab = <div></div>

  const settingsTab = (
    <div className="flex flex-col justify-center items-start">
      <Title>閱讀設定</Title>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <SubTitle>文章前引導</SubTitle>
          <Description>
            在每篇文章的起始處，加入能引起小讀者興趣的元件，在開場就抓住他的注意力！
          </Description>
        </div>
        <div className="flex flex-col">
          <span>
            {accountSettings.settings.isGuideEnabled ? '開啟' : '關閉'}
          </span>
          <Input
            type="checkbox"
            disabled={false}
            checked={accountSettings.settings.isGuideEnabled}
            onChange={handleQANumSelectChange}
          />
          <Switch disabled={false} />
        </div>
      </div>
      <Divider />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <SubTitle>文章後QA</SubTitle>
          <Description>
            在每篇文章的結尾處，加入思辨題或選擇題，透過答題互動來強化小讀者的吸收。
          </Description>
        </div>
        <div className="flex flex-col items-center">
          <span>
            {accountSettings.settings.qa.isQAEnabled ? '開啟' : '關閉'}
          </span>
          <Input
            type="checkbox"
            disabled={false}
            checked={accountSettings.settings.qa.isQAEnabled}
            onChange={handleQANumSelectChange}
          />
          <Switch disabled={false} />
        </div>
        <div
          className="flex flex-col px-6 py-5 gap-2"
          style={{ background: '#F8F8F8' }}
        >
          <SubTitle>思辨題數量</SubTitle>
          <div className="flex flex-row">
            <span>無</span>
            {isQAsEnabled.map((isEnabled, index) => {
              return (
                <>
                  <Input type="checkbox" checked={isEnabled} />
                  <span key={`qa-set-${index}`}>{index + 1}題</span>
                </>
              )
            })}
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col">
        <SubTitle>推薦《報導者》相關文章</SubTitle>
        <div className="flex flex-row items-center">
          <Description>
            針對思辨能力較強的小讀者，推薦與文章主題相關的《報導者》文章。
          </Description>
          <div className="flex flex-col">
            <span>
              {accountSettings.settings.isRecommendationEnabled
                ? '開啟'
                : '關閉'}
            </span>
            <Input
              type="checkbox"
              disabled={false}
              checked={accountSettings.settings.isRecommendationEnabled}
              onChange={handleQANumSelectChange}
            />
            <Switch disabled={false} />
          </div>
        </div>
      </div>
    </div>
  )

  const subscribeNewsletterTab = (
    <div className="flex flex-col justify-center items-start">
      <Title>訂閱電子報</Title>
      <div className="flex flex-row justify-center items-start border">
        <div className="flex flex-row justify-center items-center gap-4">
          <img src="/assets/images/kids_newsletter_subscription.png" />
          <div className="flex flex-col">
            <div className="flex flex-row">
              <SubTitle>報導仔新聞聯絡簿</SubTitle>
              <span>每月</span>
            </div>
            <span>
              兒少新聞平台
              <a href={KIDS_URL_ORIGIN}>《少年報導者》的最新專題和活動消息</a>
              ，就讓可愛的報導仔來告訴你！
            </span>
          </div>
          <Link href={newsletterPreview}>預覽</Link>
          <Link href={newsletterSubscription}>前往訂閱</Link>
        </div>
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
      {panelBtns}
      <div className="grow">
        {tab === Tab.INFO && infoTab}
        {tab === Tab.MY_READINGS && myReadingsTab}
        {tab === Tab.SETTINGS && settingsTab}
        {tab === Tab.SUBSCRIBE_NEWSLETTER && subscribeNewsletterTab}
      </div>
    </div>
  )
}
