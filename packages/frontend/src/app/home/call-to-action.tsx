import { SUBSCRIBE_URL } from '@/app/constants'

import './call-to-action.scss'

export const CallToAction = () => {
  return (
    <div className="cta-container">
      <a href={SUBSCRIBE_URL} className="top"></a>
      <div className="bottom">
        <a href={'/about#mail'} className="mail"></a>
        <a href={'/about#post'} className="contribute"></a>
      </div>
    </div>
  )
}

export default CallToAction
