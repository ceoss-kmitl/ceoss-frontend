import { useEffect, useState } from 'react'

import { getManySectionOfSubject, ISection } from 'apis/subject'
import { editManyAssistantWorkload } from 'apis/workload'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'
import { useAuth } from 'contexts/AuthContext'

export const useSectionList = (subjectId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [sectionList, setSectionList] = useState<ISection[]>([])
  const { academicYear, semester } = useAcademicYear()
  const { profile } = useAuth()

  const fetchSectionListOfSubject = async () => {
    if (!subjectId) return

    setIsLoading(true)
    try {
      const sectionList = await getManySectionOfSubject(subjectId, {
        academicYear,
        semester,
      })
      setSectionList(sectionList)
    } catch (error) {
      setSectionList([])
      Notification.error({
        message: ErrorCode.A01,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const editAssistantListOfSubject = async (
    payload: any,
    onSuccess: () => void = () => {}
  ) => {
    setIsLoading(true)
    try {
      await editManyAssistantWorkload(payload)
      fetchSectionListOfSubject()
      onSuccess()
    } catch (error) {
      Notification.error({
        message: ErrorCode.A02,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (profile) {
      fetchSectionListOfSubject()
    }
  }, [subjectId, academicYear, semester, profile])

  return {
    isLoading,
    sectionList,
    editAssistantListOfSubject,
  }
}
