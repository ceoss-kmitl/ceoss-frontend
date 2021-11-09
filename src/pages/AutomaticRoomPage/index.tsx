import { VscAdd } from 'react-icons/vsc'

import { RoomTable, useTimeTable } from 'components/RoomTable'
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
    assignWorkload,
    unassignWorkload,
    downloadExcel,
    currentRoom,
  } = useWorkload(academicYear, semester)

  const timeTable = useTimeTable({
    data: workload,
    room: currentRoom,
    academicYear,
    semester,
    onAdd: assignWorkload,
    onDelete: unassignWorkload,
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
            name: record.value,
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

          <RoomTable use={timeTable} />

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
