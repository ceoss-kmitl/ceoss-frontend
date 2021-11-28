import { Form } from 'antd'
import { useState } from 'react'

import { IRawWorkloadOfTeacherWithDayjs } from 'apis/workload'
import { FormMode } from 'constants/common'

export const useDrawerForm = () => {
  const [form] = Form.useForm<IRawWorkloadOfTeacherWithDayjs>()
  const [formMode, setFormMode] = useState(FormMode.CREATE)
  const [isOpen, setIsOpen] = useState(false)

  const openDrawerCreateMode = () => {
    setFormMode(FormMode.CREATE)
    setIsOpen(true)
  }

  const openDrawerEditMode = (data: any) => {
    form.setFieldsValue(data)
    setFormMode(FormMode.EDIT)
    setIsOpen(true)
  }

  const closeDrawer = () => {
    form.resetFields()
    setIsOpen(false)
  }

  return {
    form,
    formMode,
    isOpen,
    openDrawerCreateMode,
    openDrawerEditMode,
    closeDrawer,
  }
}
