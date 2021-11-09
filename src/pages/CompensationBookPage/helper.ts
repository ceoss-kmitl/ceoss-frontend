import { Dayjs } from 'dayjs'
import { message } from 'antd'
import { useState, useEffect } from 'react'

import { getCurrentAcademicYear, toDayjsTime } from 'libs/datetime'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { delay } from 'libs/delay'

export function useAcademicYear() {
  const [currentAcademicYear, setCurrentAcademicYear] = useState(0)
  const [academicYear, setAcademicYear] = useState(0)
  const [semester, setSemester] = useState(0)

  function getAcademicYearOptionList() {
    const academicYearOptionList = []
    for (let i = 3; i >= 0; i--) {
      const year = currentAcademicYear - i
      academicYearOptionList.push({ label: year, value: year })
    }
    return academicYearOptionList
  }

  function getSemesterOptionList() {
    const semesterOptionList = []
    for (let i = 1; i <= 2; i++) {
      semesterOptionList.push({ label: i, value: i })
    }
    return semesterOptionList
  }

  useEffect(() => {
    const current = getCurrentAcademicYear()
    setCurrentAcademicYear(current.academicYear)
    setAcademicYear(current.academicYear)
    setSemester(current.semester)
  }, [])

  return {
    academicYear,
    semester,
    setAcademicYear,
    setSemester,
    academicYearOptionList: getAcademicYearOptionList(),
    semesterOptionList: getSemesterOptionList(),
  }
}

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
  const [subjectId, setSubjectId] = useState(null)
  const [compensatedList, setCompensatedList] = useState<ICompensated[]>([])
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  const getCompensatedListBySubjectId = async (id: string | null) => {
    if (!id) return

    setIsLoading(true)
    try {
      await delay(1)
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

  useEffect(() => {
    getCompensatedListBySubjectId(subjectId)
  }, [academicYear, semester, subjectId])

  return {
    isLoading,
    setSubjectId,
    compensatedList,
  }
}
