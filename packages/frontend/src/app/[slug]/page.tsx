// import draftRenderer from '@kids-reporter/draft-renderer'
// TODO(Draft):
// 1. import draft from draft-renderer
import axios from 'axios'

import '../assets/css/post.css'
import '../assets/css/dot-hr.css'
import '../assets/css/icomoon/style.css'

const apiURL = 'https://dev-kids-cms.twreporter.org/api/graphql'

export default async function Article({
  params,
}: {
  params: { slug: string }
}) {
  const response = await axios.post(apiURL, {
    query: `
          query($where: PostWhereUniqueInput!) {
            post(where: $where) {
              name
              brief
              content
            }
          }
        `,
    variables: {
      where: {
        slug: params.slug,
      },
    },
  })
  const post = response?.data?.data?.post
  console.log(post)

  return (
    <div className="post">
      <h1>Article slug: {params.slug}</h1>
      <h1>Article title: {post.name}</h1>
      <div className="hero-section" data-type="type-1">
        <header className="entry-header">
          <h1
            className="page-title"
            title="我在動物園上課的3個月，讓我立志想成為設計動物園展場的人"
            // itemprop="headline"
          >
            我在動物園上課的3個月，讓我立志想成為設計動物園展場的人
          </h1>
          <div className="post_date_category">
            <div className="post_date">刊出日期 2023.07.07</div>
            <div className="post_primary_category">
              <a
                href="/category/university-exploratory-learning-teaching"
                className="rpjr-btn rpjr-btn-theme"
              >
                大學好好玩
              </a>
            </div>
          </div>
        </header>
      </div>
      <div className="post-intro">
        <p>
          台灣大學「探索學習」課程打破了學習場域與修課的界限，讓學習不再只限於校內。學生得以運用校內及外部資源，自行制定學習內容、也能拿到課堂學分。學生透過探索計畫找到學習方向、甚至尋回學習動機。
        </p>
        <p>
          本文作者張恩瑋喜愛動物，2022年參與探索學習課程，她便選擇探索「動物園」產業，推助她從農業化學系轉系到動物科學技術學系，申請上創新領域學士學位學程。
        </p>
        {/*<p><span style="color: #575757"><code>（文字／<span style="text-decoration: underline"><a style="color: #575757;text-decoration: underline" href="https://kids.twreporter.org/staff/chang-en-wei/" target="_blank" rel="noopener">張恩瑋</a></span>；設計／<span style="text-decoration: underline"><a style="color: #575757;text-decoration: underline" href="https://kids.twreporter.org/staff/wang-chia-chen/" target="_blank" rel="noopener">王家琛</a></span>、<span style="text-decoration: underline"><a style="color: #575757;text-decoration: underline" href="https://kids.twreporter.org/staff/hychen/" target="_blank" rel="noopener">黃禹禛</a></span>；核稿／<span style="text-decoration: underline"><a style="color: #575757;text-decoration: underline" href="https://kids.twreporter.org/staff/jill718/" target="_blank" rel="noopener">楊惠君</a></span>；責任編輯／<span style="text-decoration: underline"><a style="color: #575757;text-decoration: underline" href="https://kids.twreporter.org/staff/yunruchen/" target="_blank" rel="noopener">陳韻如</a></span>）</code></span></p>*/}
        {
          <p>
            <span style={{ color: '#575757' }}>
              <code>
                （文字／
                <span style={{ textDecoration: 'underline' }}>
                  <a
                    style={{ color: '#575757', textDecoration: 'underline' }}
                    href="https://kids.twreporter.org/staff/chang-en-wei/"
                    target="_blank"
                    rel="noopener"
                  >
                    張恩瑋
                  </a>
                </span>
                ；設計／
                <span style={{ textDecoration: 'underline' }}>
                  <a
                    style={{ color: '#575757', textDecoration: 'underline' }}
                    href="https://kids.twreporter.org/staff/wang-chia-chen/"
                    target="_blank"
                    rel="noopener"
                  >
                    王家琛
                  </a>
                </span>
                、
                <span style={{ textDecoration: 'underline' }}>
                  <a
                    style={{ color: '#575757', textDecoration: 'underline' }}
                    href="https://kids.twreporter.org/staff/hychen/"
                    target="_blank"
                    rel="noopener"
                  >
                    黃禹禛
                  </a>
                </span>
                ；核稿／
                <span style={{ textDecoration: 'underline' }}>
                  <a
                    style={{ color: '#575757', textDecoration: 'underline' }}
                    href="https://kids.twreporter.org/staff/jill718/"
                    target="_blank"
                    rel="noopener"
                  >
                    楊惠君
                  </a>
                </span>
                ；責任編輯／
                <span style={{ textDecoration: 'underline' }}>
                  <a
                    style={{ color: '#575757', textDecoration: 'underline' }}
                    href="https://kids.twreporter.org/staff/yunruchen/"
                    target="_blank"
                    rel="noopener"
                  >
                    陳韻如
                  </a>
                </span>
                ）
              </code>
            </span>
          </p>
        }
      </div>
      <hr className="dot-hr mt-18 mb-18" />
      <div className="rpjr-post-tags">
        <h3 className="rpjr-post-tags__heading">
          <i className="icon-rpjr-icon-tag">
            <i className="path1 text-color-theme"></i>
            <i className="path2"></i>
          </i>
          &nbsp;&nbsp;常用關鍵字
        </h3>
        <div className="rpjr-post-tags__box">
          <a
            href="https://kids.twreporter.org/tag/%e5%8b%95%e7%89%a9%e4%bf%9d%e8%ad%b7/"
            className="rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag"
          >
            #&nbsp;動物保護
          </a>
          <a
            href="https://kids.twreporter.org/tag/%e5%a4%a7%e5%ad%b8%e5%a5%bd%e5%a5%bd%e7%8e%a9/"
            className="rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag"
          >
            #&nbsp;大學好好玩
          </a>
          <a
            href="https://kids.twreporter.org/tag/%e6%95%99%e8%82%b2/"
            className="rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag"
          >
            #&nbsp;教育
          </a>
          <a
            href="https://kids.twreporter.org/tag/%e7%94%9f%e5%91%bd/"
            className="rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag"
          >
            #&nbsp;生命
          </a>
        </div>
      </div>
      {/* TODO: draftRenderer */}
    </div>
  )
}
