import css from 'classnames'
import style from './style.module.scss'
import { Button } from 'antd'
import { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLButtonElement> {
  className?: string
  blue?: boolean
  white?: boolean
  green?: boolean
  small?: boolean
  loading?: boolean
  shadow?: boolean
  children: React.ReactNode
}

const MyButton: React.FC<IProps> = ({
  children,
  className,
  blue,
  white,
  green,
  small,
  loading,
  shadow = true,
  ...props
}) => {
  return (
    <Button
      className={css(
        style.button,
        { [style.white]: white },
        { [style.blue]: blue },
        { [style.green]: green },
        { shadow },
        className
      )}
      size={(small ? 'middle' : 'large') as any}
      loading={loading}
      {...(props as any)}
    >
      {children}
    </Button>
  )
}

export { MyButton as Button }
