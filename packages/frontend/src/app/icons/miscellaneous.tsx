import { ThemeColor } from '@/app/constants'

export const CrossIcon = (
  <svg className="ct-icon" width="12" height="12" viewBox="0 0 15 15">
    <path d="M1 15a1 1 0 01-.71-.29 1 1 0 010-1.41l5.8-5.8-5.8-5.8A1 1 0 011.7.29l5.8 5.8 5.8-5.8a1 1 0 011.41 1.41l-5.8 5.8 5.8 5.8a1 1 0 01-1.41 1.41l-5.8-5.8-5.8 5.8A1 1 0 011 15z"></path>
  </svg>
)

export const HamburgerIcon = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 18 14"
    aria-hidden="true"
    data-type="type-1"
  >
    <rect fill={ThemeColor.BLUE} y="0.00" width="18" height="3" rx="1"></rect>
    <rect fill={ThemeColor.RED} y="6.15" width="18" height="3" rx="1"></rect>
    <rect fill={ThemeColor.YELLOW} y="12.3" width="18" height="3" rx="1"></rect>
  </svg>
)

export const SearchIcon = (
  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 15 15">
    <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7z M1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
  </svg>
)
