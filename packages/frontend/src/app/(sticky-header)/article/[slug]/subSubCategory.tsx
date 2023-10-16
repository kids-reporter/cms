type SubSubcategoryProp = {
  text: string
  link: string
}

export const SubSubcategory = (props: SubSubcategoryProp) => {
  return (
    props.text &&
    props.link && (
      <div className="post_primary_category">
        <a className="rpjr-btn rpjr-btn-theme" href={props.link}>
          {props.text}
        </a>
      </div>
    )
  )
}

export default SubSubcategory
