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

export const useWorkload = (teacherId?: string) => {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [workloadList, setWorkloadList] = useState<any[]>([])

  const fetchWorkloadOfTeacher = async () => {
    if (!teacherId) {
      return
    }
    setIsLoading(true)
    try {
      const query = {
        academic_year: academicYear,
        semester,
      }
      const workloadList = await getManyWorkloadOfTeacher(teacherId, query)
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

  const addWorkload = async (formValue: any) => {
    const payload = {
      ...formValue,
      timeList: convertToWorkloadTime(formValue.timeList),
      section: Number(formValue.section),
      academicYear,
      semester,
    }
    delete payload.id

    setIsLoading(true)
    await createOneWorkload(payload)
    await fetchWorkloadOfTeacher()
    setIsLoading(false)
  }

  const editWorkload = async (workload: any) => {
    const payload = {
      teacherList: workload.teacherList,
    }

    setIsLoading(true)
    await editOneWorkload(workload.id, payload)
    await fetchWorkloadOfTeacher()
    setIsLoading(false)
  }

  const deleteWorkload = async (workload: any) => {
    setIsLoading(true)
    await deleteOneWorkload(workload.id)
    await fetchWorkloadOfTeacher()
    setIsLoading(false)
  }

  useEffect(() => {
    fetchWorkloadOfTeacher()
  }, [academicYear, semester, teacherId])

  return {
    isLoading,
    workloadList,
    fetchWorkloadOfTeacher,
    addWorkload,
    editWorkload,
    deleteWorkload,
  }
}
