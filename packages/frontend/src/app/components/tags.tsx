import './tags.scss'

export type Tag = {
  name: string
  slug: string
}

type TagsProp = {
  title?: string
  tags: Tag[]
  fill?: boolean
}

export const Tags = (props: TagsProp) => {
  const title = props?.title
  const tags = props?.tags

  return (
    <div className="tags">
      {title && (
        <h3 className="rpjr-post-tags__heading">
          <i className="icon-rpjr-icon-tag">
            <i className="path1 text-color-theme"></i>
            <i className="path2"></i>
          </i>
          &nbsp;&nbsp;{title}
        </h3>
      )}
      {tags?.length > 0 && (
        <div className="rpjr-post-tags__box">
          {tags.map((tag, index) => {
            return (
              tag && (
                <a
                  key={`post-tag-${index}`}
                  className={`rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag ${
                    props?.fill ? 'fill' : ''
                  }`}
                  href={`/tag/${tag.slug}`}
                >
                  #&nbsp;{tag.name}
                </a>
              )
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Tags
