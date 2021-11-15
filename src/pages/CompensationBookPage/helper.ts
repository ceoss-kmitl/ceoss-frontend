import dayjs from 'dayjs'
import { message } from 'antd'
import { useState, useEffect } from 'react'

import { http } from 'libs/http'
import { Modal } from 'components/Modal'

interface ICompensated {
  section: number
  compensatedList: {
    compensatedId: string
    originalDate: string
    originalTimeList: { start: string; end: string }[]
    compensatedDate: string
    compensatedTimeList: { start: string; end: string }[]
    room: string
  }[]
}

export function useCompensatedHistory(academicYear: number, semester: number) {
  const [subjectId, setSubjectId] = useState('')
  const [compensatedList, setCompensatedList] = useState<ICompensated[]>([])
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  const getCompensatedListBySubjectId = async (id: string | null) => {
    if (!id) return

    setIsLoading(true)
    try {
      const { data } = await http.get<ICompensated[]>(
        `/subject/${subjectId}/compensated`,
        {
          params: {
            academic_year: academicYear,
            semester,
          },
        }
      )
      setCompensatedList(data)
    } catch (err) {
      Modal.error({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเรียกดูประวัติการสอนชดเชยได้',
      })
      setCompensatedList([])
    }

    setIsLoading(false)
  }

  const createCompensated = async (formData: any) => {
    setIsLoading(true)
    try {
      const payload = {
        section: formData.section,
        academicYear,
        semester,
        originalDate: dayjs(formData.oldDate).toISOString(),
        compensatedDate: dayjs(formData.compensatedDate).toISOString(),
        originalTimeList: [
          formData.oldTime.map((t: any) => dayjs(t).format('HH:mm')),
        ],
        compensatedTimeList: [
          formData.compensatedTime.map((t: any) => dayjs(t).format('HH:mm')),
        ],
      } as any
      if (formData.roomId) {
        payload.roomId = formData.roomId
      }

      await http.post(`/subject/${subjectId}/compensated`, payload)
      await getCompensatedListBySubjectId(subjectId)
      message.success('เพิ่มสำเร็จ!')
    } catch (err) {
      message.error(err.message, 10)
    }
    setIsLoading(false)
  }

  const deleteCompensated = async (compensatedId: string) => {
    setIsLoading(true)
    try {
      await http.delete(`/subject/compensated/${compensatedId}`)
      await getCompensatedListBySubjectId(subjectId)
    } catch (err) {
      message.error(err.message, 10)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getCompensatedListBySubjectId(subjectId)
  }, [academicYear, semester, subjectId])

  return {
    isLoading,
    setSubjectId,
    compensatedList,
    createCompensated,
    deleteCompensated,
  }
}
