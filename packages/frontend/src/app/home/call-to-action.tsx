import { SUBSCRIBE_URL } from '@/app/constants'

import './call-to-action.scss'

// TOOD: rwd fonts
export const CallToAction = () => {
  return (
    <div className="cta-container">
      <a href={SUBSCRIBE_URL} className="top">
        <div>
          <h3>訂閱《少年報導者》</h3>
          <p>
            訂閱我們，第一時間接收《少年報導者》
            最新文章和專題，不會錯過精彩新聞。
          </p>
        </div>
        <div className="btn-like">歡迎訂閱</div>
      </a>
      <div className="bottom">
        <a href={'/about#mail'} className="mail">
          <div>
            <h3>
              讀者信箱，
              <br />
              給我們意見
            </h3>
            <p>
              如果想給我們團隊一個鼓勵、一個建議，或是提供我們採訪線索，請寫信給我們，不要猶豫。
            </p>
          </div>
          <div className="btn-like">歡迎來信</div>
        </a>
        <a href={'/about#post'} className="contribute">
          <div>
            <h3>投稿給報導仔</h3>
            <p>
              各位同學們，你對熱門時事或是生活、文化、社會有自己的觀察和想法嗎？歡迎你寫成文章，投稿給報導仔！
            </p>
          </div>
          <div className="btn-like">歡迎投稿</div>
        </a>
      </div>
    </div>
  )
}

export default CallToAction
