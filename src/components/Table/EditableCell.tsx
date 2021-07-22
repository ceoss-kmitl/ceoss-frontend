import { Input, InputNumber, Form, Typography, Checkbox, Select } from 'antd'
import { IColumn } from './helper'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  type: IColumn['type']
  record: any
  index: number
  children: React.ReactNode
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  type,
  index,
  children,
  ...props
}) => {
  const cell = () => {
    switch (type) {
      case 'checkbox':
        return <Checkbox />
      case 'select':
        return <Select />
      default:
        return <Input />
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
          {cell()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
