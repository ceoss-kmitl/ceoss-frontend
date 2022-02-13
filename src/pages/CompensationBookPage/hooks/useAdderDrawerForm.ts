import { Form } from 'antd'
import { useState } from 'react'

export const useAdderDrawerForm = () => {
  const [formAdder] = Form.useForm()
  const [isOpenAdder, setIsOpenAdder] = useState(false)

  const openAdderDrawer = () => {
    formAdder.resetFields()
    setIsOpenAdder(true)
  }

  const closeAdderDrawer = () => {
    formAdder.resetFields()
    setIsOpenAdder(false)
  }

  return {
    formAdder,
    isOpenAdder,
    openAdderDrawer,
    closeAdderDrawer,
  }
}
