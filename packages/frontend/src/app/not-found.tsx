import { StickyHeader } from '@/app/components/header'
import TopDetector from '@/app/components/top-detector'
import { SearchIcon } from '@/app/icons'

export default function NotFound() {
  return (
    <>
      <StickyHeader />
      <div
        style={{ width: '95vw' }}
        className="flex flex-col justify-center items-center mb-16"
      >
        <TopDetector />
        <img
          className="max-w-72 md:max-w-md lg:max-w-xl w-full"
          src="/assets/images/404.png"
          alt="Not found"
        />
        <div className="flex flex-col justify-center items-center gap-2.5">
          <h1 className="text-3xl md:text-4xl font-bold">
            很抱歉，找不到符合條件的頁面。
          </h1>
          <div
            style={{
              fontFamily: 'var(--fontFamily)',
              color: 'var(--paletteColor3)',
            }}
            className="text-base font-medium"
          >
            看起來在這個位置找不到東西。也許可以試著找其他的？
          </div>
        </div>
        <form
          role="search"
          method="get"
          className="max-w-sm w-full h-10 flex flex-row items-center mt-6 mb-12 relative"
          action="/search"
          aria-haspopup="listbox"
          data-live-results="thumbs"
        >
          <input
            className="w-full h-full border-solid border-2 rounded-full text-base bg-white pl-3 pr-10 focus:outline-none"
            style={{
              color: 'var(#A3A3A3, var(--color))',
              borderColor: 'var(--paletteColor1)',
            }}
            type="text"
            placeholder="搜尋"
            name="q"
            title="Search for..."
            aria-label="Search for..."
          />
          <button
            type="submit"
            className="w-4 h-4 absolute bg-transparent cursor-pointer border-0 right-2.5"
            aria-label="搜尋按鈕"
          >
            {SearchIcon}
          </button>
        </form>
      </div>
    </>
  )
}
