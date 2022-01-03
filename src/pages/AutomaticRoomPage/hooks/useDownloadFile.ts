import { useState } from 'react'

import { saveFile } from 'libs/utils'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { ErrorCode } from 'constants/error'
import { downloadOneExcelFile } from 'apis/room'
import { Notification } from 'components/Notification'

const MESSAGE_KEY = 'AUTOROOM_SYSTEM'

export const useDownloadFile = () => {
  const { academicYear, semester } = useAcademicYear()

  const [isDownloading, setIsDownloading] = useState(false)

  const downloadExcel = async () => {
    Notification.loading({
      key: MESSAGE_KEY,
      message: 'กำลังดาวน์โหลด...',
    })
    setIsDownloading(true)
    try {
      const file = await downloadOneExcelFile({
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
        message: ErrorCode.R06,
        seeMore: error,
      })
    }
    setIsDownloading(false)
  }

  return {
    isDownloading,
    downloadExcel,
  }
}
