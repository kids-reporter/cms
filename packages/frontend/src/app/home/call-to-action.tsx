import Link from 'next/link'
import { SUBSCRIBE_URL, SUBSCRIBE_TITLE } from '@/app/constants'
import styles from './call-to-action.module.css'

export const CallToAction = () => {
  return (
    <div
      style={{ width: '95vw' }}
      className="max-w-5xl flex flex-col mb-16 gap-10"
    >
      <Link
        href={SUBSCRIBE_URL}
        style={{
          backgroundColor: 'var(--paletteColor6)',
          backgroundPosition: 'bottom right',
        }}
        className={`${styles.top} top flex flex-col justify-between w-full bg-no-repeat rounded-3xl pt-10 pr-8 pb-9 pl-10`}
      >
        <div>
          <h3
            style={{
              fontFamily:
                'SweiMarkerSansCJKtc-Regular,noto sans tc, Sans-Serif, serif',
              lineHeight: '160%',
              letterSpacing: '.08em',
              marginBottom:
                'calc(var(--has-content-spacing, 1)*(0.3em + 10px))',
            }}
            className="text-white font-bold text-xl lg:text-4xl"
          >
            {SUBSCRIBE_TITLE}
          </h3>
          <p
            style={{ letterSpacing: '.08em', lineHeight: '160%' }}
            className="max-w-full lg:max-w-sm text-sm lg:text-lg pb-12 lg:pb-24"
          >
            訂閱我們，第一時間接收《少年報導者》
            最新文章和專題，不會錯過精彩新聞。
          </p>
        </div>
        <div
          style={{ width: 'fit-content' }}
          className="text-sm lg:text-base bg-white rounded-3xl px-4 py-2"
        >
          歡迎訂閱
        </div>
      </Link>
      <div className="h-full flex flex-col-reverse md:flex-row justify-between gap-10">
        <Link
          href={'/about#mail'}
          style={{
            backgroundColor: 'var(--paletteColor5)',
            backgroundPosition: 'bottom right',
          }}
          className={`${styles.mail} flex flex-col justify-between bg-no-repeat rounded-3xl pt-10 pr-8 pb-9 pl-10`}
        >
          <div>
            <h3
              style={{
                fontFamily:
                  'SweiMarkerSansCJKtc-Regular,noto sans tc, Sans-Serif, serif',
                lineHeight: '160%',
                letterSpacing: '.08em',
                marginBottom:
                  'calc(var(--has-content-spacing, 1)*(0.3em + 10px))',
              }}
              className="text-white font-bold text-xl lg:text-4xl"
            >
              讀者信箱，
              <br />
              給我們意見
            </h3>
            <p
              style={{ letterSpacing: '.08em', lineHeight: '160%' }}
              className="max-w-full lg:max-w-xs text-sm lg:text-lg pb-12 lg:pb-24"
            >
              如果想給我們團隊一個鼓勵、一個建議，或是提供我們採訪線索，請寫信給我們，不要猶豫。
            </p>
          </div>
          <div
            style={{ width: 'fit-content' }}
            className="text-sm lg:text-base bg-white rounded-3xl px-4 py-2"
          >
            歡迎來信
          </div>
        </Link>
        <Link
          href={'/about#post'}
          style={{
            backgroundColor: 'var(--paletteColor1)',
            backgroundPosition: 'bottom right',
          }}
          className={`${styles.contribute} flex flex-col justify-between bg-no-repeat rounded-3xl pt-10 pr-8 pb-9 pl-10`}
        >
          <div>
            <h3
              style={{
                fontFamily:
                  'SweiMarkerSansCJKtc-Regular,noto sans tc, Sans-Serif, serif',
                lineHeight: '160%',
                letterSpacing: '.08em',
                marginBottom:
                  'calc(var(--has-content-spacing, 1)*(0.3em + 10px))',
              }}
              className="text-white font-bold text-xl lg:text-4xl"
            >
              投稿給報導仔
            </h3>
            <p
              style={{ letterSpacing: '.08em', lineHeight: '160%' }}
              className="max-w-full lg:max-w-xs text-sm lg:text-lg pb-12 lg:pb-24"
            >
              各位同學們，你對熱門時事或是生活、文化、社會有自己的觀察和想法嗎？歡迎你寫成文章，投稿給報導仔！
            </p>
          </div>
          <div
            style={{ width: 'fit-content' }}
            className="text-sm lg:text-base bg-white rounded-3xl px-4 py-2"
          >
            歡迎投稿
          </div>
        </Link>
      </div>
    </div>
  )
}

export default CallToAction
