import { FiPlus } from 'react-icons/fi'

import monster from 'img/monster.png'
import { Text } from 'components/Text'
import { Loader } from 'components/Loader'
import { BigSearch } from 'components/BigSearch'
import { Button } from 'components/Button'

import style from './style.module.scss'
import { CompensatedList } from './components/CompensatedList'
import { AdderDrawer } from './components/AdderDrawer'
import { useBigSearch } from './hooks/useBigSearch'
import { useCompensatedHistory } from './hooks/useCompensatedHistory'
import { useAdderDrawerForm } from './hooks/useAdderDrawerForm'

export const CompensationBookPage = () => {
  const {
    isLoading: isSubjectListLoading,
    subjectList,
    currentSubject,
    setCurrentSubject,
  } = useBigSearch()

  const { isLoading, compensatedList, createCompensated, deleteCompensated } =
    useCompensatedHistory(currentSubject.id)

  const { formAdder, isOpenAdder, openAdderDrawer, closeAdderDrawer } =
    useAdderDrawerForm()

  return (
    <div className={style.page}>
      <Text size="head" bold>
        หนังสือสอนชดเชย
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
          <span>เริ่มค้นหารายวิชาเพื่อดูประวัติการสอนชดเชย</span>
        </div>
      ) : (
        <Loader loading={isLoading}>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              ประวัติการสอนชดเชย
            </Text>
            <div className={style.headerRight}>
              <Button
                small
                blue
                icon={<FiPlus style={{ marginRight: '0.5rem' }} />}
                onClick={() => openAdderDrawer()}
              >
                เพิ่มการสอนชดเชย
              </Button>
            </div>
          </div>

          <CompensatedList
            list={compensatedList}
            onDelete={deleteCompensated}
          />

          <AdderDrawer
            compensatedList={compensatedList}
            form={formAdder}
            isOpen={isOpenAdder}
            isLoading={isLoading}
            onClose={() => closeAdderDrawer()}
            onSubmit={(formValue) =>
              createCompensated(formValue, closeAdderDrawer)
            }
          />
        </Loader>
      )}
    </div>
  )
}
