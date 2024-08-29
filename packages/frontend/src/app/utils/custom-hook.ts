import { useState, useEffect } from 'react'

export enum ScrollLevel {
  UP = 'up',
  DOWN_MINI = 'down-mini',
  DOWN_HIDDEN = 'down-hidden',
}

export const useScrollLevel = () => {
  const [scrollLevel, setScrollLevel] = useState<ScrollLevel>(ScrollLevel.UP)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const updateScrollLevel = () => {
      const direction =
        window.scrollY > lastScrollY ? ScrollLevel.DOWN_HIDDEN : ScrollLevel.UP
      if (direction !== scrollLevel) {
        setScrollLevel(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    window.addEventListener('scroll', updateScrollLevel)
    return () => {
      window.removeEventListener('scroll', updateScrollLevel)
    }
  }, [scrollLevel])

  return scrollLevel
}
