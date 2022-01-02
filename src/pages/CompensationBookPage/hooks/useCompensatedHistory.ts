import dayjs from 'dayjs'
import { message } from 'antd'
import { useState, useEffect } from 'react'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import {
  deleteOneCompensated,
  getManyCompensatedOfSubject,
  ICompensated,
} from 'apis/subject'
import { createOneCompensationWorkload, deleteOneWorkload } from 'apis/workload'
import { ErrorCode } from 'constants/error'

export function useCompensatedHistory(subjectId: string) {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [compensatedList, setCompensatedList] = useState<ICompensated[]>([])

  const fetchCompensatedListOfSubject = async () => {
    if (!subjectId) {
      return
    }

    setIsLoading(true)
    try {
      const compensatedList = await getManyCompensatedOfSubject(subjectId, {
        academicYear,
        semester,
      })
      setCompensatedList(compensatedList)
    } catch (error) {
      message.error(ErrorCode.C00)
      console.error(error)
    }
    setIsLoading(false)
  }

  const createCompensated = async (formValue: any, onSuccess = () => {}) => {
    setIsLoading(true)
    try {
      const payload = {
        originalDate: dayjs(formValue.oldDate).toDate(),
        compensatedDate: dayjs(formValue.compensatedDate).toDate(),
        compensatedTimeList: [
          formValue.compensatedTime.map((t: any) => dayjs(t).format('HH:mm')),
        ],
      } as any
      if (formValue.roomId !== 'NULL') {
        payload.roomId = formValue.roomId
      }

      await createOneCompensationWorkload(formValue.workloadId, payload)
      message.success('เพิ่มสำเร็จ')
      onSuccess()
      fetchCompensatedListOfSubject()
    } catch (error) {
      message.error(ErrorCode.C02)
      console.error(error)
    }
    setIsLoading(false)
  }

  const deleteCompensated = async (compensatedId: string) => {
    setIsLoading(true)
    try {
      await deleteOneWorkload(compensatedId)
      message.success('ลบสำเร็จ')
      fetchCompensatedListOfSubject()
    } catch (error) {
      message.error(ErrorCode.C03)
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCompensatedListOfSubject()
  }, [academicYear, semester, subjectId])

  return {
    isLoading,
    compensatedList,
    createCompensated,
    deleteCompensated,
  }
}
