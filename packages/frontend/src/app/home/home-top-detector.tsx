'use client'
import { useEffect } from 'react'
import { BACK_TO_TOP_ELEMENT_ID } from '@/app/constants'

const topDetectorID = 'top-detector'

export const HomeTopDetector = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const stickyHeaderElement = document.querySelector(`#sticky-header`)
        const backToTopElement = document.querySelector(
          `#${BACK_TO_TOP_ELEMENT_ID}`
        )
        if (entry.isIntersecting) {
          stickyHeaderElement?.classList?.add('hidden')
          backToTopElement?.classList?.add('hidden')
        } else {
          stickyHeaderElement?.classList?.remove('hidden')
          backToTopElement?.classList?.remove('hidden')
        }
      },
      {
        root: null,
        threshold: 0,
      }
    )

    observer.observe(document.querySelector(`#${topDetectorID}`) as Element)
  }, [])

  return <div id={topDetectorID}></div>
}

export default HomeTopDetector
