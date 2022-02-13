import {
  IRawWorkloadOfTeacherWithDayjs,
  IWorkloadOfTeacherWithDayjs,
} from 'apis/teacher'

import style from './style.module.scss'
import { OutlineTable } from './OutlineTable'
import { Workload } from './Workload'
import { timeSlot, useTimeSlot } from './helper'

interface IProps {
  data: IWorkloadOfTeacherWithDayjs[]
  onWorkloadClick?: (workload: IRawWorkloadOfTeacherWithDayjs) => void
}

export const TimeTable: React.FC<IProps> = ({
  data,
  onWorkloadClick = () => {},
}) => {
  const tableSlotList = useTimeSlot(data)

  // This component is render by 2 <table /> overlap together
  // Layer 1 is for rendering border outline and header text
  // Layer 2 is for rendering each workload
  return (
    <div className={style.tableWrapper}>
      {/* Layer 1 */}
      <OutlineTable />

      {/* Layer 2 */}
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
          {tableSlotList.map((day, i) => (
            <tr key={i} className={style.dayRow}>
              <th className={style.dayHeader} colSpan={4}></th>
              {day.map((slot, j) => {
                return slot ? (
                  <Workload key={j} data={slot} onClick={onWorkloadClick} />
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
