import Link from 'next/link'
import { MAIN_SITE_URL } from '@/app/constants'

// TODO: rwd fonts
export const GoToMainSite = () => {
  return (
    <div
      style={{ width: '95vw', border: '1.5px solid #eaeaea' }}
      className="max-w-5xl h-full flex flex-col md:flex-row justify-between items-center mb-8 px-12 py-8 rounded-3xl gap-8"
    >
      <img
        decoding="async"
        loading="lazy"
        className="stk-img wp-image-6055 w-28 lg:w-40"
        src="/assets/images/main_site_logo.svg"
      />
      <div className="flex-shrink flex flex-col items-center md:items-start">
        <h2
          style={{
            fontFamily:
              'SweiMarkerSansCJKtc-Regular,noto sans tc,Sans-Serif,serif',
            lineHeight: '160%',
            letterSpacing: '.08em',
            marginBottom: 'calc(var(--has-content-spacing, 1)*(0.3em + 10px))',
          }}
          className="stk-block-heading__text has-text-align-center-mobile stk-block-heading--use-theme-margins font-bold text-xl lg:text-2xl"
        >
          前往《報導者》主網站
        </h2>
        <p className="stk-block-text__text">
          <span
            style={{ color: 'var(--paletteColor4, #232323)' }}
            className="stk-highlight text-sm lg:text-base"
          >
            如果你是大人，或者還想看更進階、更深度的報導，《報導者》主網站有更多調查採訪和重磅新聞。
          </span>
        </p>
      </div>
      <Link
        style={{
          border: '2px solid var(--paletteColor5)',
          letterSpacing: '.08em',
        }}
        className="w-36 lg:w-48 text-base lg:text-lg text-center px-4 py-3 rounded-full"
        href={MAIN_SITE_URL}
        target="_blank"
        rel="noreferrer noopener"
      >
        前往報導者
      </Link>
    </div>
  )
}

export default GoToMainSite
