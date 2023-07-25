import './author-card.scss'

type AuthorCardProp = {
  authors: any[]
}

export const AuthorCard = (props: AuthorCardProp) => {
  return (
    <div className="author-section">
      <h3 className="author-section__title">誰幫我們完成這篇文章</h3>
      <div className="card-container">
        {props.authors.map((author, index) => {
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
