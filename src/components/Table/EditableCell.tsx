import React from 'react'
import { Form } from 'antd'
import { Rule } from 'antd/lib/form'
import { Input } from 'components/Input'
import { Select } from 'components/Select'
import { Checkbox } from 'components/Checkbox'
import { IColumn, IRecord } from './helper'
import style from './style.module.scss'

interface IProps {
  editing: boolean
  dataIndex: string
  inputType: IColumn['type']
  record: IRecord
  selectList: string[]
  min: number
  max: number
  maxLength: number
  placeholder: string
  title: string
  pattern: RegExp
  children: React.ReactNode
}

export const EditableCell: React.FC<IProps> = ({
  editing,
  dataIndex,
  inputType = 'text',
  record,
  selectList,
  min,
  max,
  maxLength,
  placeholder,
  title,
  pattern,
  children,
  ...props
}) => {
  function extractCredit(input: any) {
    const result = String(input).match(/\d{1}/g) || ['0', '0', '0', '0']
    return {
      credit: result[0],
      lectureHours: result[1],
      labHours: result[2],
      independentHours: result[3],
    }
  }

  const editableCell = () => {
    switch (inputType) {
      case 'number':
        return <Input type="number" min={min} max={max} />
      case 'checkbox':
        return <Checkbox />
      case 'select':
        return (
          <Select options={selectList.map((option) => ({ value: option }))} />
        )
      case 'credit':
        return <Input placeholder="- - - -" maxLength={4} />
      default:
        return (
          <Input type="text" placeholder={placeholder} maxLength={maxLength} />
        )
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
      case 'credit':
        const result = extractCredit(record[dataIndex])

        return (
          <span className={style.creditSymbol}>
            <span>{result.credit}</span>
            <span>(</span>
            <span>{result.lectureHours}</span>
            <span>-</span>
            <span>{result.labHours}</span>
            <span>-</span>
            <span>{result.independentHours}</span>
            <span>)</span>
          </span>
        )
      default:
        return children
    }
  }

  const formRules: Rule[] = [{ required: true, message: `กรุณากรอก ${title}` }]
  if (pattern)
    formRules.push({
      pattern,
      message: `${title} ไม่ถูกต้อง`,
    })
  if (inputType === 'credit')
    formRules.push({
      pattern: /^\d{4}$/,
      message: `${title} ไม่ถูกต้อง`,
    })

  return (
    <td {...props}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={formRules}
          valuePropName={inputType === 'checkbox' ? 'checked' : 'value'}
          hasFeedback={['text', 'credit'].includes(inputType)}
        >
          {editableCell()}
        </Form.Item>
      ) : (
        cell(children)
      )}
    </td>
  )
}
