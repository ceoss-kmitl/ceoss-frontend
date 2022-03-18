import { useEffect, useState } from 'react'
import { Form } from 'antd'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import { getManyWeb, IUpsertWeb, upsertManyWeb } from 'apis/web'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'

export function useAdvanceSetting() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm()
  const { academicYear, semester } = useAcademicYear()

  const openDrawer = () => {
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }

  const fetchWebList = async () => {
    setIsLoading(true)
    try {
      const webList = await getManyWeb()
      form.setFieldsValue({
        webList,
      })
    } catch (error) {
      Notification.error({
        message: ErrorCode.S00,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  const updateWebList = async (payload: IUpsertWeb, onSuccess = () => {}) => {
    setIsLoading(true)
    try {
      await upsertManyWeb(payload)
      await fetchWebList()
      onSuccess()
    } catch (error) {
      Notification.error({
        message: ErrorCode.S01,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchWebList()
  }, [academicYear, semester])

  return {
    isLoading,
    isOpen,
    form,
    openDrawer,
    closeDrawer,
    updateWebList,
  }
}
