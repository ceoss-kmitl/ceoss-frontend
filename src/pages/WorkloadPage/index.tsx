import css from 'classnames'
import { Row } from 'antd'
import { useState } from 'react'
import { FiDownload, FiPlus } from 'react-icons/fi'

import monster from 'img/monster.png'
import { TimeTable, useTimeTable } from 'components/TimeTable'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { BigSearch } from 'components/BigSearch'

import style from './style.module.scss'
import { ExternalTeacherDrawer } from './components/ExternalTeacherDrawer'
import { useTeacherList } from './hooks/useTeacherList'
import { useWorkload } from './hooks/useWorkload'
import { useDownloadFile } from './hooks/useDownloadFile'

export const WorkloadPage = () => {
  // NOTE: Drawer for external teacher only
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const {
    isLoading: isTeacherListLoading,
    teacherList,
    currentTeacher,
    setCurrentTeacher,
  } = useTeacherList()

  const { isLoading, workloadList, addWorkload, editWorkload, deleteWorkload } =
    useWorkload(currentTeacher?.id)

  const {
    isDownloading,
    downloadExcel,
    downloadExcelExternal,
    downloadExcel5,
  } = useDownloadFile(currentTeacher?.id)

  const timeTable = useTimeTable({
    data: workloadList,
    onAdd: addWorkload,
    onEdit: editWorkload,
    onDelete: deleteWorkload,
  })

  return (
    <div className={style.page}>
      <Row justify="space-between">
        <Text size="head" bold>
          จัดการภาระงาน
        </Text>
        <Button
          small
          icon={<FiDownload style={{ marginRight: '0.5rem' }} />}
          onClick={downloadExcel5}
          loading={isDownloading}
        >
          หลักฐานการเบิกจ่าย
        </Button>
      </Row>

      <BigSearch
        isLoading={isTeacherListLoading}
        placeholder="ค้นหาอาจารย์..."
        notFoundText="ไม่พบรายชื่อดังกล่าว"
        options={teacherList}
        onSelect={(teacher) => setCurrentTeacher(teacher)}
      />

      {isLoading === null ? (
        <div className={style.monsterWrapper}>
          <img src={monster} />
          <span>เริ่มค้นหาอาจารย์เพื่อดูภาระงาน</span>
        </div>
      ) : (
        <Loader loading={isLoading}>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              ตารางการปฏิบัติงานสอน
            </Text>
          </div>

          <TimeTable use={timeTable} />

          <div className={style.timeTableFooter}>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.green)} />
              วิชาสอนเดี่ยว
            </label>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.blue)} />
              วิชาสอนร่วม
            </label>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.red)} />
              วิชาที่เบิกทับซ้อน
            </label>
            <label className={style.label}>
              <span className={css(style.labelIcon2, style.notClaim)} />
              วิชาที่ไม่เบิก
            </label>

            <Button
              small
              blue
              onClick={() => {
                if (currentTeacher?.isExternal) {
                  setIsDrawerVisible(true)
                } else {
                  downloadExcel()
                }
              }}
              className={style.workloadAdder}
              icon={<FiDownload style={{ marginRight: '0.15rem' }} />}
              loading={isDownloading}
              style={{ marginRight: '0.5rem' }}
            >
              เอกสารภาระงาน
            </Button>
            <Button
              small
              blue
              onClick={timeTable.addWorkload}
              icon={<FiPlus style={{ marginRight: '0.25rem' }} />}
            >
              เพิ่มภาระงานใหม่
            </Button>
          </div>

          {currentTeacher?.isExternal && (
            <ExternalTeacherDrawer
              isDrawerVisible={isDrawerVisible}
              onClose={() => setIsDrawerVisible(false)}
              workload={workloadList.flatMap((w) => w.workloadList)}
              onDownload={() => downloadExcelExternal()}
              isDownloading={isDownloading}
            />
          )}
        </Loader>
      )}
    </div>
  )
}
