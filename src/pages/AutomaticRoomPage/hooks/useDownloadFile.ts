import { useState } from 'react'
import { message } from 'antd'

import { saveFile } from 'libs/utils'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { ErrorCode } from 'constants/error'
import { downloadOneExcelFile } from 'apis/room'

const MESSAGE_KEY = 'AUTOROOM_SYSTEM'

export const useDownloadFile = () => {
  const { academicYear, semester } = useAcademicYear()

  const [isDownloading, setIsDownloading] = useState(false)

  const downloadExcel = async () => {
    message.loading({ key: MESSAGE_KEY, content: 'กำลังดาวน์โหลด...' })
    setIsDownloading(true)
    try {
      const file = await downloadOneExcelFile({
        academicYear,
        semester,
      })
      saveFile(file)
      message.success({ key: MESSAGE_KEY, content: 'ดาวน์โหลดสำเร็จ' })
    } catch (error) {
      message.error({ key: MESSAGE_KEY, content: ErrorCode.R06 })
      console.error(error)
    }
    setIsDownloading(false)
  }

  return {
    isDownloading,
    downloadExcel,
  }
}
