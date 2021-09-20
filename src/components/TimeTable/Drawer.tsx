import css from 'classnames'
import {
  Button as AntdButton,
  Col,
  Divider,
  Drawer as AntdDrawer,
  Form,
  Popconfirm,
  Row,
  TimePicker,
} from 'antd'
import { FiX, FiTrash2 } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'

import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { Text } from 'components/Text'
import { Select } from 'components/Select'

import style from './Drawer.module.scss'
import { useDrawer } from './helper'
import { Input } from 'components/Input'

interface IProps {
  use: ReturnType<typeof useDrawer>
}

export const Drawer: React.FC<IProps> = ({ use }) => {
  const { form, formAction, isDrawerVisible, closeDrawer } = use

  return (
    <AntdDrawer
      width={560}
      visible={isDrawerVisible}
      onClose={closeDrawer}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: false,
          })}
        >
          <FiX className={style.closeIcon} onClick={closeDrawer} />
          <Text size="sub-head" bold className={style.title}>
            {formAction === 'ADD' ? 'เพิ่มภาระงานใหม่' : 'แก้ไขภาระงาน'}
          </Text>
          <Button small onClick={form.submit} disabled={false}>
            <AiFillEdit className={style.submitIcon} />
            บันทึกข้อมูล
          </Button>
        </div>
      }
      footer={
        formAction === 'EDIT' && (
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
            onConfirm={undefined}
          >
            <AntdButton
              block
              danger
              type="text"
              icon={<FiTrash2 className={style.deleteIcon} />}
              disabled={false}
            >
              ลบข้อมูล
            </AntdButton>
          </Popconfirm>
        )
      }
    >
      <Loader loading={false}>
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={undefined}
        >
          <Form.Item name="id" style={{ display: 'none' }} />

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="subjectId" label="วิชา">
                <Select />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="type" label="รูปแบบการสอน">
                <Select />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="section" label="กลุ่มเรียน">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="fieldOfStudy" label="อักษรย่อสาขาวิชา">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="degree" label="ระดับการศึกษา">
                <Select />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="classYear" label="ชั้นปี">
                <Select />
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dayOfWeek" label="วันที่สอน">
                <Select />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="roomId" label="ห้องเรียน">
                <Select />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.List name="timeList" initialValue={[{}]}>
                {(fields, timeList) => (
                  <>
                    <Row gutter={16}>
                      {fields.map(({ name, ...rest }) => (
                        <>
                          <Col flex={1}>
                            <Form.Item
                              {...rest}
                              name={[name, 'time']}
                              className={style.timeInput}
                              rules={[{ required: true, message: '' }]}
                            >
                              <TimePicker.RangePicker
                                className={style.timePicker}
                                format="HH:mm"
                                placeholder={['เวลาเริ่ม', 'เวลาสิ้นสุด']}
                                disabledHours={() => [
                                  0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23,
                                ]}
                                hideDisabledOptions
                                minuteStep={15}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={2}>
                            {fields.length > 1 && (
                              <FiTrash2
                                className={style.removeTimeListIcon}
                                onClick={() => timeList.remove(name)}
                              />
                            )}
                          </Col>
                        </>
                      ))}
                    </Row>

                    <Row>
                      <AntdButton
                        block
                        type="dashed"
                        onClick={() => timeList.add()}
                      >
                        + คลิกเพื่อเพิ่มช่วงเวลา
                      </AntdButton>
                    </Row>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
