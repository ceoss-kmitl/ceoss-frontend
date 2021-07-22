import { useState } from 'react'
import { Form } from 'antd'

export function useTableEditor<T = any>(initialData: T) {
  const [form] = Form.useForm()
  const [data, setData] = useState(initialData)
  const [editingIndex, setEditingIndex] = useState(-1)

  const isEditing = (index: number) => index === editingIndex

  return {
    form,
    setEditingIndex,
    isEditing,
  }
}
