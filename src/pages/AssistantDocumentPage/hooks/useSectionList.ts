import { useEffect, useState } from 'react'

import { getManySectionOfSubject, ISection } from 'apis/subject'
import { editManyAssistantWorkload } from 'apis/workload'
import { syncAssistant } from 'apis/sync'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'
import { useAuth } from 'contexts/AuthContext'

const SYNC_EXCEL_ASSISTANT_KEY = 'SYNC_EXCEL_ASSISTANT_KEY'

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

  async function importDataFromExcel(data: Record<string, string>[]) {
    setIsLoading(true)
    Notification.loading({
      key: SYNC_EXCEL_ASSISTANT_KEY,
      message: 'กำลังนำเข้าข้อมูล...',
    })
    try {
      const result = await syncAssistant(data)
      Notification.success({
        key: SYNC_EXCEL_ASSISTANT_KEY,
        message: 'นำเข้าข้อมูลสำเร็จ',
        seeMore: result,
      })
      await fetchSectionListOfSubject()
    } catch (error) {
      Notification.error({
        key: SYNC_EXCEL_ASSISTANT_KEY,
        message: ErrorCode.X06,
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
    importDataFromExcel,
  }
}
