import './go-to-main-site.scss'

export const GoToMainSite = () => {
  return (
    <div className="goto">
      <img
        decoding="async"
        loading="lazy"
        className="stk-img wp-image-6055"
        src="https://kids.twreporter.org/wp-content/uploads/2022/10/reporter_logo.svg"
        width="160"
        height="300"
      />
      <div className="desc">
        <h2 className="stk-block-heading__text has-text-align-center-mobile stk-block-heading--use-theme-margins">
          前往《報導者》主網站
        </h2>
        <p className="stk-block-text__text">
          <span
            style={{ color: 'var(--paletteColor4, #232323)' }}
            className="stk-highlight"
          >
            如果你是大人，或者還想看更進階、更深度的報導，《報導者》主網站有更多調查採訪和重磅新聞。
          </span>
        </p>
      </div>
      <a
        href="https://www.twreporter.org/"
        target="_blank"
        rel="noreferrer noopener"
      >
        前往報導者
      </a>
    </div>
  )
}

export default GoToMainSite
