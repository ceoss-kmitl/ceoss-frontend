import { get, isEqual } from 'lodash'
import { useRef } from 'react'
import xlsx from 'xlsx'

import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'

interface IConfig {
  headers: string[]
  onUpload: (data: Record<string, string>[]) => void
}

export const useUploadFile = ({ headers, onUpload = () => {} }: IConfig) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!inputRef.current) {
      return Notification.error({
        message: ErrorCode.X00,
      })
    }
    inputRef.current.value = ''
    inputRef.current.click()
  }

  const validateHeaders = (worksheet: xlsx.WorkSheet) => {
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
    const resultHeaders = get(jsonData, 0, [])
    return isEqual(resultHeaders, headers)
  }

  const handleOnUpload = async (jsonData: Record<string, string>[]) => {
    try {
      await onUpload(jsonData)
    } catch (error) {
      throw error
    }
  }

  const handleChange = (files: HTMLInputElement['files']) => {
    const file = get(files, 0, null)
    if (!file) {
      return Notification.error({
        message: ErrorCode.X01,
      })
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as any)
      const workbook = xlsx.read(data, { type: 'array' })
      const firstSheet = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheet]

      if (!validateHeaders(worksheet)) {
        return Notification.error({
          message: ErrorCode.X02,
          seeMore: { รูปแบบข้อมูลที่ต้องการ: headers },
        })
      }
      const jsonData = xlsx.utils.sheet_to_json<Record<string, string>>(
        worksheet,
        { defval: '', blankrows: false }
      )

      handleOnUpload(jsonData)
    }
    reader.readAsArrayBuffer(file)
  }

  return {
    inputRef,
    handleChange,
    handleClick,
  }
}
