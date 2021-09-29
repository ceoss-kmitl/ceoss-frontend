import css from 'classnames'
import { Tooltip } from 'antd'
import { FiAlertTriangle } from 'react-icons/fi'

import { SUBJECT_TYPE } from 'constants/enum'

import style from './Workload.module.scss'
import { ISlot, IWorkload, useWorkloadSlot } from './helper'

interface IProps {
  data: ISlot
  onClick: (workload: IWorkload) => void
}

export const Workload: React.FC<IProps> = ({ data, onClick }) => {
  const { workloadSlotList, slotHeight } = useWorkloadSlot(data)

  // Render sub-table inside that <td /> as a workload
  return (
    <td colSpan={data.slotSpan}>
      <div className={style.wrapper}>
        <table className={style.table}>
          <tbody>
            {workloadSlotList.map((workload, i) => (
              <tr key={i}>
                {workload.map((slot, j) => {
                  const isOverlap = data.workloadList.length > 1
                  let claimCount = 0
                  data.workloadList.forEach((w) => {
                    if (w.isClaim) claimCount++
                  })

                  return slot ? (
                    // IF #1: Has workload
                    <td key={j} colSpan={slot.slotSpan}>
                      {isOverlap ? (
                        //IF #1.1: Has workload BUT overlap
                        <Tooltip
                          title={`${slot.workload.code} ${slot.workload.name} กลุ่ม ${slot.workload.section}`}
                          color="#1F2937"
                        >
                          <div
                            className={css(
                              style.subject,
                              slot.workload.teacherList.length > 1
                                ? style.coTeaching
                                : style.soloTeaching,
                              {
                                [style.notClaim]: !slot.workload.isClaim,
                                [style.OVERLAP]: claimCount > 1,
                              }
                            )}
                            style={{ height: slotHeight }}
                            onClick={() => onClick(slot.workload)}
                          >
                            <div className={style.name}>
                              {claimCount > 1 && (
                                <FiAlertTriangle className={style.icon} />
                              )}
                              {slot.workload.name}
                            </div>
                          </div>
                        </Tooltip>
                      ) : (
                        //IF #1.2: Has OK workload
                        <Tooltip
                          title={`${slot.workload.code} ${slot.workload.name} กลุ่ม ${slot.workload.section}`}
                          color="#1F2937"
                        >
                          <div
                            className={css(
                              style.subject,
                              slot.workload.teacherList.length > 1
                                ? style.coTeaching
                                : style.soloTeaching,
                              {
                                [style.notClaim]: !slot.workload.isClaim,
                              }
                            )}
                            style={{ height: slotHeight }}
                            onClick={() => onClick(slot.workload)}
                          >
                            <div className={style.code}>
                              {slot.workload.code}
                              {` กลุ่ม ${slot.workload.section}`}
                            </div>
                            <div className={style.name}>
                              {slot.workload.name}
                            </div>
                          </div>
                        </Tooltip>
                      )}
                    </td>
                  ) : (
                    // IF #2: No workload
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
