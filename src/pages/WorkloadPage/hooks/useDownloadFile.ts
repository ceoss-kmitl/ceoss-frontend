import { useState } from 'react'
import { omit } from 'lodash'

import { saveFile } from 'libs/utils'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'
import {
  downloadOneExcelFile,
  downloadOneExcelExternalFile,
  downloadOneExcel5File,
} from 'apis/teacher'

const MESSAGE_KEY = 'WORKLOAD_SYSTEM'

export const useDownloadFile = (teacherId?: string) => {
  const { academicYear, semester } = useAcademicYear()

  const [isDownloading, setIsDownloading] = useState(false)

  const downloadExcel = async () => {
    if (!teacherId) return

    Notification.loading({
      key: MESSAGE_KEY,
      message: 'กำลังดาวน์โหลด...',
    })
    setIsDownloading(true)
    try {
      const file = await downloadOneExcelFile(teacherId, {
        academicYear,
        semester,
      })
      saveFile(file)
      Notification.success({
        key: MESSAGE_KEY,
        message: 'ดาวน์โหลดสำเร็จ',
      })
    } catch (error) {
      Notification.error({
        key: MESSAGE_KEY,
        message: ErrorCode.W02,
        seeMore: error,
      })
    }
    setIsDownloading(false)
  }

  const downloadExcelExt = async (payload: any) => {
    if (!teacherId) return

    Notification.loading({
      key: MESSAGE_KEY,
      message: 'กำลังดาวน์โหลด...',
    })
    setIsDownloading(true)
    try {
      const file = await downloadOneExcelExternalFile(teacherId, {
        month: payload.month,
        workloadList: payload.subjectList.map((s: any) => ({
          ...omit(s, 'subjectId'),
          workloadId: s.subjectId,
        })),
        academicYear,
        semester,
      })
      saveFile(file)
      Notification.success({
        key: MESSAGE_KEY,
        message: 'ดาวน์โหลดสำเร็จ',
      })
    } catch (error) {
      Notification.error({
        key: MESSAGE_KEY,
        message: ErrorCode.W03,
        seeMore: error,
      })
    }
    setIsDownloading(false)
  }

  const downloadExcel5 = async () => {
    Notification.loading({
      key: MESSAGE_KEY,
      message: 'กำลังดาวน์โหลด...',
    })
    setIsDownloading(true)
    try {
      const file = await downloadOneExcel5File({
        academicYear,
        semester,
      })
      saveFile(file)
      Notification.success({
        key: MESSAGE_KEY,
        message: 'ดาวน์โหลดสำเร็จ',
      })
    } catch (error) {
      Notification.error({
        key: MESSAGE_KEY,
        message: ErrorCode.W04,
        seeMore: error,
      })
    }
    setIsDownloading(false)
  }

  return {
    isDownloading,
    downloadExcel,
    downloadExcelExt,
    downloadExcel5,
  }
}
