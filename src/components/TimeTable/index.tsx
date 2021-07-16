import style from './style.module.scss'
import { OutlineTable } from './OutlineTable'
import { Subject } from './Subject'
import { timeSlot, useTimeTable } from './helper'
import { IDay } from 'types/TimeTable'

interface IProps {
  /**
   * 7 days. Start with Monday. End with Sunday
   */
  data: IDay[]
}

export const TimeTable: React.FC<IProps> = ({ data }) => {
  const tableSlotList = useTimeTable(data)

  return (
    <div className={style.tableWrapper}>
      <OutlineTable />

      {/* Absolute table for showing subject over the OutlineTable */}
      <table className={style.tableSubject}>
        <thead className={style.timeHeader}>
          <tr>
            <th colSpan={4} />
            {timeSlot.map((slot) => (
              <th key={slot} colSpan={4} />
            ))}
          </tr>
        </thead>
        {/* Render Subject here */}
        <tbody>
          {tableSlotList.map((day, i) => (
            <tr key={i} className={style.dayRow}>
              <th className={style.dayHeader} colSpan={4}></th>
              {day.map((slot, j) => {
                return slot ? (
                  <Subject key={j} data={slot} />
                ) : (
                  <td key={j} colSpan={1} />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
