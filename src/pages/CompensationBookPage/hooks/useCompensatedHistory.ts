import dayjs from 'dayjs'
import { message } from 'antd'
import { useState, useEffect } from 'react'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import {
  createOneCompensatedOfSubject,
  deleteOneCompensated,
  getManyCompensatedOfSubject,
  ICompensated,
} from 'apis/subject'
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
      const query = {
        academic_year: academicYear,
        semester,
      }
      const compensatedList = await getManyCompensatedOfSubject(
        subjectId,
        query
      )
      setCompensatedList(compensatedList)
    } catch (error) {
      message.error(ErrorCode.C00)
      console.error(error)
    }
    setIsLoading(false)
  }

  const createCompensated = async (formValue: any, onSuccess = () => {}) => {
    if (!subjectId) {
      return
    }

    setIsLoading(true)
    try {
      const payload = {
        section: formValue.section,
        academicYear,
        semester,
        originalDate: dayjs(formValue.oldDate).toISOString(),
        compensatedDate: dayjs(formValue.compensatedDate).toISOString(),
        originalTimeList: [
          formValue.oldTime.map((t: any) => dayjs(t).format('HH:mm')),
        ],
        compensatedTimeList: [
          formValue.compensatedTime.map((t: any) => dayjs(t).format('HH:mm')),
        ],
      } as any
      if (formValue.roomId) {
        payload.roomId = formValue.roomId
      }

      await createOneCompensatedOfSubject(subjectId, payload)
      message.success('เพิ่มสำเร็จ')
      onSuccess()
      fetchCompensatedListOfSubject()
    } catch (error) {
      message.error(ErrorCode.C02)
      console.error(error)
    }
    setIsLoading(false)
  }

  const deleteCompensated = async (formValue: any) => {
    setIsLoading(true)
    try {
      await deleteOneCompensated(formValue.id)
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
