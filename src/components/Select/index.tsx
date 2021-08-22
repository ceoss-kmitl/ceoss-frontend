import css from 'classnames'
import style from './style.module.scss'
import { Select, SelectProps } from 'antd'

interface IProps extends SelectProps<any> {
  className?: string
}

const MySelect: React.FC<IProps> = ({ className, ...props }) => {
  return <Select className={css(style.select, className)} {...props} />
}

const { Option } = Select

export { MySelect as Select }

export { Option }
