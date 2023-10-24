import {
  FBIcon,
  GithubIcon,
  IGIcon,
  MediumIcon,
  // RSSIcon,
  TwitterIcon,
} from '@/app/icons'
import { GENERAL_DESCRIPTION, SUBSCRIBE_URL } from '@/app/constants'
import './footer.scss'

const socialIcons = [
  {
    link: 'https://www.facebook.com/twreporter/',
    img: FBIcon,
  },
  {
    link: 'https://www.instagram.com/twreporter/',
    img: IGIcon,
  },
  {
    link: 'https://twitter.com/tw_reporter_org',
    img: TwitterIcon,
  },
  {
    link: 'https://medium.com/twreporter',
    img: MediumIcon,
  },
  {
    link: 'https://github.com/twreporter',
    img: GithubIcon,
  },
  /* TODO: enable RSS
  {
    link: '/feed/',
    img: RSSIcon,
  },
  */
]

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-top">
          <div className="footer-top__left">
            <picture className="footer-top__left-logo">
              <img src="/assets/images/footer-logo.svg" alt="" />
            </picture>
            <p className="footer-desc">{GENERAL_DESCRIPTION}</p>
            <div className="footer-top__left-social">
              <div className="footer-top__social-icon-group">
                {socialIcons.map((icon, index) => {
                  return (
                    <a
                      key={`social-icon-${index}`}
                      href={icon.link}
                      className="footer-top__social-icon-item"
                      target="_blank"
                    >
                      {icon.img}
                    </a>
                  )
                })}
              </div>{' '}
            </div>
          </div>
          <div className="footer-top__middle">
            <div className="footer-top__team-box">
              <a href="/about" className="footer-top__team-box-item">
                <img src="/assets/images/footer_pic1.svg" alt="我們是誰" />
                我們是誰
              </a>
              <a
                href="/about#team"
                className="footer-top__team-box-item __mPS2id"
              >
                <img src="/assets/images/footer_pic2.svg" alt="我們是誰" />
                核心團隊
              </a>
              <a
                href="/about#consultants"
                className="footer-top__team-box-item __mPS2id"
              >
                <img src="/assets/images/footer_pic3.svg" alt="我們是誰" />
                顧問群
              </a>
              <a
                href="/about#mail"
                className="footer-top__team-box-item __mPS2id"
              >
                <img src="/assets/images/footer_pic4.svg" alt="我們是誰" />
                聯絡我們
              </a>
            </div>
            <div className="footer-top__button-group">
              <a
                href="https://support.twreporter.org/"
                className="header-left__btn-1 rpjr-btn rpjr-btn-big"
                target="_blank"
              >
                贊助我們
              </a>
              <a
                href={SUBSCRIBE_URL}
                target="_blank"
                className="header-left__btn-1 rpjr-btn rpjr-btn-orange rpjr-btn-big"
              >
                訂閱我們
              </a>
              <a
                href="https://www.twreporter.org/"
                className="header-left__btn-1 rpjr-btn rpjr-btn-red rpjr-btn-big"
                target="_blank"
              >
                前往報導者
              </a>
            </div>
          </div>
          <div className="footer-top__right">
            <img
              src="/assets/images/footer_pic5.svg"
              className="footer-top__fig"
            />
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="footer-copyright-left">
          <p className="footer-number">
            公益勸募許可字號｜衛部救字第 1101363853 號{' '}
          </p>
          <div className="footer-policy">
            <a
              href="https://www.twreporter.org/a/privacy-footer"
              target="_blank"
              className="footer-link"
            >
              <strong>隱私政策</strong>
            </a>{' '}
            <a
              href="https://www.twreporter.org/a/license-footer"
              target="_blank"
              className="footer-link"
            >
              <strong>許可協議</strong>
            </a>{' '}
          </div>
        </div>
        <p>Copyright © 2023 The Reporter</p>
      </div>
    </div>
  )
}

export default Footer
