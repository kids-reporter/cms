import { CrossIcon } from '@/app/icons'

export const ImageModal = (props: {
  isOpen: boolean
  imgSrc: string
  handleImgModalClose: () => void
}) => {
  const { isOpen, imgSrc, handleImgModalClose } = props

  return (
    isOpen && (
      <div
        className="absolute w-screen h-screen top-0 left-0 bg-black"
        style={{ zIndex: '2000' }}
      >
        <button
          className="absolute top-0 right-0 bg-transparent w-10 cursor-pointer border-none"
          onClick={handleImgModalClose}
        >
          {CrossIcon}
        </button>
        <img src={imgSrc} />
      </div>
    )
  )
}

export default ImageModal
