import { range } from 'lodash'

import monster from 'img/monster.png'
import { Text } from 'components/Text'
import { BigSearch } from 'components/BigSearch'

import style from './style.module.scss'
import { useBigSearch } from './hooks/useBigSearch'
import { useSectionList } from './hooks/useSectionList'
import { useDrawerForm } from './hooks/useDrawerForm'
import { SectionCard } from './components/SectionCard'
import { Drawer } from './components/Drawer'

export const AssistantDocumentPage = () => {
  const {
    isLoading: isSubjectListLoading,
    subjectList,
    currentSubject,
    setCurrentSubject,
  } = useBigSearch()

  const {
    isLoading: isSectionListLoading,
    sectionList,
    editAssistantListOfSubject,
  } = useSectionList(currentSubject.id)

  const { form, isOpen, openDrawer, closeDrawer } = useDrawerForm()

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
            {isSectionListLoading
              ? range(3).map((i) => <SectionCard key={i} data={null} />)
              : sectionList.map((section) => (
                  <SectionCard
                    key={section.section}
                    data={section}
                    onEditClick={(value) => openDrawer(value)}
                  />
                ))}
          </div>

          <Drawer
            form={form}
            isLoading={isSectionListLoading}
            isOpen={isOpen}
            onClose={closeDrawer}
            onSubmit={(value) => editAssistantListOfSubject(value, closeDrawer)}
          />
        </>
      )}
    </div>
  )
}
