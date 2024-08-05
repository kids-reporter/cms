import { Loading } from '@/app/components/types'
import { CrossIcon } from '@/app/icons'
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
        style={{ zIndex: Z_INDEX_TOP }}
      >
        <button
          className="absolute top-0 right-0 white bg-transparent w-10 cursor-pointer border-none"
          onClick={handleImgModalClose}
        >
          {CrossIcon}
        </button>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src={imgSrc} loading={Loading.LAZY} />
        </div>
      </div>
    )
  )
}

export default ImageModal
