import { useEffect, useState } from 'react'

import { toDayjsTime } from 'libs/datetime'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { Modal } from 'components/Modal'
import { Notification } from 'components/Notification'
import { IWorkloadOfTeacherWithDayjs } from 'apis/teacher'
import {
  createManyWorkloadOfRoom,
  deleteOneWorkloadOfRoom,
  getManyWorkloadOfRoom,
  triggerManyRoomAutoAssign,
  triggerManyRoomResetAssign,
} from 'apis/room'
import { ErrorCode } from 'constants/error'

export const useAutoRoom = (roomId: string) => {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [workloadList, setWorkloadList] = useState<
    IWorkloadOfTeacherWithDayjs[]
  >([])

  const fetchWorkloadOfRoom = async () => {
    if (!roomId) {
      return
    }
    setIsLoading(true)
    try {
      const workloadList = await getManyWorkloadOfRoom(roomId, {
        academicYear,
        semester,
        compensation: false,
      })
      const workloadListWithDayjs = workloadList.map((day) => ({
        workloadList: day.workloadList.map((workload) => ({
          ...workload,
          timeList: workload.timeList.map((time) => [
            toDayjsTime(time.start),
            toDayjsTime(time.end),
          ]),
        })),
      }))
      setWorkloadList(workloadListWithDayjs)
    } catch (error) {
      setWorkloadList([])
      Notification.error({
        message: ErrorCode.R01,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const addWorkloadToRoom = async (
    workloadIdList: string[],
    onSuccess = () => {}
  ) => {
    const payload = {
      workloadIdList,
    }

    setIsLoading(true)
    try {
      await createManyWorkloadOfRoom(roomId, payload)
      Notification.success({
        message: 'เพิ่มสำเร็จ',
      })
      onSuccess()
      fetchWorkloadOfRoom()
    } catch (error) {
      Notification.error({
        message: ErrorCode.R02,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const removeWorkloadFromRoom = async (
    formValue: any,
    onSuccess = () => {}
  ) => {
    setIsLoading(true)
    try {
      await deleteOneWorkloadOfRoom(roomId, formValue.id)
      Notification.success({
        message: 'นำออกสำเร็จ',
      })
      onSuccess()
      fetchWorkloadOfRoom()
    } catch (error) {
      Notification.error({
        message: ErrorCode.R03,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const triggerAutoRoom = async () => {
    Modal.warning({
      title: 'จัดห้องอัตโนมัติ',
      okText: 'ตกลง',
      description: `ระบบจะจัดเรียงรายวิชาของปี ${academicYear}/${semester} ลงในห้องโดยอัตโนมัติ`,
      loadingText: 'กำลังจัดห้องอัตโนมัติ',
      onAsyncOk: async () => {
        try {
          await triggerManyRoomAutoAssign({
            academicYear,
            semester,
          })
          Notification.success({
            message: 'จัดห้องอัตโนมัติสำเร็จ',
          })
          fetchWorkloadOfRoom()
        } catch (error) {
          Notification.error({
            message: ErrorCode.R04,
            seeMore: error,
          })
        }
      },
    })
  }

  const triggerResetRoom = () => {
    Modal.warning({
      title: 'รีเซตการจัดห้อง',
      okText: 'รีเซต',
      description: `ต้องการรีเซตการจัดห้องทั้งหมดของปี ${academicYear}/${semester} หรือไม่`,
      finishTitle: 'รีเซตการจัดห้องสำเร็จ',
      finishFailTitle: 'เกิดข้อผิดพลาดบางอย่าง',
      onAsyncOk: async () => {
        try {
          await triggerManyRoomResetAssign({
            academicYear,
            semester,
          })
          Notification.success({
            message: 'รีเซตการจัดห้องสำเร็จ',
          })
          fetchWorkloadOfRoom()
        } catch (error) {
          Notification.error({
            message: ErrorCode.R05,
            seeMore: error,
          })
        }
      },
    })
  }

  useEffect(() => {
    fetchWorkloadOfRoom()
  }, [academicYear, semester, roomId])

  return {
    isLoading,
    workloadList,
    addWorkloadToRoom,
    removeWorkloadFromRoom,
    triggerAutoRoom,
    triggerResetRoom,
  }
}
