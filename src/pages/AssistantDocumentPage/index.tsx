import monster from 'img/monster.png'
import { Text } from 'components/Text'
import { BigSearch } from 'components/BigSearch'

import style from './style.module.scss'
import { useBigSearch } from './hooks/useBigSearch'
import { SectionCard } from './components/SectionCard'

export const AssistantDocumentPage = () => {
  const {
    isLoading: isSubjectListLoading,
    subjectList,
    currentSubject,
    setCurrentSubject,
  } = useBigSearch()

  return (
    <div className={style.page}>
      <Text size="head" bold>
        เอกสาร TA
      </Text>

      <BigSearch
        isLoading={isSubjectListLoading}
        placeholder="ค้นหาวิชา..."
        notFoundText="ไม่พบรายวิชาดังกล่าว"
        options={subjectList}
        onSelect={(subject) => setCurrentSubject(subject)}
      />

      {!currentSubject.id ? (
        <div className={style.monsterWrapper}>
          <img src={monster} />
          <span>เริ่มค้นหารายวิชาเพื่อดูรายชื่อ TA</span>
        </div>
      ) : (
        <>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              รายชื่อ TA ในแต่ละกลุ่มเรียน
            </Text>
          </div>

          <div className={style.sectionContainer}>
            <SectionCard />
            <SectionCard />
            <SectionCard />
            <SectionCard />
            <SectionCard />
          </div>
        </>
      )}
    </div>
  )
}
