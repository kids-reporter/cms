import Link from 'next/link'
import { SUBSCRIBE_URL } from '@/app/constants'
import styles from './call-to-action.module.css'

const contributeURL = '/about#post'

export const CallToAction = () => {
  return (
    <div
      style={{
        width: '95vw',
        maxWidth: 'var(--max-width)',
        backgroundColor: '#fff9ec',
      }}
      className="mx-auto p-6 rounded-3xl"
    >
      <div
        style={{ backgroundImage: 'url(/assets/images/G文章頁_CTA.png)' }}
        className={`${styles.cta} bg-transparent bg-no-repeat`}
      >
        <div
          style={{ minWidth: 'auto' }}
          className={`${styles['cta-content']} pt-8 pr-10 pb-8 pl-10`}
        >
          <div className="stk-block-content stk-inner-blocks stk-c1bc3aa-inner-blocks">
            <div className="wp-block-stackable-heading stk-block-heading stk--hide-desktop stk--hide-tablet stk-block stk-fb3d9e5">
              <h3
                style={{
                  color: 'var(--paletteColor4)',
                  fontFamily: 'SweiMarkerSansCJKtc-Regular,Sans-serif',
                }}
                className="text-xl lg:text-3xl mb-6"
              >
                你的參與，可以讓報導點亮世界
              </h3>
            </div>
            <div>
              <p
                style={{
                  lineHeight: '32px',
                  letterSpacing: 'var(--letterSpacing)',
                  color: 'var(--paletteColor4)',
                }}
                className="md:max-w-96 text-sm lg:text-base pb-5 md:pb-12 mb-6"
              >
                一篇豐富、精彩和專業的報導，要經過記者、攝影、設計師、編輯，還有許多專家才能完成，完成後還要靠著社群編輯、行銷企劃，才能送到你的眼前。我們所有的努力，都希望能幫助你更了解這個世界，更希望你對這個世界發出提問。讓每一篇報導點亮世界，訂閱我們、歡迎投稿。
              </p>
            </div>
            <div className="flex flex-row justify-center md:justify-start pb-48 md:pb-4 flex-wrap gap-5">
              <Link
                className={`${styles['subscribe-btn']} min-h-12 flex items-center pt-2 pr-4 pb-3 pl-4 rounded-3xl`}
                href={SUBSCRIBE_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span
                  style={{ color: 'var(--paletteColor8)', textWrap: 'nowrap' }}
                >
                  歡迎訂閱
                </span>
              </Link>
              <Link
                className={`${styles['contribute-btn']} min-h-12 flex items-center pt-2 pr-4 pb-3 pl-4 rounded-3xl`}
                href={contributeURL}
              >
                <span
                  style={{ color: 'var(--paletteColor8)', textWrap: 'nowrap' }}
                >
                  歡迎投稿
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
