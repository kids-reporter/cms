import Link from 'next/link'
import { SUBSCRIBE_URL } from '@/app/constants'
import './call-to-action.scss'

const contributeURL = '/about#post'

export const CallToAction = () => {
  return (
    <div className="cta-container">
      <div className="cta">
        <div className="cta-content">
          <div className="stk-block-content stk-inner-blocks stk-c1bc3aa-inner-blocks">
            <div className="wp-block-stackable-heading stk-block-heading stk--hide-desktop stk--hide-tablet stk-block stk-fb3d9e5">
              <h3>你的參與，可以讓報導點亮世界</h3>
            </div>
            <div>
              <p>
                一篇豐富、精彩和專業的報導，要經過記者、攝影、設計師、編輯，還有許多專家才能完成，完成後還要靠著社群編輯、行銷企劃，才能送到你的眼前。我們所有的努力，都希望能幫助你更了解這個世界，更希望你對這個世界發出提問。讓每一篇報導點亮世界，訂閱我們、歡迎投稿。
              </p>
            </div>
            <div className="action-container">
              <Link
                className="subscribe-btn"
                href={SUBSCRIBE_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>歡迎訂閱</span>
              </Link>
              <Link className="contribute-btn" href={contributeURL}>
                <span>歡迎投稿</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
