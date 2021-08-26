import style from './style.module.scss'
import { Spin } from 'antd'
import { FiBox } from 'react-icons/fi'

export const Loader = () => {
  return (
    <Spin
      className={style.loader}
      size="large"
      indicator={<FiBox className={style.spin} />}
      tip="รอสักครู่..."
    />
  )
}
