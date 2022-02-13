import { Form } from 'antd'
import { useState } from 'react'

import { IRawWorkloadOfTeacherWithDayjs } from 'apis/teacher'

export const useDrawerForm = () => {
  const [form] = Form.useForm<IRawWorkloadOfTeacherWithDayjs>()
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = (workload: IRawWorkloadOfTeacherWithDayjs) => {
    form.setFieldsValue(workload)
    setIsOpen(true)
  }

  const closeDrawer = () => {
    form.resetFields()
    setIsOpen(false)
  }

  return {
    form,
    isOpen,
    openDrawer,
    closeDrawer,
  }
}
