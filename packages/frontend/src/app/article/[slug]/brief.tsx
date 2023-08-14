'use client'
import { ArticleIntroductionDraftRenderer } from '@kids-reporter/draft-renderer'
import { RawDraftContentState } from 'draft-js'
import Editors, { EditorGroup } from './editors'
import { Theme } from '@/app/constants'

import './brief.scss'

type BriefProp = {
  content: RawDraftContentState
  themeColor: Theme
  editors: EditorGroup[]
}

export const Brief = (props: BriefProp) => {
  return (
    <div className="post-intro">
      <ArticleIntroductionDraftRenderer
        rawContentState={props.content}
        themeColor={props.themeColor}
      />
      <Editors editorGroups={props.editors} />
    </div>
  )
}

export default Brief
