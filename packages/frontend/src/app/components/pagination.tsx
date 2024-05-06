'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { mediaQuery } from '@/app/utils/media-query'
import { AngleLeft, AngleRight } from '@/app/icons'
import styles from './pagination.module.css'

type PaginationProp = {
  currentPage: number
  totalPages: number
  routingPrefix: string
}

const localStyles = {
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
  width: ${localStyles.btnBoxSize.desktop}px;
  height: ${localStyles.btnBoxSize.desktop}px;
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
  padding: ${localStyles.ellipsisBoxPadding
    .map((value) => (value === 0 ? '0' : `${value}px`))
    .join(' ')};
  ${mediaQuery.smallOnly} {
    display: none;
  }
`

export const Pagination = (props: PaginationProp) => {
  const currentPage = props?.currentPage
  const totalPages = props?.totalPages
  const routingPrefix = props?.routingPrefix

  if (!totalPages || !currentPage || !routingPrefix) {
    return null
  }

  const buildPageBox = (pageIndex: number) => {
    return (
      <div key={`pagination-index-${pageIndex}`}>
        <Link
          style={{
            transition: 'all 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
          }}
          className={`${
            styles.index
          } w-10 h-10 flex flex-row justify-center items-center text-xl font-bold text-gray-900 bg-gray-200 m-1 rounded-full border-2 border-transparent cursor-pointer ${
            pageIndex === currentPage ? styles.active : ''
          }`}
          href={`${routingPrefix}/${pageIndex}`}
        >
          {pageIndex}
        </Link>
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
      <div className="w-full flex flex-row justify-center items-center flex-wrap">
        {belowFirstPage ? null : (
          <Link
            className="flex items-center justify-center cursor-pointer mx-5"
            href={`${routingPrefix}/${currentPage - 1}`}
          >
            {AngleLeft}
          </Link>
        )}
        {pagesArrayJSX}
        {aboveFinalPage ? null : (
          <Link
            className="flex items-center justify-center cursor-pointer mx-5"
            href={`${routingPrefix}/${currentPage + 1}`}
          >
            {AngleRight}
          </Link>
        )}
      </div>
    )
  )
}

export default Pagination
