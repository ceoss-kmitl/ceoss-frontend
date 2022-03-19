import css from 'classnames'
import style from './style.module.scss'
import { Typography } from 'antd'

interface IProps {
  copyable?: boolean
  gray?: boolean
  bold?: boolean
  underline?: boolean
  italic?: boolean
  strike?: boolean
  className?: string
  size?: 'head' | 'sub-head' | 'normal' | 'small'
  onClick?: () => void
}

export const Text: React.FC<IProps> = ({
  children,
  copyable = false,
  gray,
  bold,
  underline,
  italic,
  strike,
  className,
  size = 'normal',
  onClick = () => {},
}) => {
  return (
    <Typography.Text
      copyable={copyable && { tooltips: ['คัดลอก', 'คัดลอกแล้ว'] }}
      underline={underline}
      italic={italic}
      delete={strike}
      className={css(
        { [style.gray]: gray },
        { [style.bold]: bold },
        style[size],
        className
      )}
      onClick={onClick}
    >
      {children}
    </Typography.Text>
  )
}
