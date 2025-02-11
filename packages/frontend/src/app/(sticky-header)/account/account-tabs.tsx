'use client'
import { useState, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {
  ThemeColor,
  Color,
  KIDS_URL_ORIGIN,
  NEWSLETTER_SUBSCRIPTION,
  NEWSLETTER_PREVIEW,
} from '@/app/constants'
import { ToggleButton, Checkbox } from './basic-component'

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

const SVGIcon = styled.svg<{ src: string }>`
  height: 24px;
  width: 24px;
  mask-image: url(${(props) => props.src});
  mask-size: cover;
`

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
  letter-spacing: 0.05em;
  line-height: 25.6px;
`

const Description = styled.span`
  font-size: 16px;
  color: #575757;
  letter-spacing: 0.05em;
  line-height: 25.6px;
`

const Divider = styled.div`
  width: 100%;
  border: 1px solid ${Color.LIGHT_GRAY};
  margin-bottom: 20px;
  margin-top: 24px;
`

const isQAsEnabled = Array(3).fill(false)

export const AccountTabs = (props: { accoutSettings: AccountSettings }) => {
  const accountSettings = props.accoutSettings
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tab, setTab] = useState(Tab.INFO)
  const [isGuideEnabled, setIsGuideEnabled] = useState(
    accountSettings.settings.isGuideEnabled
  )
  const [isQAEnabled, setIsQAEnabled] = useState(
    accountSettings.settings.qa.isQAEnabled
  )
  const [isRecommendationEnabled, setIsRecommendationEnabled] = useState(
    accountSettings.settings.isRecommendationEnabled
  )

  const handleAvatarFileChange = () => {
    console.log('select avatar file')
  }

  const panelBtns = (
    <div className="w-full md:w-48 flex flex-col items-start">
      <button
        className="w-full text-left text-base hover:bg-gray-200 active:bg-gray-300 px-4 py-1.5"
        style={{
          color: tab === Tab.INFO ? ThemeColor.BLUE : '#232323',
        }}
        onClick={() => {
          setTab(Tab.INFO)
        }}
      >
        個人資料
      </button>
      {false && (
        <button
          className="w-full text-left text-base hover:bg-gray-200 active:bg-gray-300 px-4 py-1.5"
          style={{
            color: tab === Tab.MY_READINGS ? ThemeColor.BLUE : '#232323',
          }}
          onClick={() => {
            setTab(Tab.MY_READINGS)
          }}
        >
          我的閱讀
        </button>
      )}
      {false && (
        <button
          className="w-full text-left text-base hover:bg-gray-200 active:bg-gray-300 px-4 py-1.5"
          style={{
            color: tab === Tab.SETTINGS ? ThemeColor.BLUE : '#232323',
          }}
          onClick={() => {
            setTab(Tab.SETTINGS)
          }}
        >
          閱讀設定
        </button>
      )}
      <button
        className="w-full text-left text-base hover:bg-gray-200 active:bg-gray-300 px-4 py-1.5"
        style={{
          color: tab === Tab.SUBSCRIBE_NEWSLETTER ? ThemeColor.BLUE : '#232323',
        }}
        onClick={() => {
          setTab(Tab.SUBSCRIBE_NEWSLETTER)
        }}
      >
        訂閱電子報
      </button>
      <Divider />
      <Link
        className="w-full text-left text-base hover:bg-gray-200 active:bg-gray-300 px-4 py-1.5"
        href={'/logout'}
      >
        登出
      </Link>
    </div>
  )

  const infoTab = (
    <div className="grow flex flex-col justify-center items-start">
      <div className="w-full flex md:flex-row flex-col-reverse md:justify-start justify-center md:items-stretch items-center gap-8">
        <div className="w-full lg:max-w-3xl grow flex flex-col justify-center items-start">
          <Title>個人資料</Title>
          {accountSettings?.info?.map((info, index) => {
            return (
              <>
                <div
                  key={`account-field-${index}`}
                  className="flex flex-row justify-center items-center"
                >
                  <span style={{ width: '120px', color: '#575757' }}>
                    {info?.label}
                  </span>
                  <span>{info?.value}</span>
                </div>
                {index < accountSettings?.info?.length - 1 && <Divider />}
              </>
            )
          })}
        </div>
        <div className="relative lg:w-40 w-36 lg:min-w-40 min-w-36 flex flex-col justify-end">
          <img src={'/assets/images/avatar_bg.png'} />
          <div
            className="lg:w-11 lg:h-11 w-9 h-9 flex flex-row justify-center items-center absolute right-0 bg-white rounded-full cursor-pointer"
            style={{ boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.2)' }}
            onClick={() => fileInputRef?.current?.click()}
          >
            <SVGIcon
              className={'bg-[#A3A3A3] hover:bg-[#27B5F7]'}
              src={'/assets/images/editpen.svg'}
            />
          </div>
          <input
            onChange={handleAvatarFileChange}
            multiple={false}
            ref={fileInputRef}
            type="file"
            hidden
          />
        </div>
      </div>
    </div>
  )

  const myReadingsTab = <div></div>

  const settingsTab = (
    <div className="w-full lg:max-w-4xl flex flex-col justify-center items-start">
      <Title>閱讀設定</Title>
      <div className="w-full flex flex-row gap-6">
        <div className="grow flex flex-col">
          <SubTitle>文章前引導</SubTitle>
          <Description>
            在每篇文章的起始處，加入能引起小讀者興趣的元件，在開場就抓住他的注意力！
          </Description>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span>
            {accountSettings.settings.isGuideEnabled ? '開啟' : '關閉'}
          </span>
          <ToggleButton
            value={isGuideEnabled}
            onChange={() => {
              setIsGuideEnabled(!isGuideEnabled)
            }}
          />
        </div>
      </div>
      <Divider />
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row gap-6">
          <div className="grow flex flex-col">
            <SubTitle>文章後QA</SubTitle>
            <Description>
              在每篇文章的結尾處，加入思辨題或選擇題，透過答題互動來強化小讀者的吸收。
            </Description>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span>
              {accountSettings.settings.qa.isQAEnabled ? '開啟' : '關閉'}
            </span>
            <ToggleButton
              value={isQAEnabled}
              onChange={() => {
                setIsQAEnabled(!isQAEnabled)
              }}
            />
          </div>
        </div>
        <div
          className="flex flex-col px-6 py-5 gap-2 mt-4 rounded-2xl"
          style={{ background: Color.BORDER_GRAY }}
        >
          <SubTitle>思辨題數量</SubTitle>
          <div className="flex flex-row gap-6">
            <Checkbox checked={true} label={'無'} />
            {isQAsEnabled.map((isEnabled, index) => {
              return (
                <Checkbox
                  key={`qa-checkbox-${index}`}
                  checked={isEnabled}
                  label={`${index + 1}題`}
                />
              )
            })}
          </div>
        </div>
      </div>
      <Divider />
      <div className="w-full flex flex-row gap-6">
        <div className="grow flex flex-col items-start">
          <SubTitle>推薦《報導者》相關文章</SubTitle>
          <Description>
            針對思辨能力較強的小讀者，推薦與文章主題相關的《報導者》文章。
          </Description>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span>
            {accountSettings.settings.isRecommendationEnabled ? '開啟' : '關閉'}
          </span>
          <ToggleButton
            value={isRecommendationEnabled}
            onChange={() => {
              setIsRecommendationEnabled(!isRecommendationEnabled)
            }}
          />
        </div>
      </div>
    </div>
  )

  const subscribeNewsletterTab = (
    <div className="flex flex-col justify-center items-start">
      <Title>訂閱電子報</Title>
      <div className="max-w-4xl flex flex-row justify-center items-start border-2 rounded-3xl p-8">
        <div className="flex lg:flex-row flex-col justify-center items-center gap-4">
          <div className="flex md:flex-row flex-col justify-center items-center gap-4">
            <img src="/assets/images/kids_newsletter_subscription.png" />
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="flex flex-row justify-start items-center md:gap-2 gap-0.5">
                <SubTitle style={{ fontSize: '18px' }}>
                  報導仔新聞聯絡簿
                </SubTitle>
                <div
                  style={{
                    color: ThemeColor.BLUE,
                    background: '#F1F1F1',
                    padding: '2px 4px',
                  }}
                >
                  每月
                </div>
              </div>
              <span style={{ color: '#4A4A4A' }}>
                兒少新聞平台
                <a
                  style={{ textDecoration: 'underline', color: '#8E8E8E' }}
                  href={KIDS_URL_ORIGIN}
                >
                  《少年報導者》
                </a>
                的最新專題和活動消息，就讓可愛的報導仔來告訴你！
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <Link
              style={{
                fontWeight: '700',
                borderColor: ThemeColor.BLUE,
                borderWidth: '2px',
              }}
              className="rounded-full md:text-lg text-base py-3 md:px-10 px-5 text-nowrap"
              href={NEWSLETTER_PREVIEW}
            >
              預覽
            </Link>
            <Link
              style={{
                fontWeight: '700',
                color: 'white',
                background: ThemeColor.BLUE,
              }}
              className="rounded-full md:text-lg text-base py-3 md:px-10 px-5 text-nowrap"
              href={NEWSLETTER_SUBSCRIPTION}
            >
              前往訂閱
            </Link>
          </div>
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
      className="flex md:flex-row flex-col-reverse md:gap-8 gap-16 justify-start items-start mt-16"
    >
      {panelBtns}
      <div className="grow w-full">
        {tab === Tab.INFO && infoTab}
        {tab === Tab.MY_READINGS && myReadingsTab}
        {tab === Tab.SETTINGS && settingsTab}
        {tab === Tab.SUBSCRIBE_NEWSLETTER && subscribeNewsletterTab}
      </div>
    </div>
  )
}
