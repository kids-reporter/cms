'use client'
import { ArticleIntroductionDraftRenderer } from '@kids-reporter/draft-renderer'
import { RawDraftContentState } from 'draft-js'
import { Theme } from '@/app/constants'

import './brief.scss'

export type AuthorGroup = {
  title: string
  authors: {
    name: string
    link: string
  }[]
}

type AuthorsProp = {
  authorGroups: AuthorGroup[]
}

// TODO: refactor to clear
const Authors = (props: AuthorsProp) => {
  return (
    <p style={{ textAlign: 'center' }}>
      <span style={{ color: '#575757', fontSize: '14px' }}>
        {'('}
        {props?.authorGroups?.map((authorGroup, authorGroupIndex) => {
          return (
            <span key={`brief-author-group-${authorGroupIndex}`}>
              {`${authorGroup.title}／`}
              {authorGroup?.authors?.map((author, index) => {
                return (
                  <span key={`brief-author-${index}`}>
                    <span style={{ textDecoration: 'underline' }}>
                      <a
                        style={{
                          color: '#575757',
                          textDecoration: 'underline',
                        }}
                        href={author.link}
                        target="_blank"
                        rel="noopener"
                      >
                        {author.name}
                      </a>
                    </span>
                    {index + 1 < authorGroup.authors.length ? '、' : ''}
                  </span>
                )
              })}
              {authorGroupIndex + 1 < props.authorGroups.length ? `；` : ''}
            </span>
          )
        })}
        {')'}
      </span>
    </p>
  )
}

type BriefProp = {
  content: RawDraftContentState
  theme: Theme
  authors: AuthorGroup[]
}

export const Brief = (props: BriefProp) => {
  const content = props?.content
  return (
    content && (
      <div className="post-intro">
        <ArticleIntroductionDraftRenderer
          rawContentState={content}
          themeColor={props.theme}
        />
        {props.authors && <Authors authorGroups={props.authors} />}
      </div>
    )
  )
}

export default Brief
