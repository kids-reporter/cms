'use client'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { ArticleIntroductionDraftRenderer } from '@kids-reporter/draft-renderer'
import { RawDraftContentState } from 'draft-js'
import { Theme } from '@/app/constants'
import './brief.scss'
import 'react-loading-skeleton/dist/skeleton.css'

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

const Authors = (props: AuthorsProp) => {
  return (
    <p className="author-list">
      <span>
        {'('}
        {props?.authorGroups?.map((authorGroup, authorGroupIndex) => {
          return (
            <span key={`brief-author-group-${authorGroupIndex}`}>
              {`${authorGroup.title}／`}
              {authorGroup?.authors?.map((author, index) => {
                return (
                  <span key={`brief-author-${index}`}>
                    {author.link ? (
                      <a href={author.link} target="_blank" rel="noopener">
                        {author.name}
                      </a>
                    ) : (
                      <span>{author.name}</span>
                    )}
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
  const authors = props?.authors
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="post-intro">
      {isMounted ? (
        <>
          {content && (
            <ArticleIntroductionDraftRenderer
              rawContentState={content}
              themeColor={props.theme}
            />
          )}
          {authors?.length > 0 && <Authors authorGroups={authors} />}
        </>
      ) : (
        <Skeleton width={'100%'} count={5} />
      )}
    </div>
  )
}

export default Brief
