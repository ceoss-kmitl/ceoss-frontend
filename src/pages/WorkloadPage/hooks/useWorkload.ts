import { Dayjs } from 'dayjs'
import { message } from 'antd'
import { useState, useEffect } from 'react'

import { toDayjsTime } from 'libs/datetime'
import { ErrorCode } from 'constants/error'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import {
  createOneWorkload,
  deleteOneWorkload,
  editOneWorkload,
  getManyWorkloadOfTeacher,
  IRawWorkloadOfTeacherWithDayjs,
  IWorkloadOfTeacherWithDayjs,
} from 'apis/workload'

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
      message.error(ErrorCode.W01)
      console.error(error)
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
      message.success('เพิ่มข้อมูลสำเร็จ')
      onSuccess()
      fetchWorkloadOfTeacher()
    } catch (error) {
      message.error(ErrorCode.W08)
      console.error(error)
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
      message.success('แก้ไขข้อมูลสำเร็จ')
      onSuccess()
      fetchWorkloadOfTeacher()
    } catch (error) {
      message.error(ErrorCode.W09)
      console.error(error)
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
      message.success('ลบข้อมูลสำเร็จ')
      onSuccess()
      fetchWorkloadOfTeacher()
    } catch (error) {
      message.error(ErrorCode.W10)
      console.error(error)
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
