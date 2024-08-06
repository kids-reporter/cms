import { useState, useEffect, useRef } from 'react'
import { Loading } from '@/app/components/types'
import { Z_INDEX_TOP } from '@/app/constants'

enum CrossIconPos {
  INSIDE = 'inside',
  TOP_RIGHT = 'top-right',
  RIGHT_TOP = 'right-top',
}

// padding: 16px + width: 24px => 40px
const iconPadding = 40

const CrossIconPosCss = (position: CrossIconPos) => {
  switch (position) {
    case CrossIconPos.TOP_RIGHT:
      return {
        top: `-${iconPadding}px`,
        right: '0px',
      }
    case CrossIconPos.RIGHT_TOP:
      return {
        top: '0px',
        right: `-${iconPadding}px`,
      }
    case CrossIconPos.INSIDE:
    default:
      return {
        top: '0px',
        right: '0px',
      }
  }
}

export const ImageModal = (props: {
  isOpen: boolean
  imgSrc: string
  handleImgModalClose: () => void
}) => {
  const { isOpen, imgSrc, handleImgModalClose } = props
  const imgRef = useRef(null)
  const [crossIconPos, setCrossIconPos] = useState(CrossIconPos.INSIDE)

  const checkFullScreenImageSize = () => {
    if (imgRef.current) {
      const img = imgRef.current
      const imgWidth = img.offsetWidth
      const imgHeight = img.offsetHeight
      const vw = window.innerWidth
      const vh = window.innerHeight

      if (imgWidth === vw) {
        if (vh - imgHeight < iconPadding * 2) {
          setCrossIconPos(CrossIconPos.INSIDE)
        } else {
          setCrossIconPos(CrossIconPos.TOP_RIGHT)
        }
      } else if (imgHeight === vh) {
        if (vw - imgWidth < iconPadding * 2) {
          setCrossIconPos(CrossIconPos.INSIDE)
        } else {
          setCrossIconPos(CrossIconPos.RIGHT_TOP)
        }
      } else {
        // default
        setCrossIconPos(CrossIconPos.INSIDE)
      }
    }
  }

  // TODO: debounce
  const handleESCClick = (e) => {
    /*isOpen && */ e.key === 'Escape' && handleImgModalClose?.()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleESCClick)
    return () => {
      window.removeEventListener('keydown', handleESCClick)
    }
  }, [])

  useEffect(() => {
    isOpen && checkFullScreenImageSize()
  }, [isOpen])

  return (
    isOpen && (
      <div
        className="hidden lg:block fixed w-screen h-screen top-0 left-0 bg-black/50"
        style={{ zIndex: Z_INDEX_TOP + 1 }}
      >
        <button
          className="absolute top-0 right-0 white bg-transparent w-6 h-6 cursor-pointer border-none flex flex-col items-center justify-center"
          style={CrossIconPosCss(crossIconPos)}
          onClick={handleImgModalClose}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.77925 4.36516C5.38873 3.97463 4.75556 3.97463 4.36504 4.36516C3.97451 4.75568 3.97451 5.38885 4.36504 5.77937L10.5858 12.0001L4.36506 18.2208C3.97453 18.6114 3.97453 19.2445 4.36506 19.6351C4.75558 20.0256 5.38875 20.0256 5.77927 19.6351L12 13.4143L18.2207 19.6351C18.6112 20.0256 19.2444 20.0256 19.6349 19.6351C20.0255 19.2445 20.0255 18.6114 19.6349 18.2208L13.4142 12.0001L19.635 5.77937C20.0255 5.38885 20.0255 4.75568 19.635 4.36516C19.2444 3.97463 18.6113 3.97463 18.2207 4.36516L12 10.5859L5.77925 4.36516Z"
              fill="white"
            />
          </svg>
        </button>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img ref={imgRef} src={imgSrc} loading={Loading.LAZY} />
        </div>
      </div>
    )
  )
}

export default ImageModal
