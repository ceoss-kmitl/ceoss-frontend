import dayjs from 'dayjs'
import { useState } from 'react'
import { Form } from 'antd'

import { ISection } from 'apis/subject'

export const useDrawerForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm()

  const openDrawer = (value: ISection) => {
    setIsOpen(true)
    form.setFieldsValue({
      assistantList: value.assistantList.map((a) => ({
        assistantId: a.id,
        assistantName: a.name,
      })),
      dayList: value.dayList.map((d) => dayjs(d).startOf('day')),
      workloadIdList: value.workloadIdList,
    })
  }

  const closeDrawer = () => {
    setIsOpen(false)
    form.resetFields()
  }

  return {
    form,
    isOpen,
    openDrawer,
    closeDrawer,
  }
}
