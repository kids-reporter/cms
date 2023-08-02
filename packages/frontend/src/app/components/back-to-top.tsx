import './back-to-top.scss'

export const BackToTop = () => {
  return (
    <a href="#" className="back-to-top" title="到最上面" aria-label="到最上面">
      <svg className="ct-icon" width="15" height="15" viewBox="0 0 20 20">
        <path d="M18.1,9.4c-0.2,0.4-0.5,0.6-0.9,0.6h-3.7c0,0-0.6,8.7-0.9,9.1C12.2,19.6,11.1,20,10,20c-1,0-2.3-0.3-2.7-0.9C7,18.7,6.5,10,6.5,10H2.8c-0.4,0-0.7-0.2-1-0.6C1.7,9,1.7,8.6,1.9,8.3c2.8-4.1,7.2-8,7.4-8.1C9.5,0.1,9.8,0,10,0s0.5,0.1,0.6,0.2c0.2,0.1,4.6,3.9,7.4,8.1C18.2,8.7,18.3,9.1,18.1,9.4z"></path>
      </svg>
    </a>
  )
}

export default BackToTop
