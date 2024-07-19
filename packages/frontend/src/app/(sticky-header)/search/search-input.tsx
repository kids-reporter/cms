'use client'
import { useState } from 'react'
import { SEARCH_PLACEHOLDER, Z_INDEX_TOP } from '@/app/constants'
import { CrossIcon, SearchIcon } from '@/app/icons'

import styles from './search-input.module.css'

export const SearchInput = (props: { value: string }) => {
  const { value } = props
  const [input, setInput] = useState(value)
  const [isFocused, setIsFocused] = useState(false)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const onInputClear = () => {
    setInput('')
  }

  const onInputFocus = () => {
    setIsFocused(true)
  }

  const onInputBlur = () => {
    setIsFocused(false)
  }

  const isResultMatchKeyword = value === input

  return (
    <>
      {isFocused && (
        <div
          className="w-full h-full fixed top-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: Z_INDEX_TOP + 1,
          }}
        />
      )}
      <form
        className="flex flex-row items-center max-w-md w-full h-10 relative md:mb-12 min-[320px]:mb-10 mb-6"
        style={{ zIndex: isFocused ? Z_INDEX_TOP + 2 : Z_INDEX_TOP - 2 }}
        role="search"
        method="get"
        action="/search"
        aria-haspopup="listbox"
      >
        <input
          className={`${styles.input} w-full h-full rounded-full text-base pl-3 pr-10`}
          style={{
            color: '#232323',
            backgroundColor: '#F5F5F5',
          }}
          type="text"
          value={input}
          placeholder={SEARCH_PLACEHOLDER}
          name="q"
          title="Search for..."
          aria-label="Search for..."
          onChange={onInputChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        {!isResultMatchKeyword && (
          <button
            className={`${styles['search-icon']} w-4 h-4 absolute bg-transparent cursor-pointer border-0 right-3.5`}
            type="submit"
            aria-label="搜尋按鈕"
          >
            {SearchIcon}
          </button>
        )}
        {isResultMatchKeyword && (
          <button
            className={`${styles['search-icon']} w-4 h-4 absolute bg-transparent cursor-pointer border-0 right-3.5`}
            aria-label="清除按鈕"
            onClick={onInputClear}
          >
            {CrossIcon}
          </button>
        )}
      </form>
    </>
  )
}
