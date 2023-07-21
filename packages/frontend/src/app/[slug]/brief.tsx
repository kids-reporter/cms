import Editors, { EditorGroup } from './editors'

import './brief.scss'

type BriefProp = {
  content: any
  editors: EditorGroup[]
}

export const Brief = (props: BriefProp) => {
  return (
    <div className="post-intro">
      {props.content?.blocks?.map(
        (block: any, index: number) =>
          block?.text && <p key={`brief-paragraph-${index}`}>{block.text}</p>
      )}
      <Editors editorGroups={props.editors} />
    </div>
  )
}

export default Brief
