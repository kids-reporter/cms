'use client'
import { ArticleIntroductionDraftRenderer } from '@kids-reporter/draft-renderer'
import { RawDraftContentState } from 'draft-js'
import { Theme } from '@/app/constants'

import './brief.scss'

export type EditorGroup = {
  title: string
  editors: {
    name: string
    link: string
  }[]
}

type EditorsProp = {
  editorGroups: EditorGroup[]
}

const Authors = (props: EditorsProp) => {
  return (
    <p style={{ textAlign: 'center' }}>
      <span style={{ color: '#575757', fontSize: '14px' }}>
        {'('}
        {props?.editorGroups?.map((editorGroup, editorGroupIndex) => {
          return (
            <>
              {`${editorGroup.title}／`}
              {editorGroup?.editors?.map((editor, index) => {
                return (
                  <>
                    <span
                      key={`editorGroup-${editorGroupIndex}`}
                      style={{ textDecoration: 'underline' }}
                    >
                      <a
                        key={`editor-${index}`}
                        style={{
                          color: '#575757',
                          textDecoration: 'underline',
                        }}
                        href={editor.link}
                        target="_blank"
                        rel="noopener"
                      >
                        {editor.name}
                      </a>
                    </span>
                    {index + 1 < editorGroup.editors.length ? '、' : ''}
                  </>
                )
              })}
              {editorGroupIndex + 1 < props.editorGroups.length ? `；` : ''}
            </>
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
  authors: EditorGroup[]
}

export const Brief = (props: BriefProp) => {
  return (
    <div className="post-intro">
      <ArticleIntroductionDraftRenderer
        rawContentState={props.content}
        themeColor={props.theme}
      />
      <Authors editorGroups={props.authors} />
    </div>
  )
}

export default Brief
