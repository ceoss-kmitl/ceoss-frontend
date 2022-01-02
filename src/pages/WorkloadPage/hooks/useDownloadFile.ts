import { useState } from 'react'
import { message } from 'antd'

import { saveFile } from 'libs/utils'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { ErrorCode } from 'constants/error'
import {
  downloadOneExcel5File,
  downloadOneExcelExternalFile,
} from 'apis/workload'
import { downloadOneExcelFile } from 'apis/teacher'

const MESSAGE_KEY = 'WORKLOAD_SYSTEM'

export const useDownloadFile = (teacherId?: string) => {
  const { academicYear, semester } = useAcademicYear()

  const [isDownloading, setIsDownloading] = useState(false)

  const downloadExcel = async () => {
    if (!teacherId) return

    message.loading({ key: MESSAGE_KEY, content: 'กำลังดาวน์โหลด...' })
    setIsDownloading(true)
    try {
      const file = await downloadOneExcelFile(teacherId, {
        academicYear,
        semester,
      })
      saveFile(file)
      message.success({ key: MESSAGE_KEY, content: 'ดาวน์โหลดสำเร็จ' })
    } catch (error) {
      message.error({ key: MESSAGE_KEY, content: ErrorCode.W02 })
      console.error(error)
    }
    setIsDownloading(false)
  }

  const downloadExcelExt = async (payload: any) => {
    message.loading({ key: MESSAGE_KEY, content: 'กำลังดาวน์โหลด...' })
    setIsDownloading(true)
    try {
      const query = {
        teacher_id: teacherId,
        academic_year: academicYear,
        semester,
      }
      const file = await downloadOneExcelExternalFile(payload, query)
      saveFile(file)
      message.success({ key: MESSAGE_KEY, content: 'ดาวน์โหลดสำเร็จ' })
    } catch (error) {
      message.error({ key: MESSAGE_KEY, content: ErrorCode.W03 })
      console.error(error)
    }
    setIsDownloading(false)
  }

  const downloadExcel5 = async () => {
    message.loading({ key: MESSAGE_KEY, content: 'กำลังดาวน์โหลด...' })
    setIsDownloading(true)
    try {
      const query = {
        academic_year: academicYear,
        semester,
      }
      const file = await downloadOneExcel5File(query)
      saveFile(file)
      message.success({ key: MESSAGE_KEY, content: 'ดาวน์โหลดสำเร็จ' })
    } catch (error) {
      message.error({ key: MESSAGE_KEY, content: ErrorCode.W04 })
      console.error(error)
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
