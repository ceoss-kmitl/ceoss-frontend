import React, { useState, useEffect } from 'react'
import { Form } from 'antd'

interface IBaseColumn {
  text: string
  dataIndex: string
  width?: string
  align?: 'left' | 'right' | 'center'
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

export type IRecord = Record<string, string | number | boolean> & {
  key?: number
}

interface ITableConfig {
  initialData: IRecord[]
  columnList: IColumn[]
  onAdd?: (record: IRecord) => void
  onEdit?: (record: IRecord) => void
  onDelete?: (record: IRecord) => void
}

interface IEditorAction {
  type: 'add' | 'edit' | 'delete'
  payload: IRecord
}

export enum EditingStatus {
  NotEditing = -1,
  NewlyAdded = -2,
}

/**
 * Custom hooks to use with `<Table />` component
 */
export function useTable(config: ITableConfig) {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IEditorAction | null>(null)
  const [editingKey, setEditingKey] = useState(EditingStatus.NotEditing)
  const [tableData, setTableData] = useState<IRecord[]>(config.initialData)

  const isEditing = (record: IRecord) => record.key === editingKey

  const isEditable = () => editingKey !== EditingStatus.NotEditing

  const event = (
    type: IEditorAction['type'],
    payload: IEditorAction['payload']
  ) => {
    setAction({ type, payload })
    stopEditing()
  }

  const startEditing = (record: IRecord) => {
    form.setFieldsValue(record)
    setEditingKey(record.key!)
  }

  const stopEditing = () => {
    if (editingKey === EditingStatus.NewlyAdded) {
      setTableData((prev) => prev.slice(1))
    }
    form.resetFields()
    setEditingKey(EditingStatus.NotEditing)
  }

  useEffect(() => {
    switch (action?.type) {
      case 'add':
        config?.onAdd?.(action.payload)
        form.resetFields()
        break
      case 'edit':
        config?.onEdit?.(action.payload)
        form.resetFields()
        break
      case 'delete':
        config?.onDelete?.(action.payload)
        form.resetFields()
        break
    }
  }, [action])

  useEffect(() => {
    setTableData(config.initialData)
    console.log('rerender')
  }, [config.initialData])

  const addRow = (record: Omit<IRecord, 'key'>) => {
    if (editingKey !== EditingStatus.NotEditing) return

    setTableData((prev) => [
      { ...record, key: EditingStatus.NewlyAdded },
      ...prev,
    ])
    setEditingKey(EditingStatus.NewlyAdded)
  }

  return {
    addRow,
    // Private data using inside component only!
    $: {
      form,
      startEditing,
      stopEditing,
      isEditable,
      isEditing,
      event,
      tableData,
      columnList: config.columnList,
    },
  }
}

/**
 * Add `key` to data array
 */
export function convertToAntdData(data: IRecord[]) {
  return data.map((eachData, index) => ({
    ...eachData,
    key: eachData.key || index,
  }))
}

/**
 * Add `EditableCellProps` to column that editable
 */
export function convertToAntdColumn(
  columnList: IColumn[],
  isEditing: (record: IRecord) => boolean
) {
  return columnList.map((col) => {
    if (!col.editable) {
      return { ...col, title: col.text }
    }
    return {
      ...col,
      title: col.text,
      onCell: (record: any) => ({
        ...col,
        inputType: col.type,
        dataIndex: col.dataIndex,
        record: record,
        title: col.text,
        editing: isEditing(record),
      }),
    }
  })
}
