import css from 'classnames'
import style from './Subject.module.scss'
import { Tooltip } from 'antd'
import { useSubjectSlot } from './helper'
import { ISlot, SUBJECT_TYPE } from 'types/TimeTable'

interface IProps {
  data: ISlot
}

export const Subject: React.FC<IProps> = ({ data }) => {
  const subjectSlotList = useSubjectSlot(data)

  console.log(JSON.stringify(subjectSlotList, null, 2))

  return (
    <td colSpan={data.slotSpan}>
      <div className={style.wrapper}>
        <table className={style.table}>
          <tbody>
            {subjectSlotList.map((subject, i) => (
              <tr key={i}>
                {subject.map((slot, j) => {
                  const isOverlap = subject.length > 1
                  return slot ? (
                    <td key={j} colSpan={slot.slotSpan}>
                      <Tooltip
                        title={`${slot.subject.code} ${slot.subject.name} กลุ่ม ${slot.subject.section}`}
                      >
                        <div
                          className={css(
                            style.subject,
                            style[slot.subject.type || SUBJECT_TYPE.LECTURE],
                            { [style.OVERLAP]: isOverlap }
                          )}
                          style={{
                            height: `${
                              ((100 / data.subjectList.length) * 60) / 100
                            }px`,
                          }}
                        >
                          {!isOverlap && (
                            <div>
                              {slot.subject.code}
                              {` กลุ่ม ${slot.subject.section}`}
                            </div>
                          )}
                          <div className={style.name}>{slot.subject.name}</div>
                        </div>
                      </Tooltip>
                    </td>
                  ) : (
                    <td key={j} colSpan={1} />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </td>
  )
}
