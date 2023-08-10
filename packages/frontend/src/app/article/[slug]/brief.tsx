'use client'
import { ArticleIntroductionDraftRenderer } from '@kids-reporter/draft-renderer'
import Editors, { EditorGroup } from './editors'

import './brief.scss'

type BriefProp = {
  content: any
  themeColor: string
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
