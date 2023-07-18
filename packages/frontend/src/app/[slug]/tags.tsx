type Tag = {
  text: string
  link: string
}

type TagsProp = {
  tags: Tag[]
}

export const Tags = (props: TagsProp) => {
  return (
    <div className="rpjr-post-tags">
      <h3 className="rpjr-post-tags__heading">
        <i className="icon-rpjr-icon-tag">
          <i className="path1 text-color-theme"></i>
          <i className="path2"></i>
        </i>
        &nbsp;&nbsp;常用關鍵字
      </h3>
      <div className="rpjr-post-tags__box">
        {props?.tags.map((tag, index) => {
          return (
            <a
              key={`post-tag-${index}`}
              className="rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag"
              href={tag.link}
            >
              #&nbsp;{tag.text}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Tags
