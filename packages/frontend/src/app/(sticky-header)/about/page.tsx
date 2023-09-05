import AuthorCard from '@/app/components/author-card'
import './page.scss'

// TODO: remove mockup
import { authorsMockup } from '@/app/mockup'

export default function About() {
  // TODO: fetch stakeholders from cms

  const whoWeAre = (
    <div className="who-we-are">
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

  return (
    <main>
      {whoWeAre}
      {tellYou}
      {news}
      <div className="subscribe"></div>
      <div className="contribute"></div>
      <div className="mail"></div>
      <AuthorCard title="誰在為你服務" authors={authorsMockup} />
      <AuthorCard title="我們的顧問" authors={authorsMockup} />
      <div className="donate"></div>
    </main>
  )
}
