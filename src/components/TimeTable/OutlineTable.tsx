import css from 'classnames'
import style from './style.module.scss'
import { Fragment } from 'react'
import { BiTime } from 'react-icons/bi'
import { timeSlot, dayInWeek } from './helper'

export const OutlineTable: React.FC = () => {
  return (
    <table className={css(style.table, 'shadow')}>
      <thead className={style.timeHeader}>
        <tr>
          <th colSpan={4}>
            <BiTime size={20} style={{ marginBottom: '-6px' }} />
          </th>
          {timeSlot.map((slot) => (
            <th key={slot} colSpan={4}>
              {slot}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dayInWeek.map((day) => (
          <tr key={day} className={style.dayRow}>
            <th className={style.dayHeader} colSpan={4}>
              {day}
            </th>
            {timeSlot.map((slot) => (
              <Fragment key={slot}>
                <td className={style.slotStart} />
                <td className={style.slot} />
                <td className={style.slot} />
                <td className={style.slotEnd} />
              </Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
