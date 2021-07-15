import css from 'classnames'
import style from './Subject.module.scss'
import { Tooltip } from 'antd'
import { Column } from './helper'

interface IProps {
  data: Column
}

export const Subject: React.FC<IProps> = ({ data }) => {
  return (
    <td colSpan={data.colSpan}>
      <Tooltip title={`${data.code} ${data.name} กลุ่ม ${data.section}`}>
        <div className={css(style.subject, style[data.type || 'LECTURE'])}>
          <div>
            {data.code} {`กลุ่ม ${data.section}`}
          </div>
          <div className={style.name}>{data.name}</div>
        </div>
      </Tooltip>
    </td>
  )
}
