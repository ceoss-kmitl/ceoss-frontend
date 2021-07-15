import style from './style.module.scss'
import { OutlineTable } from './OutlineTable'
import { Subject } from './Subject'
import { Day, timeSlot, createColumnList } from './helper'

interface IProps {
  data: Day[]
}

export const TimeTable: React.FC<IProps> = ({ data }) => {
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
        <tbody>
          {data.map((day, i) => (
            <tr key={i} className={style.dayRow}>
              <th className={style.dayHeader} colSpan={4} />
              {createColumnList(day.subjectList).map((col, j) => {
                return col ? (
                  <Subject key={j} data={col} />
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
