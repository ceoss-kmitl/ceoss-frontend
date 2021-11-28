import { VscDebugRestart } from 'react-icons/vsc'
import { FiDownload, FiPlus } from 'react-icons/fi'
import { IoSparklesSharp } from 'react-icons/io5'
import { Row, Button as AntdButton } from 'antd'

import monster from 'img/monster.png'
import { TimeTable } from 'components/TimeTable'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { BigSearch } from 'components/BigSearch'

import style from './style.module.scss'
import { Drawer } from './components/Drawer'
import { AdderDrawer } from './components/AdderDrawer'
import { useBigSearch } from './hooks/useBigSearch'
import { useAutoRoom } from './hooks/useAutoRoom'
import { useDownloadFile } from './hooks/useDownloadFile'
import { useDrawerForm } from './hooks/useDrawerForm'
import { useAdderDrawerForm } from './hooks/useAdderDrawerForm'

export const AutomaticRoomPage = () => {
  const {
    isLoading: isRoomListLoading,
    roomList,
    currentRoom,
    setCurrentRoom,
  } = useBigSearch()

  const {
    isLoading,
    workloadList,
    addWorkloadToRoom,
    removeWorkloadFromRoom,
    triggerAutoRoom,
    triggerResetRoom,
  } = useAutoRoom(currentRoom.id)

  const { form, isOpen, openDrawer, closeDrawer } = useDrawerForm()

  const { isOpenAdder, openAdderDrawer, closeAdderDrawer } =
    useAdderDrawerForm()

  const { isDownloading, downloadExcel } = useDownloadFile()

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
            onClick={() => downloadExcel()}
            loading={isDownloading}
          >
            ตารางรวมการใช้ห้อง
          </Button>
          <Button
            small
            icon={<IoSparklesSharp style={{ marginRight: '0.5rem' }} />}
            onClick={() => triggerAutoRoom()}
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
            onClick={() => triggerResetRoom()}
          />
        </div>
      </Row>

      <BigSearch
        isLoading={isRoomListLoading}
        placeholder="ค้นหาห้อง..."
        notFoundText="ไม่พบห้องดังกล่าว"
        options={roomList}
        onSelect={(room) => setCurrentRoom(room)}
      />

      {!currentRoom.id ? (
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

          <TimeTable
            data={workloadList}
            onWorkloadClick={(workload) => openDrawer(workload)}
          />

          <div className={style.timeTableFooter}>
            <Button
              small
              blue
              className={style.roomAdder}
              onClick={() => openAdderDrawer()}
            >
              <FiPlus />
              เพิ่มวิชาสอนในห้องนี้
            </Button>
          </div>

          <Drawer
            form={form}
            isOpen={isOpen}
            isLoading={isLoading}
            onClose={() => closeDrawer()}
            onDelete={(formValue) =>
              removeWorkloadFromRoom(formValue, closeDrawer)
            }
          />
          <AdderDrawer
            roomName={currentRoom.name}
            isOpen={isOpenAdder}
            isLoading={isLoading}
            onClose={() => closeAdderDrawer()}
            onSubmit={(workloadIdList) =>
              addWorkloadToRoom(workloadIdList, closeAdderDrawer)
            }
          />
        </Loader>
      )}
    </div>
  )
}
