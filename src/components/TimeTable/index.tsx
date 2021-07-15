import css from 'classnames'
import style from './style.module.scss'

import { dayInWeek, timeSlot } from './helper'

export const TimeTable: React.FC = () => {
  return (
    <table className={css(style.table, 'shadow')}>
      <thead className={style.timeHeader}>
        <tr>
          <th>O</th>
          {timeSlot.map((slot) => (
            <th key={slot}>{slot}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dayInWeek.map((day) => (
          <tr key={day}>
            <th className={style.dayHeader}>{day}</th>
            {timeSlot.map((slot) => (
              <td key={slot}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
