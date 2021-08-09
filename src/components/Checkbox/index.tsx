import css from 'classnames'
import style from './style.module.scss'
import { Checkbox, CheckboxProps } from 'antd'

const MyCheckbox: React.FC<CheckboxProps> = ({ ...props }) => {
  return (
    <Checkbox className={css(style.checkbox, props.className)} {...props} />
  )
}

export { MyCheckbox as Checkbox }
