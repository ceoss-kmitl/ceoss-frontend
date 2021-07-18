import style from './Logo.module.scss'
import { FiBox } from 'react-icons/fi'

export const Logo = () => {
  return (
    <div className={style.logo}>
      <FiBox style={{ marginRight: '0.5rem' }} />
      <span>CE</span>
      <span>OSS</span>
    </div>
  )
}
