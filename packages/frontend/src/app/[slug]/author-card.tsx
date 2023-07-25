import './author-card.scss'

const authors = [
  {
    name: '張恩瑋',
    group: '文字',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/預設頭像_2.png',
    desc:
      '就讀台大動物科學技術學系並雙主修創新領域學士學位學程。因為高中時期與台大乳牛們的相遇，從此步入動物領域這條不歸路，在大一下藉由探索學習計畫前往六福村及原野馬場實習，並進入分子生物研究室向學長姐學習，重新調整面對動物時的心態。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '王家琛',
    group: '設計',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/預設頭像_2.png',
    desc:
      '設計系畢業的插畫及手刺繡工作者，喜歡將生活中的見聞以不同媒材紀錄。理性設計；感性創作。透過雙手把模糊的感知化作具體圖像進行溝通，引導觀者走進故事。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '黃禹禛',
    group: '設計',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_4_黃禹禛.png',
    desc:
      '從新聞系半路出家的設計師，主要任務是把複雜的資訊變成好懂、好讀的圖像。轉化故事不太容易，但我會繼續努力！',
    link: '/staff/chang-en-wei',
  },
  {
    name: '楊惠君',
    group: '總監',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_1_楊惠君.png',
    desc:
      '從沒有手機和電腦的時代開始當記者。記者是挖礦人、是點燈人、是魔術師──要挖掘世界的不堪，為喪志的人點燈，將悲傷的事幻化成美麗的彩虹⋯⋯常常會失敗，但不能放棄去做到。',
    link: '/staff/chang-en-wei',
  },
  {
    name: '陳韻如',
    group: '編輯',
    img:
      'https://kids.twreporter.org/wp-content/uploads/2022/10/核心成員_6_陳韻如.png',
    desc:
      '新聞系畢業後，就投入編輯這份工作，非常努力讓每一篇報導都美美的呈現在讀者面前，希望你也喜歡這篇文章。',
    link: '/staff/chang-en-wei',
  },
]

export const AuthorCard = () => {
  return (
    <div className="author-section">
      <h3 className="author-section__title">誰幫我們完成這篇文章</h3>
      <div className="card-container">
        {authors.map((author, index) => {
          return (
            <div className="card" key={`author-card-${index}`}>
              <div className="photo-mask">
                <img src={author.img} />
              </div>

              <span className="name">{author.name}</span>
              <div className="group">{author.group}</div>
              <span className="desc">{author.desc}</span>

              <span className="more">
                了解更多 <i className="icon-rpjr-icon-arrow-right"></i>
              </span>
            </div>
          )
        })}
      </div>
      <button
        className="author-section__m-btn rpjr-btn"
        //onclick="document.querySelector('.author-section').classList.add('author-section--show')"
      >
        展開看所有作者
      </button>
    </div>
  )
}

export default AuthorCard
