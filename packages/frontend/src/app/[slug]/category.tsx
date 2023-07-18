type CategoryProp = {
  text: string
  link: string
}

export const Category = (props: CategoryProp) => {
  return (
    <div className="post_primary_category">
      <a className="rpjr-btn rpjr-btn-theme" href={props.link}>
        {props.text}
      </a>
    </div>
  )
}

export default Category
