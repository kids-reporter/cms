'use client'
import { FALLBACK_IMG } from '@/app/constants'

export const ImageWithFallback = (
  props: React.ImgHTMLAttributes<HTMLImageElement>
) => {
  return (
    <img
      {...props}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = FALLBACK_IMG
      }}
    />
  )
}
