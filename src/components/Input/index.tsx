import css from 'classnames'
import style from './style.module.scss'
import { Input, InputNumber, InputNumberProps, InputProps } from 'antd'

interface ITextProps extends InputProps {
  type?: 'text'
  className?: string
}

interface INumberProps extends InputNumberProps {
  type: 'number'
  className?: string
}

type IProps = ITextProps | INumberProps

const MyInput: React.FC<IProps> = ({ className, type = 'text', ...props }) => {
  switch (type) {
    case 'number':
      return (
        <InputNumber
          className={css(style.input, className)}
          {...(props as InputNumberProps)}
        />
      )
    default:
      return (
        <Input
          className={css(style.input, className)}
          {...(props as InputProps)}
        />
      )
  }
}

export { MyInput as Input }
