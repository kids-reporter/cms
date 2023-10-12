type ArrowProp = {
  color: string
}

export const ArrowLeft = (props: ArrowProp) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2Z"
        fill={props.color}
        stroke="white"
        strokeWidth="3"
        strokeMiterlimit="10"
      ></path>
      <path
        d="M29.9297 39.1001L17.9359 27.0002L29.9297 14.9003"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

export const ArrowRight = (props: ArrowProp) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52Z"
        fill={props.color}
        stroke="white"
        strokeWidth="3"
        strokeMiterlimit="10"
      ></path>
      <path
        d="M24.0703 14.8999L36.0641 26.9998L24.0703 39.0997"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}
