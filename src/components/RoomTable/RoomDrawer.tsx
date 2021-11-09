import css from 'classnames'
import localeTH from 'antd/es/date-picker/locale/th_TH'
import {
  Button as AntdButton,
  Col,
  Drawer as AntdDrawer,
  Form,
  message,
  Popconfirm,
  Row,
} from 'antd'
import { FiX, FiTrash2 } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'

import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import { Loader } from 'components/Loader'
import { Text } from 'components/Text'
import { DatePicker } from 'components/DatePicker'
import { Select } from 'components/Select'
import { Input } from 'components/Input'
import {
  dayOfWeekOptionList,
  degreeOptionList,
  typeOptionList,
} from 'constants/selectOption'

import style from './RoomDrawer.module.scss'
import {
  classYearOptionList,
  IPrivateUseTimeTable,
  useTimeTable,
} from './helper'
import { http } from 'libs/http'
import { useState } from 'react'
import { useEffect } from 'react'
import { DAY_OF_WEEK } from 'constants/enum'

interface IProps {
  use: ReturnType<typeof useTimeTable>
}

const dayName = {
  [DAY_OF_WEEK.MONDAY]: 'วันจันทร์',
  [DAY_OF_WEEK.TUESDAY]: 'วันอังคาร',
  [DAY_OF_WEEK.WEDNESDAY]: 'วันพุธ',
  [DAY_OF_WEEK.THURSDAY]: 'วันพฤหัสบดี',
  [DAY_OF_WEEK.FRIDAY]: 'วันศุกร์',
  [DAY_OF_WEEK.SATURDAY]: 'วันเสาร์',
  [DAY_OF_WEEK.SUNDAY]: 'วันอาทิตย์',
}

export const RoomDrawer: React.FC<IProps> = ({ use }) => {
  const { _ } = use as IPrivateUseTimeTable
  const [workloadList, setWorkloadList] = useState([] as any[])
  const [isLoading2, setIsLoading2] = useState(true)
  const [workloadIdList, setWorkloadIdList] = useState([] as string[])

  const {
    config,
    isLoading,
    roomForm,
    formAction,
    isDrawerVisible,
    closeDrawer,
    handleOnFinish,
    handleOnDelete,
    subjectOptionList,
    teacherOptionList,
    roomOptionList,
  } = _

  const getWorkloadNoRoom = async () => {
    setIsLoading2(true)
    try {
      const { data } = await http.get('/workload/no-room', {
        params: {
          academic_year: config.academicYear,
          semester: config.semester,
        },
      })
      setWorkloadList(
        data.map((d: any) => ({
          ...d,
          checked: false,
        }))
      )
    } catch (err) {
      message.error(err.message)
      setWorkloadList([])
    }
    setIsLoading2(false)
  }

  useEffect(() => {
    if (isDrawerVisible) getWorkloadNoRoom()
  }, [isDrawerVisible])

  const isFormDisabled = formAction === 'EDIT'

  return (
    <AntdDrawer
      width={560}
      visible={isDrawerVisible && formAction === 'ADD'}
      onClose={closeDrawer}
      maskClosable={!isLoading}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading || isLoading2,
          })}
        >
          <FiX className={style.closeIcon} onClick={closeDrawer} />
          <Text size="sub-head" bold className={style.title}>
            {formAction === 'ADD'
              ? `ห้อง ${config.room.name}`
              : 'รายละเอียดวิชาสอน'}
          </Text>
          <Button
            small
            onClick={() => {
              roomForm.setFieldsValue({
                workloadIdList: workloadList
                  .filter((w) => w.checked)
                  .map((w) => w.workloadId),
              })
              roomForm.submit()
            }}
            disabled={false}
          >
            <AiFillEdit className={style.submitIcon} />
            บันทึกข้อมูล
          </Button>
        </div>
      }
    >
      <Loader loading={isLoading || isLoading2}>
        <Form
          form={roomForm}
          layout="vertical"
          hideRequiredMark
          onFinish={
            formAction === 'ADD'
              ? handleOnFinish(config.onAdd!)
              : handleOnFinish(config.onEdit!)
          }
        >
          <Text size="sub-head" bold className={style.topic}>
            ภาระงานที่ยังไม่มีห้องเรียน
          </Text>
          <Form.List name="workloadIdList">{() => <div></div>}</Form.List>
          {workloadList.map((workload) => (
            <div className={style.checkWrapper}>
              <Checkbox
                className={style.left}
                checked={workload.checked}
                onChange={(e) => {
                  const newWorkloadList = workloadList.map((w) =>
                    w.workloadId === workload.workloadId
                      ? { ...w, checked: e.target.checked }
                      : w
                  )
                  setWorkloadList(newWorkloadList)
                }}
              />
              <div className={style.right}>
                <div>
                  {`${workload.subjectCode} ${workload.subjectName} กลุ่ม ${workload.section}`}
                </div>
                <div>
                  {`${
                    dayName[workload.dayOfWeek as keyof typeof dayName]
                  } เวลา ${workload.startTime} - ${workload.endTime}`}
                </div>
              </div>
            </div>
          ))}
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
