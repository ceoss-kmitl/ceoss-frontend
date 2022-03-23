import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { Form } from 'antd'
import { useAuth } from 'contexts/AuthContext'

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
    Modal.loading({
      loadingText: 'กำลังแก้ไขการตั้งค่า',
      finishTitle: 'แก้ไขการตั้งค่าสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'ไม่สามารถแก้ไขการตั้งค่าได้',
      finishFailText: 'ตกลง',
      width: 400,
      onAsyncOk: async () => {
        try {
          await http.put(`/setting`, record)
          await getCurrentSetting()
        } catch (err) {
          throw err
        }
      },
    })
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
