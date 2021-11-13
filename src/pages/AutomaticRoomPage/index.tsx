import { VscDebugRestart } from 'react-icons/vsc'
import { FiDownload, FiPlus } from 'react-icons/fi'
import { IoSparklesSharp } from 'react-icons/io5'
import { Row, Button as AntdButton } from 'antd'

import { RoomTable, useTimeTable } from 'components/RoomTable'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { useAcademicYear } from 'contexts/AcademicYearContext'

import style from './style.module.scss'
import monster from './monster.png'
import { BigSearch } from './components/BigSearch'
import { useWorkload } from './helper'

export const AutomaticRoomPage = () => {
  const { academicYear, semester } = useAcademicYear()

  const {
    isLoading,
    isDownloading,
    workload,
    setCurrentRoom,
    assignWorkload,
    unassignWorkload,
    downloadExcel,
    currentRoom,
    triggerAutoRoom,
    triggerResetAutoRoom,
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
      <Row>
        <Text size="head" bold>
          จัดห้องอัตโนมัติ
        </Text>
        <div className={style.headerRight}>
          <Button
            small
            icon={<FiDownload style={{ marginRight: '0.5rem' }} />}
            onClick={handleDownloadExcel}
            loading={isDownloading}
          >
            ตารางรวมการใช้ห้อง
          </Button>
          <Button
            small
            icon={<IoSparklesSharp style={{ marginRight: '0.5rem' }} />}
            onClick={triggerAutoRoom}
            style={{ marginLeft: '0.5rem' }}
          >
            จัดห้องอัตโนมัติ
          </Button>
          <AntdButton
            danger
            type="primary"
            style={{
              borderRadius: '6px',
              marginLeft: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={<VscDebugRestart />}
            onClick={triggerResetAutoRoom}
          />
        </div>
      </Row>

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
          </div>

          <RoomTable use={timeTable} />

          <div className={style.timeTableFooter}>
            <Button
              small
              blue
              className={style.roomAdder}
              onClick={timeTable.addWorkload}
            >
              <FiPlus />
              เพิ่มวิชาสอนในห้องนี้
            </Button>
          </div>
        </Loader>
      )}
    </div>
  )
}
