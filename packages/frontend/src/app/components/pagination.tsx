'use client'
import { AngleLeft, AngleRight } from '@/app/icons'
import './pagination.scss'

type PaginationProp = {
  currentPage: number
  totalPages: number
}

export const Pagination = (props: PaginationProp) => {
  const currentPage = props?.currentPage
  const totalPages = props?.totalPages

  if (!totalPages || !currentPage) {
    return null
  }

  const handleClickPrev = () => {
    console.log('click prev')
  }

  const handleClickNext = () => {
    console.log('click next')
  }

  const pagesArrayJSX = Array(totalPages)
    .fill(0)
    .map((indexValue, index) => {
      const pageIndex = index + 1
      return (
        <div key={`pagination-index-${pageIndex}`}>
          <a
            className={`index ${pageIndex === currentPage ? 'active' : ''}`}
            href={`/all/${pageIndex}`}
          >
            {pageIndex}
          </a>
        </div>
      )
    })
  const belowFirstPage = currentPage <= 1
  const aboveFinalPage = currentPage >= totalPages

  return (
    totalPages > 0 && (
      <div className="pagination">
        {belowFirstPage ? null : (
          <button onClick={handleClickPrev}>{AngleLeft}</button>
        )}
        {pagesArrayJSX}
        {aboveFinalPage ? null : (
          <button onClick={handleClickNext}>{AngleRight}</button>
        )}
      </div>
    )
  )
}

export default Pagination
