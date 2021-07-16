import css from 'classnames'
import style from './Subject.module.scss'
import { Tooltip } from 'antd'
import { FiAlertTriangle } from 'react-icons/fi'
import { useSubjectSlot } from './helper'
import { ISlot, ISubject, SUBJECT_TYPE } from 'types/TimeTable'

interface IProps {
  data: ISlot
  onSubjectClick: (subject: ISubject) => void
  onOverlapSubjectClick: (subject: ISubject) => void
}

export const Subject: React.FC<IProps> = ({
  data,
  onSubjectClick,
  onOverlapSubjectClick,
}) => {
  const { subjectSlotList, slotHeight } = useSubjectSlot(data)

  return (
    <td colSpan={data.slotSpan}>
      <div className={style.wrapper}>
        <table className={style.table}>
          <tbody>
            {subjectSlotList.map((subject, i) => (
              <tr key={i}>
                {subject.map((slot, j) => {
                  const isOverlap = data.subjectList.length > 1
                  return slot ? (
                    // IF #1: Has subject
                    <td key={j} colSpan={slot.slotSpan}>
                      {isOverlap ? (
                        //IF #2: Has subject BUT overlap
                        <Tooltip
                          title={`${slot.subject.code} ${slot.subject.name} กลุ่ม ${slot.subject.section}`}
                          color="#1F2937"
                        >
                          <div
                            className={css(style.subject, style.OVERLAP)}
                            style={{ height: slotHeight }}
                            onClick={() => onOverlapSubjectClick(slot.subject)}
                          >
                            <div className={style.name}>
                              <FiAlertTriangle className={style.icon} />
                              {slot.subject.name}
                            </div>
                          </div>
                        </Tooltip>
                      ) : (
                        //IF #2: Has OK subject
                        <Tooltip
                          title={`${slot.subject.code} ${slot.subject.name} กลุ่ม ${slot.subject.section}`}
                          color="#1F2937"
                        >
                          <div
                            className={css(
                              style.subject,
                              style[slot.subject.type || SUBJECT_TYPE.LECTURE]
                            )}
                            style={{ height: slotHeight }}
                            onClick={() => onSubjectClick(slot.subject)}
                          >
                            <div>
                              {slot.subject.code}
                              {` กลุ่ม ${slot.subject.section}`}
                            </div>
                            <div className={style.name}>
                              {slot.subject.name}
                            </div>
                          </div>
                        </Tooltip>
                      )}
                    </td>
                  ) : (
                    // IF #1: No subject
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
