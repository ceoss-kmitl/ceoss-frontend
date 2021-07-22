import { useState } from 'react'
import { Form } from 'antd'

interface IBaseColumn {
  text: string
  dataIndex: string
  width?: string
  editable?: boolean
}

interface ITextColumn extends IBaseColumn {
  type?: 'text'
}

interface ICheckboxColumn extends IBaseColumn {
  type: 'checkbox'
}

interface ISelectColumn extends IBaseColumn {
  type: 'select'
  selectList: string[]
}

export type IColumn = ITextColumn | ICheckboxColumn | ISelectColumn

export function useTableEditor<T = any>(initialData: T) {
  const [form] = Form.useForm()
  const [data, setData] = useState(initialData)
  const [editingKey, setEditingKey] = useState(-1)

  const isEditing = (record: any) => record.key === editingKey

  return {
    form,
    editingKey,
    setEditingKey,
    isEditing,
  }
}

export function addKey(data: any[]) {
  return data.map((eachData, index) => ({
    ...eachData,
    key: index,
  }))
}

export function convertToAntdColumn(
  columnList: IColumn[],
  editor?: ReturnType<typeof useTableEditor>
) {
  if (!editor) return columnList.map((col) => ({ ...col, title: col.text }))

  return columnList.map((col) => {
    if (!col.editable) {
      return { ...col, title: col.text }
    }
    return {
      ...col,
      title: col.text,
      onCell: (record: any) => ({
        type: col.type,
        dataIndex: col.dataIndex,
        title: col.text,
        editing: editor.isEditing(record),
      }),
    }
  })
}
