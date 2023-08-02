import './call-to-action.scss'

const subscribeURL = 'http://eepurl.com/idk8VH'
const contributeURL = '/about#post'

export const CallToAction = () => {
  return (
    <div className="cta-container">
      <div className="cta">
        <div
          className="wp-block-stackable-column stk-block-column stk-block-column--v2 stk-column stk-block stk-c1bc3aa stk-block-background stk--has-background-overlay"
          data-block-id="c1bc3aa"
          style={{
            backgroundColor:
              'transparent !important;background-image:url(https://kids.twreporter.org/wp-content/uploads/2022/10/G文章頁_CTA.png) !important',
            backgroundPosition: 'bottom right !important',
            backgroundRepeat: 'no-repeat !important',
            backgroundSize: '327px !important',
          }}
        >
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
              <div
                className="wp-block-stackable-button-group stk-block-button-group stk-block stk-b130b7f"
                data-block-id="b130b7f"
                style={{
                  maxWidth: '300px !important',
                  minWidth: 'auto !important',
                  marginRight: 'auto !important',
                  marginLeft: '0px !important',
                }}
              >
                <div className="action-container">
                  <a
                    className="subscribe-btn"
                    href={subscribeURL}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span>歡迎訂閱</span>
                  </a>
                  <a className="contribute-btn" href={contributeURL}>
                    <span>歡迎投稿</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
