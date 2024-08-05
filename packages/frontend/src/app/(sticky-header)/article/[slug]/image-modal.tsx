import { Loading } from '@/app/components/types'
import { Z_INDEX_TOP } from '@/app/constants'

export const ImageModal = (props: {
  isOpen: boolean
  imgSrc: string
  handleImgModalClose: () => void
}) => {
  const { isOpen, imgSrc, handleImgModalClose } = props

  return (
    isOpen && (
      <div
        className="fixed w-screen h-screen top-0 left-0 bg-black/50"
        style={{ zIndex: Z_INDEX_TOP + 1 }}
      >
        <button
          className="absolute top-0 right-0 white bg-transparent w-6 h-6 cursor-pointer border-none flex flex-col items-center justify-center"
          onClick={handleImgModalClose}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.77925 4.36516C5.38873 3.97463 4.75556 3.97463 4.36504 4.36516C3.97451 4.75568 3.97451 5.38885 4.36504 5.77937L10.5858 12.0001L4.36506 18.2208C3.97453 18.6114 3.97453 19.2445 4.36506 19.6351C4.75558 20.0256 5.38875 20.0256 5.77927 19.6351L12 13.4143L18.2207 19.6351C18.6112 20.0256 19.2444 20.0256 19.6349 19.6351C20.0255 19.2445 20.0255 18.6114 19.6349 18.2208L13.4142 12.0001L19.635 5.77937C20.0255 5.38885 20.0255 4.75568 19.635 4.36516C19.2444 3.97463 18.6113 3.97463 18.2207 4.36516L12 10.5859L5.77925 4.36516Z"
              fill="white"
            />
          </svg>
        </button>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src={imgSrc} loading={Loading.LAZY} />
        </div>
      </div>
    )
  )
}

export default ImageModal
