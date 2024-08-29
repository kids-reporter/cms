import { useState, useEffect } from 'react'

export enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
  DOWN_HIDDEN = 'down-hidden',
}

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.DOWN
  )

  useEffect(() => {
    let lastScrollY = window.scrollY
    const updateScrollDirection = () => {
      const direction =
        window.scrollY > lastScrollY ? ScrollDirection.DOWN : ScrollDirection.UP
      if (direction !== scrollDirection) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    window.addEventListener('scroll', updateScrollDirection)
    return () => {
      window.removeEventListener('scroll', updateScrollDirection)
    }
  }, [scrollDirection])

  return scrollDirection
}
