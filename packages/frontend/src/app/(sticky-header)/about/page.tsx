import AuthorCard from '@/app/components/author-card'
import { SUBSCRIBE_URL } from '@/app/constants'
import './page.scss'

// TODO: remove mockup
import { authorsMockup } from '@/app/mockup'

export default function About() {
  // TODO: fetch stakeholders from cms

  const us = (
    <div id="us" className="us">
      <img src={'/images/about_who_we_are.svg'} />
      <span>
        《少年報導者》是由非營利媒體《報導者》孕生出的「孩子」，我們對10～15歲的同學提供深度的新聞報導，每一篇文章都是記者獨立採訪、專家審核把關下完成。我們把每個兒童和少年當成獨立的大人，你們將是改變世界的起點。
      </span>
    </div>
  )

  const tellYou = (
    <div className="pic-group">
      <span>在這裡，我們想告訴你們：</span>
      <div className="pics">
        <img src={'/images/about_tell_pic1.svg'} />
        <span>重要的議題</span>
        <img src={'/images/about_tell_pic2.svg'} />
        <span>多元的社會</span>
        <img src={'/images/about_tell_pic3.svg'} />
        <span>國際的動態</span>
        <img src={'/images/about_tell_pic4.svg'} />
        <span>豐富的知識</span>
        <img src={'/images/about_tell_pic5.svg'} />
        <span>開放的思辨</span>
      </div>
    </div>
  )

  const news = (
    <div className="pic-group">
      <span>在這裡，你們可以這樣看新聞：</span>
      <div className="pics">
        <img src={'/images/about_news_pic1.svg'} />
        <img src={'/images/about_news_pic2.svg'} />
        <img src={'/images/about_news_pic3.svg'} />
        <img src={'/images/about_news_pic4.svg'} />
        <img src={'/images/about_news_pic5.svg'} />
      </div>
    </div>
  )

  const subscribe = (
    <div className="subscribe">
      <div>
        <h3>訂閱《少年報導者》</h3>
        <p>
          不要錯過和漏接《少年報導者》精彩的專題和報導，請訂閱我們，在新聞推出的第一時間就會收到通知！
        </p>
      </div>
      <div className="btn-like">
        <a href={SUBSCRIBE_URL}>歡迎訂閱</a>
      </div>
    </div>
  )

  const mail = (
    <div id="mail" className="mail">
      <div>
        <h3>報導仔信箱，歡迎來信</h3>
        <p>
          如果想給我們的團隊一個鼓勵、一個建議，或提供採訪的線索，請寫信給報導仔，他會幫大家傳達。
        </p>
      </div>
      <div className="btn-like">聯絡信箱 kidsnews@twreporter.org</div>
    </div>
  )

  return (
    <main>
      {us}
      {tellYou}
      {news}
      {subscribe}
      <div className="contribute"></div>
      {mail}
      <div id="team">
        <AuthorCard title="誰在為你服務" authors={authorsMockup} />
      </div>
      <div id="consultor">
        <AuthorCard title="我們的顧問" authors={authorsMockup} />
      </div>
      <div className="donate"></div>
    </main>
  )
}
