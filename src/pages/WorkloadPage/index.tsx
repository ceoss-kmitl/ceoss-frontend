import css from 'classnames'
import { Row } from 'antd'
import { FiDownload, FiPlus } from 'react-icons/fi'
import { FcSynchronize } from 'react-icons/fc'

import monster from 'img/monster.png'
import { TimeTable } from 'components/TimeTable'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { BigSearch } from 'components/BigSearch'

import style from './style.module.scss'
import { Drawer } from './components/Drawer'
import { ExtDrawer } from './components/ExtDrawer'
import { useBigSearch } from './hooks/useBigSearch'
import { useWorkload } from './hooks/useWorkload'
import { useDrawerForm } from './hooks/useDrawerForm'
import { useDownloadFile } from './hooks/useDownloadFile'
import { useExtDrawerForm } from './hooks/useExtDrawerForm'

export const WorkloadPage = () => {
  const {
    isLoading: isTeacherListLoading,
    teacherList,
    currentTeacher,
    setCurrentTeacher,
  } = useBigSearch()

  const {
    isLoading: isWorkloadLoading,
    workloadList,
    addWorkload,
    editWorkload,
    deleteWorkload,
    reloadData,
  } = useWorkload(currentTeacher.id)

  const {
    form,
    formMode,
    isOpen,
    openDrawerCreateMode,
    openDrawerEditMode,
    closeDrawer,
  } = useDrawerForm()

  const { isOpenExt, openExtDrawer, closeExtDrawer } = useExtDrawerForm()

  const { isDownloading, downloadExcel, downloadExcelExt, downloadExcel5 } =
    useDownloadFile(currentTeacher?.id)

  return (
    <div className={style.page}>
      <Row justify="space-between">
        <Text size="head" bold>
          จัดการภาระงาน
          <FcSynchronize
            className={style.reloadBtn}
            onClick={() => reloadData()}
          />
        </Text>
        {currentTeacher.id && (
          <Button
            small
            icon={
              <FiDownload
                style={{
                  marginRight: '0.5rem',
                }}
              />
            }
            onClick={downloadExcel5}
            loading={isDownloading}
          >
            หลักฐานการเบิกจ่าย
          </Button>
        )}
      </Row>

      <BigSearch
        isLoading={isTeacherListLoading}
        placeholder="ค้นหาอาจารย์..."
        notFoundText="ไม่พบรายชื่อดังกล่าว"
        options={teacherList}
        onSelect={(teacher) => setCurrentTeacher(teacher)}
      />

      {!currentTeacher.id ? (
        <div className={style.monsterWrapper}>
          <img src={monster} />
          <span>เริ่มค้นหาอาจารย์เพื่อดูภาระงาน</span>
        </div>
      ) : (
        <Loader loading={isWorkloadLoading}>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              ตารางการปฏิบัติงานสอน
            </Text>
          </div>

          <TimeTable
            data={workloadList}
            onWorkloadClick={(workload) => openDrawerEditMode(workload)}
          />

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
                  openExtDrawer()
                } else {
                  downloadExcel()
                }
              }}
              className={style.workloadAdder}
              icon={
                <FiDownload
                  style={{
                    marginRight: '0.15rem',
                  }}
                />
              }
              loading={isDownloading}
              style={{
                marginRight: '0.5rem',
              }}
            >
              เอกสารภาระงาน
            </Button>
            <Button
              small
              blue
              onClick={() => openDrawerCreateMode()}
              icon={
                <FiPlus
                  style={{
                    marginRight: '0.25rem',
                  }}
                />
              }
            >
              เพิ่มภาระงานใหม่
            </Button>
          </div>

          <Drawer
            teacherId={currentTeacher.id}
            form={form}
            mode={formMode}
            isOpen={isOpen}
            isLoading={isWorkloadLoading}
            onClose={() => closeDrawer()}
            onCreate={(formValue) => addWorkload(formValue, closeDrawer)}
            onEdit={(formValue) => editWorkload(formValue, closeDrawer)}
            onDelete={(formValue) => deleteWorkload(formValue, closeDrawer)}
          />
          <ExtDrawer
            workloadList={workloadList}
            isOpen={isOpenExt}
            isLoading={isDownloading}
            onClose={() => closeExtDrawer()}
            onDownload={(formValue) => downloadExcelExt(formValue)}
          />
        </Loader>
      )}
    </div>
  )
}
