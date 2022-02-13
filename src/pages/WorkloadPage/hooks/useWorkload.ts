import { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'

import { toDayjsTime } from 'libs/datetime'
import { ErrorCode } from 'constants/error'
import { Notification } from 'components/Notification'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import {
  createOneWorkload,
  deleteOneWorkload,
  editOneWorkload,
} from 'apis/workload'
import {
  getManyWorkloadOfTeacher,
  IRawWorkloadOfTeacherWithDayjs,
  IWorkloadOfTeacherWithDayjs,
} from 'apis/teacher'

const convertToWorkloadTime = (timeRangePicker: Dayjs[][]) => {
  return timeRangePicker.map(([start, end]) => {
    return [
      start.toDate().toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      end.toDate().toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    ]
  })
}

export const useWorkload = (teacherId: string) => {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [workloadList, setWorkloadList] = useState<
    IWorkloadOfTeacherWithDayjs[]
  >([])

  const fetchWorkloadOfTeacher = async () => {
    if (!teacherId) {
      return
    }
    setIsLoading(true)
    try {
      const workloadList = await getManyWorkloadOfTeacher(teacherId, {
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
        message: ErrorCode.W01,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const addWorkload = async (
    formValue: IRawWorkloadOfTeacherWithDayjs,
    onSuccess = () => {}
  ) => {
    const payload = {
      ...formValue,
      timeList: convertToWorkloadTime(formValue.timeList),
      section: Number(formValue.section),
      academicYear,
      semester,
    }
    const { id: _, ...payloadWithoutId } = payload

    setIsLoading(true)
    try {
      await createOneWorkload(payloadWithoutId)
      Notification.success({
        message: 'เพิ่มข้อมูลสำเร็จ',
      })
      onSuccess()
      fetchWorkloadOfTeacher()
    } catch (error) {
      Notification.error({
        message: ErrorCode.W08,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const editWorkload = async (
    formValue: IRawWorkloadOfTeacherWithDayjs,
    onSuccess = () => {}
  ) => {
    const payload = {
      teacherList: formValue.teacherList,
    }

    setIsLoading(true)
    try {
      await editOneWorkload(formValue.id, payload)
      Notification.success({
        message: 'แก้ไขข้อมูลสำเร็จ',
      })
      onSuccess()
      fetchWorkloadOfTeacher()
    } catch (error) {
      Notification.error({
        message: ErrorCode.W09,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const deleteWorkload = async (
    formValue: IRawWorkloadOfTeacherWithDayjs,
    onSuccess = () => {}
  ) => {
    setIsLoading(true)
    try {
      await deleteOneWorkload(formValue.id)
      Notification.success({
        message: 'ลบข้อมูลสำเร็จ',
      })
      onSuccess()
      fetchWorkloadOfTeacher()
    } catch (error) {
      Notification.error({
        message: ErrorCode.W10,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchWorkloadOfTeacher()
  }, [academicYear, semester, teacherId])

  return {
    isLoading,
    workloadList,
    addWorkload,
    editWorkload,
    deleteWorkload,
  }
}
