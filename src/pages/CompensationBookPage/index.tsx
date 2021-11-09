import { Text } from 'components/Text'
import { Loader } from 'components/Loader'
import { Button } from 'components/Button'
import { Select } from 'components/Select'

import style from './style.module.scss'
import monster from './monster.png'
import { BigSearch } from './components/BigSearch'
import { CompensatedList } from './components/CompensatedList'
import { useAcademicYear, useCompensatedHistory } from './helper'

export const CompensationBookPage = () => {
  const {
    academicYear,
    academicYearOptionList,
    setAcademicYear,
    semester,
    semesterOptionList,
    setSemester,
  } = useAcademicYear()

  const { isLoading, setSubjectId, compensatedList } = useCompensatedHistory(
    academicYear,
    semester
  )

  return (
    <div className={style.page}>
      <Text size="head" bold>
        หนังสือสอนชดเชย
      </Text>

      <BigSearch onSearch={(record) => setSubjectId(record.key)} />

      {isLoading === null ? (
        <div className={style.monsterWrapper}>
          <img src={monster} />
          <span>เริ่มค้นหารายวิชาเพื่อดูประวัติการสอนชดเชย</span>
        </div>
      ) : (
        <Loader loading={isLoading}>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              ประวัติการสอนชดเชย
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
              <Button small>เพิ่มการสอนชดเชย</Button>
            </div>
          </div>

          <CompensatedList list={compensatedList} />
        </Loader>
      )}
    </div>
  )
}
