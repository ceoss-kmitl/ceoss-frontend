import { Form, Input, InputNumber } from 'antd'

interface IProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  title: string
  dataIndex: string
  inputType: 'number' | 'text'
  children: React.ReactNode
}

export const EditableCell: React.FC<IProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          data-eiei="eiei"
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
