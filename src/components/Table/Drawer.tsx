import css from 'classnames'
import { useState } from 'react'
import {
  Col,
  Drawer,
  Form,
  Row,
  Button as AntdButton,
  Switch,
  Popconfirm,
  message,
} from 'antd'
import { Rule } from 'antd/lib/form'
import { FiX, FiTrash2 } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'

import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import { Input } from 'components/Input'
import { Select } from 'components/Select'
import { Text } from 'components/Text'
import { Loader } from 'components/Loader'

import style from './Drawer.module.scss'
import { IColumn, IPrivateUseTable, IRecord, useTable } from './helper'

interface IProps {
  use: ReturnType<typeof useTable>
}

const MyDrawer: React.FC<IProps> = ({ use }) => {
  const { _ } = use as IPrivateUseTable
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormAction = async (record: IRecord) => {
    setIsSubmitting(true)

    try {
      if (_.formAction === 'ADD') {
        await _.onAdd?.(record)
      }
      if (_.formAction === 'EDIT') {
        await _.onEdit?.(record)
      }
      _.closeDrawer()
      message.success('บันทึกข้อมูลแล้ว')
    } catch (err) {
      message.error(err.message, 10)
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    const record = _.form.getFieldsValue()
    setIsSubmitting(true)

    try {
      await _.onDelete?.(record)
      _.closeDrawer()
      message.success('ลบข้อมูลแล้ว')
    } catch (err) {
      message.error(err.message, 10)
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitialValues = (column: IColumn) => {
    switch (column.type) {
      case 'checkbox':
        return column.defaultChecked ?? false
      case 'status':
        return true
      case 'select':
        return column.defaultFirstOption && column.optionList[0]
    }
  }

  const getHasFeedback = (column: IColumn) => {
    switch (column.type) {
      case 'text':
      case 'credit':
      case 'number':
        return true
    }
  }

  const getValuePropName = (column: IColumn) => {
    switch (column.type) {
      case 'checkbox':
      case 'status':
        return 'checked'
      default:
        return 'value'
    }
  }

  const renderInput = (dataIndex: string) => {
    const col = _.getColumn(dataIndex)
    if (!col) return

    switch (col.type) {
      case 'status':
        return <Switch checkedChildren="ทำงาน" unCheckedChildren="ไม่ทำงาน" />
      case 'checkbox':
        return <Checkbox />
      case 'select':
        return <Select options={col.optionList.map((value) => ({ value }))} />
      case 'number':
        return <Input type="number" min={col.min} max={col.max} />
      case 'credit':
        return <Input maxLength={4} placeholder="- - - -" />
      case 'text':
        return <Input maxLength={col.maxLength} placeholder={col.placeholder} />
    }
  }

  return (
    <Drawer
      width={560}
      visible={_.isDrawerVisible}
      onClose={_.closeDrawer}
      maskClosable={false}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isSubmitting,
          })}
        >
          <FiX className={style.closeIcon} onClick={_.closeDrawer} />

          <Text size="sub-head" bold className={style.title}>
            {_.formAction === 'ADD'
              ? _.formLayout.addFormTitle
              : _.formLayout.editFormTitle}
          </Text>

          <Button small onClick={_.form.submit} disabled={isSubmitting}>
            <AiFillEdit className={style.submitIcon} />
            บันทึกข้อมูล
          </Button>
        </div>
      }
      footer={
        _.formAction === 'EDIT' && (
          <Popconfirm
            title="ต้องการลบข้อมูลใช่ไหม"
            okText="ลบ"
            cancelText="ยกเลิก"
            okButtonProps={{
              type: 'primary',
              danger: true,
            }}
            cancelButtonProps={{
              type: 'text',
            }}
            onConfirm={handleDelete}
          >
            <AntdButton
              block
              danger
              type="text"
              icon={<FiTrash2 className={style.deleteIcon} />}
              disabled={isSubmitting}
            >
              ลบข้อมูล
            </AntdButton>
          </Popconfirm>
        )
      }
    >
      <Loader loading={isSubmitting}>
        <Form
          form={_.form}
          layout="vertical"
          hideRequiredMark
          onFinish={handleFormAction}
        >
          <Form.Item name="id" style={{ display: 'none' }} />
          {_.formLayout.layout.map((row, index) => (
            <Row key={index} gutter={16}>
              {row.map((dataIndex) => {
                const col = _.getColumn(dataIndex)
                const formRules: Rule[] = [
                  { required: true, message: `กรุณากรอก ${col?.header}` },
                ]
                if (col.required === false) formRules.pop()
                switch (col?.type) {
                  case 'text':
                    if (col.pattern)
                      formRules.push({
                        pattern: col.pattern,
                        message: `${col.header} ไม่ถูกต้อง`,
                      })
                    break
                  case 'credit':
                    formRules.push({
                      pattern: /^\d{4}$/,
                      message: `กรุณาใส่ตัวเลข 4 ตัว`,
                    })
                }

                return (
                  <Col key={dataIndex} span={24 / row.length}>
                    <Form.Item
                      name={dataIndex}
                      label={col?.header}
                      rules={formRules}
                      normalize={(col as any)?.normalize}
                      hasFeedback={getHasFeedback(col)}
                      initialValue={getInitialValues(col)}
                      valuePropName={getValuePropName(col)}
                    >
                      {renderInput(dataIndex)}
                    </Form.Item>
                  </Col>
                )
              })}
            </Row>
          ))}
        </Form>
      </Loader>
    </Drawer>
  )
}

export { MyDrawer as Drawer }
