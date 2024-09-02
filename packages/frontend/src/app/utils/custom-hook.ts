import { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

export enum ScrollLevel {
  UP = 'up',
  DOWN_MINI = 'down-mini',
  DOWN_HIDDEN = 'down-hidden',
}

enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
}

const scrollDownDistance = 100
const throttleThreshold = 500

export const useScrollLevel = () => {
  const [scrollLevel, setScrollLevel] = useState<ScrollLevel>(ScrollLevel.UP)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const updateScrollLevel = throttle(() => {
      if (Math.abs(window.scrollY - lastScrollY) < scrollDownDistance) {
        return
      }
      const direction =
        window.scrollY > lastScrollY ? ScrollDirection.DOWN : ScrollDirection.UP
      let level = ScrollLevel.UP
      if (direction === ScrollDirection.DOWN) {
        level =
          scrollLevel === ScrollLevel.UP
            ? ScrollLevel.DOWN_MINI
            : ScrollLevel.DOWN_HIDDEN
      }
      level !== scrollLevel && setScrollLevel(level)
      lastScrollY = scrollY > 0 ? scrollY : 0
    }, throttleThreshold)

    window.addEventListener('scroll', updateScrollLevel, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScrollLevel)
    }
  }, [scrollLevel])

  return scrollLevel
}
