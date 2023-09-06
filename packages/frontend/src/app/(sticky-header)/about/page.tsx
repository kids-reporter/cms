import AuthorCard from '@/app/components/author-card'
import {
  CREDIT_DONATE_URL,
  CONTRIBUTE_FORM,
  DONATE_URL,
  MAIN_SITE_URL,
  SUBSCRIBE_URL,
} from '@/app/constants'
import './page.scss'

// TODO: remove mockup
import { authorsMockup } from '@/app/mockup'

export default function About() {
  // TODO: fetch stakeholders from cms

  const us = (
    <div id="us" className="us">
      <img src={'/images/about_who_we_are.svg'} />
      <p>
        《少年報導者》是由非營利媒體《報導者》孕生出的「孩子」，我們對10～15歲的同學提供深度的新聞報導，每一篇文章都是記者獨立採訪、專家審核把關下完成。我們把每個兒童和少年當成獨立的大人，你們將是改變世界的起點。
      </p>
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

  const contribute = (
    <div className="contribute">
      <h3>投稿給報導仔，成為小評論員</h3>
      <p>
        《少年報導者》是一個開放的公共平台，報導仔希望聽見大家的看法和心聲，歡迎10～15歲的同學投稿給報導仔，針對新聞時事、國家政策、校園生活，或是藝術文化、運動體育，都可以寫下你的觀點、評論，讓報導仔協助你成為我們的評論員。
      </p>
      <img src={'/images/about_road.svg'} />
      <p>
        投稿都會刊登嗎？ •編輯群和專家會做討論 •如果刊登你會收到通知
        •不合適刊登的文章不會另行通知
      </p>
      <p>
        刊登有什麼獎勵？ •你會收到微薄稿酬 •你會收到「少年報導者評論員」證書
      </p>
      <img src={'/images/about_certification_template.jpg'} />
      <p>少年報導者評論員證書範例</p>
      <div className="btn-like">
        <a href={CONTRIBUTE_FORM}>我要投稿！</a>
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

  const mainSite = (
    <div className="main-site">
      <img src={'/images/about_go_to_main_site.png'} />
      <h3>大人通道，了解更多的《報導者》</h3>
      <p>
        如果您是家長、老師或是關注台灣媒體環境的大人們，我們邀請您進一步認識《報導者》。《報導者》以及《少年報導者》都是由非營利的報導者文化基金會支持，我們不靠商業廣告，是由讀者直接資助的獨立媒體，屢獲國內、外重要新聞獎項。我們致力開創媒體公共服務的精神，文章皆全文開放免費閱讀。
      </p>
      <p>
        無論針對大人及少年製作的報導，都仰賴大量專業人力製作，需要社會捐款贊助才能完成，希望您能成為製作好新聞的一股力量。報導者文化基金會遵從嚴謹的公益責信原則，每一筆捐款都公布在《報導者》官網，在報導者文化基金會董、監事監督下，依編務實務需求統籌分配於《報導者》及《少年報導者》，您的捐款收據不會註明使用在哪一個平台。
      </p>
      <div className="btns">
        <div className="btn-like">
          <a href={MAIN_SITE_URL}>報導者官網</a>
        </div>
        <div className="btn-like">
          <a href={DONATE_URL}>贊助報導者</a>
        </div>
        <div className="btn-like">
          <a href={CREDIT_DONATE_URL}>了解捐款徵信</a>
        </div>
      </div>
    </div>
  )

  return (
    <main>
      {us}
      {tellYou}
      {news}
      {subscribe}
      {contribute}
      {mail}
      <div id="team">
        <AuthorCard title="誰在為你服務" authors={authorsMockup} />
      </div>
      <div id="consultor">
        <AuthorCard title="我們的顧問" authors={authorsMockup} />
      </div>
      {mainSite}
    </main>
  )
}
