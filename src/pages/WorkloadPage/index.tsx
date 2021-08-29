import css from 'classnames'

import { TimeTable } from 'components/TimeTable'
import { Text } from 'components/Text'
import { Select } from 'components/Select'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'

import style from './style.module.scss'
import monster from './monster.png'
import { BigSearch } from './components/BigSearch'
import { useAcademicYear, useWorkload } from './helper'

export const WorkloadPage = () => {
  const {
    academicYear,
    semester,
    setAcademicYear,
    setSemester,
    academicYearOptionList,
    semesterOptionList,
  } = useAcademicYear()

  const { isLoading, workload, getWorkloadByTeacherId, discardWorkload } =
    useWorkload(academicYear, semester)

  return (
    <div className={style.page}>
      <Text size="head" bold>
        จัดการภาระงาน
      </Text>

      <BigSearch onSearch={getWorkloadByTeacherId} />

      {isLoading === null ? (
        <div className={style.monsterWrapper}>
          <img src={monster} />
          <span>เริ่มค้นหาอาจารย์เพื่อดูภาระงาน</span>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              ตารางการปฏิบัติงานสอน
            </Text>
            <div className={style.headerRight}>
              <Text className={style.headerRightLabel}>ปีการศึกษา</Text>
              <Select
                options={academicYearOptionList}
                value={academicYear}
                onChange={setAcademicYear}
              />
              <Text className={style.headerRightLabel}>ภาคเรียน</Text>
              <Select
                options={semesterOptionList}
                value={semester}
                onChange={setSemester}
              />
              <Button small>ดาวน์โหลดเอกสาร</Button>
            </div>
          </div>

          <TimeTable
            data={workload}
            onOverlapSubjectClick={(subject) =>
              discardWorkload(subject.workloadId)
            }
          />

          <div className={style.timeTableFooter}>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.green)} />
              วิชาทฤษฎี
            </label>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.blue)} />
              วิชาปฏิบัติ
            </label>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.red)} />
              วิชาที่ทับซ้อน
            </label>
          </div>
        </>
      )}
    </div>
  )
}
