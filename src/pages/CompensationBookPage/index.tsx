import { FiPlus } from 'react-icons/fi'
import { Skeleton } from 'antd'

import monster from 'img/monster.png'
import { Text } from 'components/Text'
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
        <>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              ประวัติการสอนชดเชย
            </Text>
            <div className={style.headerRight}>
              {isLoading ? (
                <Skeleton.Button
                  style={{ width: 160, borderRadius: 8, marginRight: -16 }}
                />
              ) : (
                <Button
                  small
                  blue
                  icon={<FiPlus style={{ marginRight: '0.5rem' }} />}
                  onClick={() => openAdderDrawer()}
                  disabled={isLoading}
                >
                  เพิ่มการสอนชดเชย
                </Button>
              )}
            </div>
          </div>

          <CompensatedList
            isLoading={isLoading}
            list={compensatedList}
            onDelete={deleteCompensated}
          />

          <AdderDrawer
            subject={currentSubject}
            form={formAdder}
            isOpen={isOpenAdder}
            isLoading={isLoading}
            onClose={() => closeAdderDrawer()}
            onSubmit={(formValue) =>
              createCompensated(formValue, closeAdderDrawer)
            }
          />
        </>
      )}
    </div>
  )
}
