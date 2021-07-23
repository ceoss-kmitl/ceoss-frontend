import React from 'react'
import { Input, Form, Checkbox, Select } from 'antd'
import { IColumn, IRecord } from './helper'

interface IProps {
  editing: boolean
  dataIndex: string
  inputType: IColumn['type']
  record: IRecord
  selectList: string[]
  placeholder: string
  children: React.ReactNode
}

export const EditableCell: React.FC<IProps> = ({
  editing,
  dataIndex,
  inputType,
  record,
  selectList,
  placeholder,
  children,
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
        return <Input placeholder={placeholder} />
    }
  }

  const cell = (children: React.ReactNode) => {
    switch (inputType) {
      case 'checkbox':
        return (
          <Checkbox
            checked={record[dataIndex] as boolean}
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
              message: '',
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
