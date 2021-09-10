import style from './style.module.scss'
import { OutlineTable } from './OutlineTable'
import { Subject } from './Subject'
import { IDay, ISubject, timeSlot, useTimeTable } from './helper'

interface IProps {
  /**
   * 7 days. Start with Monday. End with Sunday
   */
  data: IDay[]
  /**
   * Received `Subject` that has been clicked as parameter
   */
  onSubjectClick?: (subject: ISubject) => void
  /**
   * Received `Subject`(Overlap) that has been clicked as parameter
   */
  onOverlapSubjectClick?: (subject: ISubject) => void
}

export const TimeTable: React.FC<IProps> = ({
  data,
  onSubjectClick = () => {},
  onOverlapSubjectClick = () => {},
}) => {
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
                  <Subject
                    key={j}
                    data={slot}
                    onSubjectClick={onSubjectClick}
                    onOverlapSubjectClick={onOverlapSubjectClick}
                  />
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

export { DAY_IN_WEEK, SUBJECT_TYPE, DEGREE } from './helper'
export type { IDay }
