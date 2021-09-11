import { Spin } from 'antd'
import { FiBox } from 'react-icons/fi'

import style from './style.module.scss'

interface IProps {
  loading?: boolean
}

export const Loader: React.FC<IProps> = ({ children, loading }) => {
  return (
    <Spin
      className={style.loader}
      size="large"
      indicator={<FiBox className={style.spin} />}
      tip="รอสักครู่..."
      spinning={loading ?? true}
    >
      {children}
    </Spin>
  )
}
