import React from 'react'
import {
  Input,
  InputNumber,
  Form,
  Typography,
  Checkbox,
  Select,
  FormInstance,
} from 'antd'
import { IColumn } from './helper'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: IColumn['type']
  selectList: string[]
  record: any
  index: number
  children: React.ReactNode
  form: FormInstance
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  selectList,
  children,
  form,
  ...props
}) => {
  const editableCell = () => {
    switch (inputType) {
      case 'checkbox':
        return <Checkbox />
      case 'select':
        return (
          <Select options={selectList.map((option) => ({ value: option }))} />
        )
      default:
        return <Input />
    }
  }

  const cell = (children: React.ReactNode) => {
    switch (inputType) {
      case 'checkbox':
        return (
          <Checkbox
            checked={record[dataIndex]}
            style={{ pointerEvents: 'none' }}
          />
        )
      default:
        return children
    }
  }

  return (
    <td {...props}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
          valuePropName={inputType === 'checkbox' ? 'checked' : 'value'}
        >
          {editableCell()}
        </Form.Item>
      ) : (
        cell(children)
      )}
    </td>
  )
}
