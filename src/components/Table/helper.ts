import { useState, useEffect } from 'react'
import { Form, FormInstance } from 'antd'

interface IBaseColumn {
  text: string
  dataIndex: string
  width?: string
  align?: 'left' | 'right' | 'center'
  editable?: boolean
}

interface ITextColumn extends IBaseColumn {
  type?: 'text'
  pattern?: RegExp
  placeholder?: string
}

interface INumberColumn extends IBaseColumn {
  type: 'number'
  min?: number
  max?: number
}

interface ICheckboxColumn extends IBaseColumn {
  type: 'checkbox'
}

interface ISelectColumn extends IBaseColumn {
  type: 'select'
  selectList: string[]
}

interface ICreditColumn extends IBaseColumn {
  type: 'credit'
}

export type IColumn =
  | ITextColumn
  | INumberColumn
  | ICheckboxColumn
  | ISelectColumn
  | ICreditColumn

export type IRecord = Record<string, string | number | boolean> & {
  key?: number
}

interface ITableConfig {
  /**
   * Data to show in table
   */
  data: IRecord[]
  /**
   * Column header of table
   */
  columnList: IColumn[]
  /**
   * Function that run when add
   */
  onAdd?: (record: IRecord) => void
  /**
   * Function that run when edit
   */
  onEdit?: (record: IRecord) => void
  /**
   * Function that run when delete
   */
  onDelete?: (record: IRecord) => void
  /**
   * Show edit/delete button in the last column.
   * Default is `true`
   */
  editable?: boolean
}

interface IEditorAction {
  type: 'add' | 'edit' | 'delete'
  payload: IRecord
}

export enum EditingStatus {
  NotEditing = -1,
  NewlyAdded = -2,
}

export type IRealUseTable = {
  addRow: (record: Omit<IRecord, 'key'>) => void
  $: {
    form: FormInstance<any>
    startEditing: (record: IRecord) => void
    stopEditing: () => void
    isEditable: () => boolean
    isEditing: (record: IRecord) => boolean
    event: (
      type: IEditorAction['type'],
      payload: IEditorAction['payload']
    ) => void
    tableData: IRecord[]
    columnList: IColumn[]
    enableEdit: boolean
  }
}

interface IUseTable {
  /**
   * Add new row to table
   */
  addRow: (record?: Omit<IRecord, 'key'>) => void

  /**
   * *Private data. Do not use it*
   */
  $?: unknown
}

/**
 * Custom hooks to use with `<Table />` component
 */
export function useTable(config: ITableConfig): IUseTable {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IEditorAction | null>(null)
  const [editingKey, setEditingKey] = useState(EditingStatus.NotEditing)
  const [tableData, setTableData] = useState<IRecord[]>(config.data)

  const isEditing = (record: IRecord) => record.key === editingKey

  const isEditable = () => editingKey !== EditingStatus.NotEditing

  const event = (
    type: IEditorAction['type'],
    payload: IEditorAction['payload']
  ) => {
    setAction({ type, payload })
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

  const handleAction = async () => {
    try {
      const payload = { ...action?.payload }
      delete payload.key

      switch (action?.type) {
        case 'add':
          await form.validateFields()
          config?.onAdd?.(payload)
          form.resetFields()
          setEditingKey(EditingStatus.NotEditing)
          break
        case 'edit':
          await form.validateFields()
          config?.onEdit?.(payload)
          form.resetFields()
          setEditingKey(EditingStatus.NotEditing)
          break
        case 'delete':
          config?.onDelete?.(payload)
          form.resetFields()
          setEditingKey(EditingStatus.NotEditing)
          break
      }
    } catch (error) {}
  }

  useEffect(() => {
    handleAction()
  }, [action])

  useEffect(() => {
    setTableData(config.data)
  }, [config.data])

  // Public methods
  const addRow = (record = {}) => {
    if (editingKey !== EditingStatus.NotEditing) return
    const { columnList } = config as ITableConfig
    const editable = config.editable ?? true
    if (!editable) return

    const newRow = columnList.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.dataIndex]:
          cur.type === 'checkbox'
            ? false
            : cur.type === 'select'
            ? cur.selectList[0]
            : '',
      }),
      {}
    )

    setTableData((prev) => [
      { ...newRow, ...record, key: EditingStatus.NewlyAdded },
      ...prev,
    ])
    setEditingKey(EditingStatus.NewlyAdded)
    form.setFieldsValue(newRow)
  }

  return {
    // public data
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
      enableEdit: config.editable ?? true,
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
 * Add `EditableCellProps` to column that editable.
 * The `onCell` is kinda flexible use it carefully
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
        pattern: (col as any).pattern,
        placeholder: (col as any).placeholder,
        editing: isEditing(record),
      }),
    }
  })
}
