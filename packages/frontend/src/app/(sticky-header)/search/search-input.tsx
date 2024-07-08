'use client'
import { useState } from 'react'
import { SEARCH_PLACEHOLDER } from '@/app/constants'

import styles from './search-input.module.css'

export const SearchInput = (props: { value: string }) => {
  const { value } = props
  const [input, setInput] = useState(value)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <form
      className="flex flex-row max-w-md w-full h-10 mb-12"
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
        type="search"
        value={input}
        placeholder={SEARCH_PLACEHOLDER}
        name="q"
        title="Search for..."
        aria-label="Search for..."
        onChange={onInputChange}
      />
    </form>
  )
}
