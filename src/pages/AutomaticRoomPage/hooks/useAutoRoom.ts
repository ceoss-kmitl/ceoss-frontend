import { useEffect, useState } from 'react'
import { message } from 'antd'

import { toDayjsTime } from 'libs/datetime'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { Modal } from 'components/Modal'
import { IWorkloadOfTeacherWithDayjs } from 'apis/workload'
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
      const query = {
        academic_year: academicYear,
        semester,
      }
      const workloadList = await getManyWorkloadOfRoom(roomId, query)
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
      message.error(ErrorCode.R01)
      console.error(error)
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
      message.success('เพิ่มสำเร็จ')
      onSuccess()
      fetchWorkloadOfRoom()
    } catch (error) {
      message.error(ErrorCode.R02)
      console.error(error)
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
      message.success('นำออกสำเร็จ')
      onSuccess()
      fetchWorkloadOfRoom()
    } catch (error) {
      message.error(ErrorCode.R03)
      console.error(error)
    }
    setIsLoading(false)
  }

  const triggerAutoRoom = async () => {
    Modal.loading({
      loadingText: 'กำลังจัดห้องอัตโนมัติ',
      finishTitle: 'จัดห้องอัตโนมัติสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'เกิดข้อผิดพลาดบางอย่าง',
      finishFailText: 'ตกลง',
      width: 400,
      onAsyncOk: async () => {
        const query = {
          academic_year: academicYear,
          semester,
        }
        try {
          await triggerManyRoomAutoAssign(query)
          fetchWorkloadOfRoom()
        } catch (error) {
          message.error(ErrorCode.R04)
          console.error(error)
          throw error
        }
      },
    })
  }

  const triggerResetRoom = () => {
    Modal.warning({
      title: 'รีเซตการจัดห้อง',
      okText: 'รีเซต',
      description: 'คุณต้องการรีเซตการจัดห้องทั้งหมดหรือไม่',
      finishTitle: 'รีเซตการจัดห้องสำเร็จ',
      finishFailTitle: 'เกิดข้อผิดพลาดบางอย่าง',
      width: 400,
      onAsyncOk: async () => {
        const query = {
          academic_year: academicYear,
          semester,
        }
        try {
          await triggerManyRoomResetAssign(query)
          fetchWorkloadOfRoom()
        } catch (error) {
          message.error(ErrorCode.R05)
          console.error(error)
          throw error
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
