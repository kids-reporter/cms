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

export const Editors = (props: EditorsProp) => {
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

export default Editors
