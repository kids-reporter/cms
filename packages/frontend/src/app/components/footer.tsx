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
import styles from './footer.module.css'

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
    link: 'https://kids-storage.twreporter.org/rss/rss.xml',
    img: RSSIcon,
  },
]

export const Footer = () => {
  return (
    <div className="flex flex-col w-full mt-10">
      <div
        style={{ padding: 'var(--stk-block-background-padding)' }}
        className="flex w-full bg-gray-100 justify-center overflow-hidden"
      >
        <div
          style={{
            width: 'var(--container-width)',
            maxWidth: 'var(--normal-container-max-width)',
          }}
          className={styles['footer-top']}
        >
          <div className={styles['footer-top__left']}>
            <picture className={styles['footer-top__left-logo']}>
              <img src="/assets/images/footer-logo.svg" alt="" />
            </picture>
            <p
              style={{ letterSpacing: 'var(--letterSpacing)' }}
              className="leading-8 mb-8"
            >
              {GENERAL_DESCRIPTION}
            </p>
            <div className={styles['footer-top__left-social']}>
              <div className={styles['footer-top__social-icon-group']}>
                {socialIcons.map((icon, index) => {
                  return (
                    <Link
                      key={`social-icon-${index}`}
                      href={icon.link}
                      className={styles['footer-top__social-icon-item']}
                      target="_blank"
                    >
                      {icon.img}
                    </Link>
                  )
                })}
              </div>{' '}
            </div>
          </div>
          <div className={styles['footer-top__middle']}>
            <div className={styles['footer-top__team-box']}>
              <Link
                href="/about"
                className={styles['footer-top__team-box-item']}
              >
                <img src="/assets/images/footer_pic1.svg" alt="我們是誰" />
                我們是誰
              </Link>
              <Link
                href="/about#team"
                className={`${styles['footer-top__team-box-item']} __mPS2id`}
              >
                <img src="/assets/images/footer_pic2.svg" alt="我們是誰" />
                核心團隊
              </Link>
              <Link
                href="/about#consultants"
                className={`${styles['footer-top__team-box-item']} __mPS2id`}
              >
                <img src="/assets/images/footer_pic3.svg" alt="我們是誰" />
                顧問群
              </Link>
              <Link
                href="/about#mail"
                className={`${styles['footer-top__team-box-item']} __mPS2id`}
              >
                <img src="/assets/images/footer_pic4.svg" alt="我們是誰" />
                聯絡我們
              </Link>
            </div>
            <div className={styles['footer-top__button-group']}>
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
          <div className={styles['footer-top__right']}>
            <img
              src="/assets/images/footer_pic5.svg"
              className={styles['footer-top__fig']}
            />
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: 'var(--paletteColor6)' }}
        className="w-full flex items-center flex-row justify-between p-10"
      >
        <div
          style={{
            width: 'var(--container-width)',
            maxWidth: 'var(--normal-container-max-width)',
            minHeight: 'var(--shrink-height, var(--height))',
          }}
          className="flex flex-col lg:flex-row justify-center pb-16 lg:pb-0 gap-5 lg:gap-0 lg:justify-between items-center ml-auto mr-auto "
        >
          <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
            <p
              style={{
                letterSpacing: 'var(--letterSpacing)',
                color: 'var(--paletteColor4)',
              }}
              className="footer-number text-xs md:text-sm"
            >
              公益勸募許可字號｜衛部救字第1121364182號{' '}
            </p>
            <div
              className={`${styles['footer-policy']} flex flex-row justify-center flex-no-wrap gap-5`}
            >
              <Link
                href="https://www.twreporter.org/a/privacy-footer"
                target="_blank"
                className="text-gray-900 font-medium text-base"
              >
                <strong>隱私政策</strong>
              </Link>{' '}
              <Link
                href="https://www.twreporter.org/a/license-footer"
                target="_blank"
                className="text-gray-900 font-medium text-base"
              >
                <strong>許可協議</strong>
              </Link>{' '}
            </div>
          </div>
          <p
            style={{
              letterSpacing: 'var(--letterSpacing)',
              color: 'var(--paletteColor4)',
            }}
            className="footer-number text-xs md:text-sm"
          >
            Copyright © 2024 The Reporter
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
