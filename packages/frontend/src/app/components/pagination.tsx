import './pagination.scss'

type PaginationProp = {
  pageNum: number
}

export const Pagination = (props: PaginationProp) => {
  const pageNum = props?.pageNum

  return (
    pageNum > 0 && (
      <div className="pagination">
        {Array(pageNum).map((pageIndex) => {
          return (
            <div key={`pagination-index-${pageIndex}`}>
              <a href={``}>{pageIndex}</a>
            </div>
          )
        })}
      </div>
    )
  )
}
