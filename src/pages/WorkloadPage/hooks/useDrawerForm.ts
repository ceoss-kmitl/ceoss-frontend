import { Form } from 'antd'
import { useState } from 'react'

import { IRawWorkloadOfTeacherWithDayjs } from 'apis/teacher'
import { FormMode } from 'constants/common'

export const useDrawerForm = () => {
  const [form] = Form.useForm<IRawWorkloadOfTeacherWithDayjs>()
  const [formMode, setFormMode] = useState(FormMode.CREATE)
  const [isOpen, setIsOpen] = useState(false)

  const openDrawerCreateMode = () => {
    setFormMode(FormMode.CREATE)
    form.resetFields()
    setIsOpen(true)
  }

  const openDrawerEditMode = (data: IRawWorkloadOfTeacherWithDayjs) => {
    setFormMode(FormMode.EDIT)
    form.setFieldsValue(data)
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
