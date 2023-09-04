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

export const AngleLeft = (
  <svg width="18px" height="18px" viewBox="0 0 15 15">
    <path
      fill="#A3A3A3"
      className="st0"
      d="M10.9,15c-0.2,0-0.4-0.1-0.6-0.2L3.6,8c-0.3-0.3-0.3-0.8,0-1.1l6.6-6.6c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1L5.2,7.4l6.2,6.2c0.3,0.3,0.3,0.8,0,1.1C11.3,14.9,11.1,15,10.9,15z"
    ></path>
  </svg>
)

export const AngleRight = (
  <svg width="18px" height="18px" viewBox="0 0 15 15">
    <path
      fill="#A3A3A3"
      className="st0"
      d="M4.1,15c0.2,0,0.4-0.1,0.6-0.2L11.4,8c0.3-0.3,0.3-0.8,0-1.1L4.8,0.2C4.5-0.1,4-0.1,3.7,0.2C3.4,0.5,3.4,1,3.7,1.3l6.1,6.1l-6.2,6.2c-0.3,0.3-0.3,0.8,0,1.1C3.7,14.9,3.9,15,4.1,15z"
    ></path>
  </svg>
)
