import { useEffect, useState } from 'react'
import { Form } from 'antd'

import { getManyWeb, IUpsertWeb, upsertManyWeb } from 'apis/web'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'
import { useAuth } from 'contexts/AuthContext'
import { useWebContext } from 'contexts/WebContext'

export function useAdvanceSetting() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm()
  const { profile } = useAuth()
  const { updateWebList: updateWebListContext } = useWebContext()

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
      updateWebListContext(webList)
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
      Notification.success({
        message: 'บันทึกการตั้งค่าขั้นสูงสำเร็จ',
      })
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
    if (profile) {
      fetchWebList()
    }
  }, [profile])

  return {
    isLoading,
    isOpen,
    form,
    openDrawer,
    closeDrawer,
    updateWebList,
  }
}
