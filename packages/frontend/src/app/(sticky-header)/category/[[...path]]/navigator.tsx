type NavigatorProp = {
  name: string
  path: string
  active?: boolean
}

// TODO: fix active style
export const Navigator = (props: NavigatorProp) => {
  const name = props.name
  const path = props.path

  return (
    <a
      className={`rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag ${
        props.active ? 'active' : ''
      }`}
      href={path}
    >
      &nbsp;{name}
    </a>
  )
}

export default Navigator
