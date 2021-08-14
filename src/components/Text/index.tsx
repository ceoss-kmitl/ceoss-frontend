import css from 'classnames'
import style from './style.module.scss'
import { Typography } from 'antd'

interface IProps {
  gray?: boolean
  bold?: boolean
  underline?: boolean
  italic?: boolean
  strike?: boolean
  className?: string
  size?: 'head' | 'sub-head' | 'normal' | 'small'
}

export const Text: React.FC<IProps> = ({
  children,
  gray,
  bold,
  underline,
  italic,
  strike,
  className,
  size = 'normal',
}) => {
  return (
    <Typography.Text
      underline={underline}
      italic={italic}
      delete={strike}
      className={css(
        { [style.gray]: gray },
        { [style.bold]: bold },
        style[size],
        className
      )}
    >
      {children}
    </Typography.Text>
  )
}
