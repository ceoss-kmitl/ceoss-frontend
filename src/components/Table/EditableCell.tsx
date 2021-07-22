import React from 'react'
import { Input, InputNumber, Form, Typography, Checkbox, Select } from 'antd'
import { IColumn } from './helper'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: IColumn['type']
  record: any
  index: number
  children: React.ReactNode
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  inputType,
  children,
  ...props
}) => {
  const editableCell = () => {
    switch (inputType) {
      case 'checkbox':
        return <Checkbox />
      case 'select':
        return <Select />
      default:
        return <Input />
    }
  }

  const cell = (children: React.ReactNode) => {
    switch (inputType) {
      case 'checkbox':
        return <Checkbox checked={record[dataIndex]} />
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
        >
          {editableCell()}
        </Form.Item>
      ) : (
        cell(children)
      )}
    </td>
  )
}
