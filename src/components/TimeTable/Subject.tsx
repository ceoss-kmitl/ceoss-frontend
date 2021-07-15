import style from './Subject.module.scss'
import { Column } from './helper'

interface IProps {
  data: Column
}

export const Subject: React.FC<IProps> = ({ data }) => {
  return (
    <td colSpan={data.colSpan}>
      <div className={style.subject}>{data.name}</div>
    </td>
  )
}
