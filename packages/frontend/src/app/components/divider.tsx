import './divider.scss'
import classNames from 'classNames'

export const Divider = ({ className }: { className?: string }) => {
  return <hr className={classNames('dot-hr', className)} />
}

export default Divider
