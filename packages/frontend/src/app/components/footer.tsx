import Link from 'next/link'
import {
  FBIcon,
  GithubIcon,
  IGIcon,
  MediumIcon,
  RSSIcon,
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
  {
    link: '/feed/',
    img: RSSIcon,
  },
]

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-action">
        <div className="footer-container">
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
                      <Link
                        key={`social-icon-${index}`}
                        href={icon.link}
                        className="footer-top__social-icon-item"
                        target="_blank"
                      >
                        {icon.img}
                      </Link>
                    )
                  })}
                </div>{' '}
              </div>
            </div>
            <div className="footer-top__middle">
              <div className="footer-top__team-box">
                <Link href="/about" className="footer-top__team-box-item">
                  <img src="/assets/images/footer_pic1.svg" alt="我們是誰" />
                  我們是誰
                </Link>
                <Link
                  href="/about#team"
                  className="footer-top__team-box-item __mPS2id"
                >
                  <img src="/assets/images/footer_pic2.svg" alt="我們是誰" />
                  核心團隊
                </Link>
                <Link
                  href="/about#consultants"
                  className="footer-top__team-box-item __mPS2id"
                >
                  <img src="/assets/images/footer_pic3.svg" alt="我們是誰" />
                  顧問群
                </Link>
                <Link
                  href="/about#mail"
                  className="footer-top__team-box-item __mPS2id"
                >
                  <img src="/assets/images/footer_pic4.svg" alt="我們是誰" />
                  聯絡我們
                </Link>
              </div>
              <div className="footer-top__button-group">
                <Link
                  href="https://support.twreporter.org/"
                  className="header-left__btn-1 rpjr-btn rpjr-btn-big"
                  target="_blank"
                >
                  贊助我們
                </Link>
                <Link
                  href={SUBSCRIBE_URL}
                  target="_blank"
                  className="header-left__btn-1 rpjr-btn rpjr-btn-orange rpjr-btn-big"
                >
                  訂閱我們
                </Link>
                <Link
                  href="https://www.twreporter.org/"
                  className="header-left__btn-1 rpjr-btn rpjr-btn-red rpjr-btn-big"
                  target="_blank"
                >
                  前往報導者
                </Link>
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
      </div>
      <div className="footer-copyright">
        <div className="footer-container">
          <div className="footer-copyright-left">
            <p className="footer-number">
              公益勸募許可字號｜衛部救字第 1101363853 號{' '}
            </p>
            <div className="footer-policy">
              <Link
                href="https://www.twreporter.org/a/privacy-footer"
                target="_blank"
                className="footer-link"
              >
                <strong>隱私政策</strong>
              </Link>{' '}
              <Link
                href="https://www.twreporter.org/a/license-footer"
                target="_blank"
                className="footer-link"
              >
                <strong>許可協議</strong>
              </Link>{' '}
            </div>
          </div>
          <p>Copyright © 2023 The Reporter</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
