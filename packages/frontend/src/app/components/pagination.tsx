import { AngleLeft, AngleRight } from '@/app/icons'
import './pagination.scss'

type PaginationProp = {
  pageNum: number
}

export const Pagination = (props: PaginationProp) => {
  const pageNum = props?.pageNum

  return (
    pageNum > 0 && (
      <div className="pagination">
        <a className="prev" href={''}>
          {AngleLeft}
        </a>
        {Array(pageNum)
          .fill(0)
          .map((indexValue, index) => {
            return (
              <div key={`pagination-index-${index}`}>
                <a className="index" href={``}>
                  {index + 1}
                </a>
              </div>
            )
          })}
        <a className="next" href={''}>
          {AngleRight}
        </a>
      </div>
    )
  )
}

export default Pagination
