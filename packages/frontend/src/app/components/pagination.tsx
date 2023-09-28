'use client'
import styled from 'styled-components'
import { mediaQuery } from '@/app/utils/media-query'
import { AngleLeft, AngleRight } from '@/app/icons'
import './pagination.scss'

type PaginationProp = {
  currentPage: number
  totalPages: number
}

const styles = {
  btnBoxSize: {
    mobile: 36,
    desktop: 28,
  },
  prevNextBtnPadding: [0, 20, 2, 20],
  ellipsisBoxPadding: [10, 6, 10, 6],
  containerMargin: {
    default: [64, 'auto', 120, 'auto'],
    mobile: [32, 'auto', 64, 'auto'],
  },
}

const Box = styled.div`
  margin: 0 5px 0 5px;
  width: ${styles.btnBoxSize.desktop}px;
  height: ${styles.btnBoxSize.desktop}px;
  box-sizing: border-box;
  user-select: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  color: black;
  position: relative;
  > :first-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const EllipsisBox = styled(Box)`
  cursor: default;
  padding: ${styles.ellipsisBoxPadding
    .map((value) => (value === 0 ? '0' : `${value}px`))
    .join(' ')};
  ${mediaQuery.smallOnly} {
    display: none;
  }
`

export const Pagination = (props: PaginationProp) => {
  const currentPage = props?.currentPage
  const totalPages = props?.totalPages

  if (!totalPages || !currentPage) {
    return null
  }

  const buildPageBox = (pageIndex: number) => {
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
  }

  const buildCenterJSX = (startAt: number, length: number) => {
    const centerJSX = []
    const endAt = startAt + length - 1
    for (let i = startAt; i <= endAt; i += 1) {
      centerJSX.push(buildPageBox(i))
    }
    return centerJSX
  }

  const buildPagesArray = () => {
    const ellipsis = '…'
    const nOfCenterPages = 4
    const nOfMarginPages = 1
    const pagesArrayMaxLength = nOfCenterPages + (nOfMarginPages + 1) * 2
    /* Case 1: display all pages (no ellipsis) */
    if (totalPages <= pagesArrayMaxLength) {
      const pagesArray = []
      for (let page = 1; page <= totalPages; page += 1) {
        pagesArray.push(buildPageBox(page))
      }
      return pagesArray
    }
    /* Case 2: display ellipsis */
    const isCurrentPageInLeftRange =
      currentPage <= nOfMarginPages + nOfCenterPages
    const isCurrentPageInRightRange =
      currentPage > totalPages - nOfMarginPages - nOfCenterPages
    const leftEllipsisJSX = (
      <EllipsisBox key="left-ellipsis">{ellipsis}</EllipsisBox>
    )
    const rightEllipsisJSX = (
      <EllipsisBox key="right-ellipsis">{ellipsis}</EllipsisBox>
    )
    /* build margin page boxes */
    const leftMarginJSX = []
    for (let page = 1; page <= nOfMarginPages; page += 1) {
      leftMarginJSX.push(buildPageBox(page))
    }
    const rightMarginJSX = []
    for (let i = 1; i <= nOfMarginPages; i += 1) {
      const page = totalPages - nOfMarginPages + i
      rightMarginJSX.push(buildPageBox(page))
    }

    if (isCurrentPageInLeftRange) {
      /* Case 2-1: only show right ellipsis */
      const startAt = nOfMarginPages + 1
      const length = nOfCenterPages + 1
      return (
        <>
          {leftMarginJSX}
          {buildCenterJSX(startAt, length)}
          {rightEllipsisJSX}
          {rightMarginJSX}
        </>
      )
    } else if (isCurrentPageInRightRange) {
      /* Case 2-2: only show left ellipsis */
      const startAt = totalPages - nOfMarginPages - nOfCenterPages
      const length = nOfCenterPages + 1
      return (
        <>
          {leftMarginJSX}
          {leftEllipsisJSX}
          {buildCenterJSX(startAt, length)}
          {rightMarginJSX}
        </>
      )
    }
    /* Case 2-3: show both ellipses */
    const startAt = currentPage - Math.floor(nOfCenterPages / 2) + 1
    const length = nOfCenterPages
    return (
      <>
        {leftMarginJSX}
        {leftEllipsisJSX}
        {buildCenterJSX(startAt, length)}
        {rightEllipsisJSX}
        {rightMarginJSX}
      </>
    )
  }

  const pagesArrayJSX = buildPagesArray()
  const belowFirstPage = currentPage <= 1
  const aboveFinalPage = currentPage >= totalPages

  return (
    totalPages > 0 && (
      <div className="pagination">
        {belowFirstPage ? null : (
          <a className="prev" href={`/all/${currentPage - 1}`}>
            {AngleLeft}
          </a>
        )}
        {pagesArrayJSX}
        {aboveFinalPage ? null : (
          <a className="next" href={`/all/${currentPage + 1}`}>
            {AngleRight}
          </a>
        )}
      </div>
    )
  )
}

export default Pagination
