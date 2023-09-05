import AuthorCard from '@/app/components/author-card'
import './page.scss'

// TODO: remove mockup
import { authorsMockup } from '@/app/mockup'

export default function About() {
  return (
    <main>
      <div className="who-we-are">
        <img src={'/images/about_who_we_are.svg'} />
      </div>
      <div className="tell-you"></div>
      <div className="news">
        <span>在這裡，你們可以這樣看新聞：</span>
        <div className="pics">
          <img src={'/images/about_news_pic1.svg'} />
          <img src={'/images/about_news_pic2.svg'} />
          <img src={'/images/about_news_pic3.svg'} />
          <img src={'/images/about_news_pic4.svg'} />
          <img src={'/images/about_news_pic5.svg'} />
        </div>
      </div>
      <div className="subscribe"></div>
      <div className="contribute"></div>
      <div className="mail"></div>
      <AuthorCard title="誰在為你服務" authors={authorsMockup} />
      <AuthorCard title="我們的顧問" authors={authorsMockup} />
      <div className="donate"></div>
    </main>
  )
}
