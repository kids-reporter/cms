import { MAIN_SITE_URL } from '@/app/constants'
import './go-to-main-site.scss'

// TOOD: rwd fonts
export const GoToMainSite = () => {
  return (
    <div className="goto">
      <img
        decoding="async"
        loading="lazy"
        className="stk-img wp-image-6055"
        src="/images/main_site_logo.svg"
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
      <a href={MAIN_SITE_URL} target="_blank" rel="noreferrer noopener">
        前往報導者
      </a>
    </div>
  )
}

export default GoToMainSite
