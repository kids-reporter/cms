type NavigatorProp = {
  name: string
  path: string
  active?: boolean
}

export const Navigator = (props: NavigatorProp) => {
  const name = props.name
  const path = props.path

  return (
    <a
      className={`rpjr-btn-ghost rpjr-btn ${
        props.active ? 'rpjr-btn__current' : ''
      }`}
      href={path}
    >
      &nbsp;{name}
    </a>
  )
}

export default Navigator
