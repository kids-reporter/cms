import Link from 'next/link'

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
    <div className="flex flex-col items-center">
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
        <div
          style={{ columnGap: '15px', rowGap: '30px' }}
          className="max-w-xl w-full flex flex-wrap items-center justify-center mt-6 ml-auto mx-auto mb-0"
        >
          {tags.map((tag, index) => {
            return (
              tag && (
                <Link
                  key={`post-tag-${index}`}
                  style={
                    props?.fill
                      ? {
                          background: 'var(--theme-color) !important',
                          color: 'black !important',
                        }
                      : {}
                  }
                  className={'rpjr-post_tags__tag-item rpjr-btn rpjr-btn-tag'}
                  href={`/tag/${tag.slug}`}
                >
                  #&nbsp;{tag.name}
                </Link>
              )
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Tags
