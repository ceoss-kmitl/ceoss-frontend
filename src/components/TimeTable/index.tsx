import style from './style.module.scss'
import { OutlineTable } from './OutlineTable'
import { Workload } from './Workload'
import { Drawer } from './Drawer'
import {
  IDay,
  IPrivateUseTimeTable,
  timeSlot,
  useTimeSlot,
  useTimeTable,
} from './helper'

interface IProps {
  /**
   * Use with hooks `useTimeTable`
   */
  use: ReturnType<typeof useTimeTable>
}

export const TimeTable: React.FC<IProps> = ({ use }) => {
  const { _ } = use as IPrivateUseTimeTable
  const tableSlotList = useTimeSlot(_.config.data)

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
                  <Workload key={j} data={slot} onClick={_.startEditWorkload} />
                ) : (
                  <td key={j} colSpan={1} />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer use={use} />
    </div>
  )
}

export { useTimeTable }
