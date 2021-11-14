import { FiPlus } from 'react-icons/fi'

import { Text } from 'components/Text'
import { Loader } from 'components/Loader'
import { Button } from 'components/Button'
import { useAcademicYear } from 'contexts/AcademicYearContext'

import style from './style.module.scss'
import monster from './monster.png'
import { BigSearch } from './components/BigSearch'
import { CompensatedList } from './components/CompensatedList'
import { AdderDrawer } from './components/AdderDrawer'
import { useCompensatedHistory } from './helper'

export const CompensationBookPage = () => {
  const { academicYear, semester } = useAcademicYear()

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
              <AdderDrawer
                sectionList={compensatedList.map((c) => c.section)}
              />
            </div>
          </div>

          <CompensatedList list={compensatedList} />
        </Loader>
      )}
    </div>
  )
}
