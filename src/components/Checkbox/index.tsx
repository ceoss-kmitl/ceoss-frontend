import css from 'classnames'
import style from './style.module.scss'
import { Checkbox, CheckboxProps } from 'antd'

interface IProps extends CheckboxProps {
  className?: string
}

const MyCheckbox: React.FC<IProps> = ({ className, ...props }) => {
  return <Checkbox className={css(style.checkbox, className)} {...props} />
}

export { MyCheckbox as Checkbox }
