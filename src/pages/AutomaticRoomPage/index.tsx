import { VscAdd } from 'react-icons/vsc'

import { TimeTable, useTimeTable } from 'components/TimeTable'
import { Text } from 'components/Text'
import { Select } from 'components/Select'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'

import style from './style.module.scss'
import monster from './monster.png'
import { BigSearch } from './components/BigSearch'
import { useAcademicYear, useWorkload } from './helper'

export const AutomaticRoomPage = () => {
  const {
    academicYear,
    semester,
    setAcademicYear,
    setSemester,
    academicYearOptionList,
    semesterOptionList,
  } = useAcademicYear()

  const {
    isLoading,
    isDownloading,
    workload,
    setCurrentRoom,
    addWorkload,
    editWorkload,
    deleteWorkload,
    downloadExcel,
  } = useWorkload(academicYear, semester)

  const timeTable = useTimeTable({
    data: workload,
    onAdd: addWorkload,
    onEdit: editWorkload,
    onDelete: deleteWorkload,
  })

  const handleDownloadExcel = () => {
    downloadExcel()
  }

  return (
    <div className={style.page}>
      <Text size="head" bold>
        จัดห้องอัตโนมัติ
      </Text>

      <BigSearch
        onSearch={(record) => {
          setCurrentRoom({
            id: record.key,
            name: record.name,
            capacity: record.capacity,
          })
        }}
      />

      {isLoading === null ? (
        <div className={style.monsterWrapper}>
          <img src={monster} />
          <span>เริ่มค้นหาห้องเพื่อจัดห้อง</span>
        </div>
      ) : (
        <Loader loading={isLoading}>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              ตารางการใช้ห้อง
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
              <Button
                small
                onClick={handleDownloadExcel}
                loading={isDownloading}
              >
                ดาวน์โหลดเอกสาร
              </Button>
            </div>
          </div>

          <TimeTable use={timeTable} />

          <div className={style.timeTableFooter}>
            <Button
              small
              white
              className={style.roomAdder}
              onClick={timeTable.addWorkload}
            >
              <VscAdd />
              เพิ่มวิชาสอน
            </Button>
          </div>
        </Loader>
      )}
    </div>
  )
}
