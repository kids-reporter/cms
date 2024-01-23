'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { mediaQuery } from '@/app/utils/media-query'

const TOCContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  ${mediaQuery.mediumAbove} {
  }

  ${mediaQuery.smallOnly} {
  }
`

export const TableOfContent = ({ post }: { post: any }) => {
  const entityMap = post?.content?.entityMap
  const tocs: { id: string; label: string }[] = []
  Object.keys(entityMap)?.forEach((key) => {
    // TODO: replace LINK with TOC
    if (entityMap[key]?.type === 'LINK') {
      tocs.push({
        id: `table-of-content-${key}`,
        label: entityMap[key].data?.url ?? '',
      })
    }
  })

  return (
    <TOCContainer>
      {tocs.map(
        (toc, index) =>
          toc && (
            <Link key={`toc-key-${index}`} href="#" id={'111'}>
              {toc.label}
              <br />
            </Link>
          )
      )}
    </TOCContainer>
  )
}

export default TableOfContent
