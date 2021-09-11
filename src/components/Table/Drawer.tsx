import css from 'classnames'
import { useState } from 'react'
import { Col, Drawer, Form, Row, Button as AntdButton, message } from 'antd'
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
import { IPrivateUseTable, IRecord, useTable } from './helper'

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
      message.error(err.message)
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
      message.error(err.message)
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderInput = (dataIndex: string) => {
    const col = _.getColumn(dataIndex)
    if (!col) return

    switch (col.type) {
      case 'status':
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
          <AntdButton
            block
            danger
            type="text"
            icon={<FiTrash2 className={style.deleteIcon} />}
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            ลบข้อมูล
          </AntdButton>
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
          {_.formLayout.layout.map((row, index) => (
            <Row key={index} gutter={16}>
              {row.map((dataIndex) => {
                const col = _.getColumn(dataIndex)
                const formRules: Rule[] = [
                  { required: true, message: `กรุณากรอก ${col?.header}` },
                ]
                switch (col?.type) {
                  case 'checkbox':
                    formRules.pop()
                    break
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
                      hasFeedback={['text', 'credit', 'number'].includes(
                        col?.type || ''
                      )}
                      initialValue={
                        (col as any)?.defaultFirstOption &&
                        (col as any)?.optionList[0]
                      }
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
