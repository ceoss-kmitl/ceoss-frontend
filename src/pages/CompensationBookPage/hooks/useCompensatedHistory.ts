import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import { getManyCompensatedOfSubject, ICompensated } from 'apis/subject'
import { createOneCompensationWorkload, deleteOneWorkload } from 'apis/workload'
import { ErrorCode } from 'constants/error'
import { Notification } from 'components/Notification'
import { useAuth } from 'contexts/AuthContext'

export function useCompensatedHistory(subjectId: string) {
  const { academicYear, semester } = useAcademicYear()
  const { profile } = useAuth()

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
      Notification.error({
        message: ErrorCode.C00,
        seeMore: error,
      })
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
      Notification.success({
        message: 'เพิ่มสำเร็จ',
      })
      onSuccess()
      fetchCompensatedListOfSubject()
    } catch (error) {
      Notification.error({
        message: ErrorCode.C02,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const deleteCompensated = async (compensatedId: string) => {
    setIsLoading(true)
    try {
      await deleteOneWorkload(compensatedId)
      Notification.success({
        message: 'ลบสำเร็จ',
      })
      fetchCompensatedListOfSubject()
    } catch (error) {
      Notification.error({
        message: ErrorCode.C03,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (profile) {
      fetchCompensatedListOfSubject()
    }
  }, [academicYear, semester, subjectId, profile])

  return {
    isLoading,
    compensatedList,
    createCompensated,
    deleteCompensated,
    reloadData: fetchCompensatedListOfSubject,
  }
}
