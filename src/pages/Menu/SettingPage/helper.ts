import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Notification } from 'components/Notification'
import { Form } from 'antd'
import { useAuth } from 'contexts/AuthContext'

const NOTI_SETTING = 'NOTI_SETTING'

export function useMenuSetting() {
  const [form] = Form.useForm()
  const [data, setData] = useState<any>({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { profile } = useAuth()

  async function getCurrentSetting() {
    setIsLoading(true)
    try {
      const { data } = await http.get('/setting')
      setData(data)
      setError(null)
    } catch (err) {
      setError(err)
      setData({})
    }
    setIsLoading(false)
  }

  async function editSetting(record: any) {
    console.log('>>test', record)
    setIsLoading(true)
    Notification.loading({ key: NOTI_SETTING, message: 'กำลังแก้ไขการตั้งค่า' })
    try {
      await http.put(`/setting`, record)
      await getCurrentSetting()
      Notification.success({
        key: NOTI_SETTING,
        message: 'แก้ไขการตั้งค่าสำเร็จ',
      })
    } catch (err) {
      Notification.error({
        key: NOTI_SETTING,
        message: 'เกิดข้อผิดพลาด',
        seeMore: err,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (profile) {
      getCurrentSetting()
    }
  }, [profile])

  return {
    form,
    isLoading,
    data,
    error,
    getCurrentSetting,
    editSetting,
  }
}
