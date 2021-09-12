import { useState, useEffect } from 'react'
import { Form, FormInstance } from 'antd'

interface IBaseColumn {
  header: string
  dataIndex: string
  width?: string
  align?: 'left' | 'right' | 'center'
  showInTable?: boolean
  required?: boolean
}

interface ITextColumn extends IBaseColumn {
  type: 'text'
  pattern?: RegExp
  maxLength?: number
  placeholder?: string
  normalize?: (value: string) => string
}

interface INumberColumn extends IBaseColumn {
  type: 'number'
  min?: number
  max?: number
}

interface ICheckboxColumn extends IBaseColumn {
  type: 'checkbox'
  defaultChecked?: boolean
}

interface ISelectColumn extends IBaseColumn {
  type: 'select'
  optionList: string[]
  defaultFirstOption?: boolean
}

interface IStatusColumn extends IBaseColumn {
  type: 'status'
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
  | IStatusColumn

export type IRecord = Record<string, string | number | boolean>

export type IFormLayout = {
  addFormTitle: string
  editFormTitle: string
  layout: string[][]
}

interface ITableConfig {
  /**
   * Data to show in table
   */
  data: IRecord[]
  /**
   * Loading status
   */
  loading?: boolean
  /**
   * Column header of table
   */
  columnList: IColumn[]
  /**
   * Form layout
   */
  formLayout: IFormLayout
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
}

export interface IPrivateUseTable {
  addRecord: () => void
  _: {
    form: FormInstance
    loading?: boolean
    tableData: IRecord[]
    columnList: any[]
    formLayout: IFormLayout
    formAction: 'ADD' | 'EDIT'
    getColumn: (dataIndex: string) => IColumn | undefined
    getRecord: (dataIndex: string) => IRecord | undefined
    editRecord: (record: IRecord) => void
    isDrawerVisible: boolean
    closeDrawer: () => void
    onAdd: (record: IRecord) => void
    onEdit: (record: IRecord) => void
    onDelete: (record: IRecord) => void
  }
}

interface IUseTable {
  /**
   * Add new record to table
   */
  addRecord: () => void

  /**
   * *Private data. Do not use it*
   */
  _?: unknown
}

/**
 * Custom hooks to use with `<Table />` component
 */
export function useTable({
  data,
  loading,
  columnList,
  formLayout,
  onAdd,
  onEdit,
  onDelete,
}: ITableConfig): IUseTable {
  const [tableData, setTableData] = useState<IRecord[]>(data)
  const [form] = Form.useForm<IRecord>()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [formAction, setFormAction] = useState<'ADD' | 'EDIT'>('ADD')

  const addRecord = () => {
    form.resetFields()
    setFormAction('ADD')
    setIsDrawerVisible(true)
  }

  const editRecord = (record: IRecord) => {
    form.resetFields()
    form.setFieldsValue(record)
    setFormAction('EDIT')
    setIsDrawerVisible(true)
  }

  const closeDrawer = () => setIsDrawerVisible(false)

  const getColumn = (dataIndex: string) =>
    columnList.find((col) => col.dataIndex === dataIndex)

  const getRecord = (dataIndex: string) =>
    tableData.find((record) => record.dataIndex === dataIndex)

  useEffect(() => {
    setTableData(data)
  }, [data])

  return {
    _: {
      form,
      tableData,
      loading,
      columnList: convertToAntdColumn(
        columnList.filter((col) => col.showInTable)
      ),
      formLayout,
      formAction,
      getColumn,
      getRecord,
      editRecord,
      isDrawerVisible,
      closeDrawer,
      onAdd,
      onEdit,
      onDelete,
    },
    addRecord,
  }
}

function convertToAntdColumn(columnList: IColumn[]): any[] {
  return columnList.map((col) => ({
    ...col,
    title: col.header,
    onCell: (record: IRecord) => ({
      ...col,
      record,
    }),
  }))
}
