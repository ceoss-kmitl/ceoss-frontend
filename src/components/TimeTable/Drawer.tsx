import css from 'classnames'
import localeTH from 'antd/es/date-picker/locale/th_TH'
import {
  Button as AntdButton,
  Col,
  Drawer as AntdDrawer,
  Form,
  Popconfirm,
  Row,
} from 'antd'
import { FiX, FiTrash2 } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'

import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import { Loader } from 'components/Loader'
import { Text } from 'components/Text'
import { DatePicker } from 'components/DatePicker'
import { Select } from 'components/Select'
import { Input } from 'components/Input'
import {
  dayOfWeekOptionList,
  degreeOptionList,
  typeOptionList,
} from 'constants/selectOption'

import style from './Drawer.module.scss'
import { classYearOptionList, useDrawer } from './helper'

interface IProps {
  use: ReturnType<typeof useDrawer>
  onEdit: (workload: any) => void
  onDelete: (workload: any) => void
}

export const Drawer: React.FC<IProps> = ({ use, onEdit, onDelete }) => {
  const {
    isLoading,
    form,
    formAction,
    isDrawerVisible,
    closeDrawer,
    handleOnEdit,
    handleOnDelete,
    subjectOptionList,
    teacherOptionList,
  } = use

  return (
    <AntdDrawer
      width={560}
      visible={isDrawerVisible}
      onClose={closeDrawer}
      maskClosable={!isLoading}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading,
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
            disabled={isLoading}
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
            onConfirm={handleOnDelete(onDelete)}
          >
            <AntdButton
              block
              danger
              type="text"
              icon={<FiTrash2 className={style.deleteIcon} />}
              disabled={isLoading}
            >
              ลบข้อมูล
            </AntdButton>
          </Popconfirm>
        )
      }
    >
      <Loader loading={isLoading}>
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={handleOnEdit(onEdit)}
        >
          <Form.Item name="id" style={{ display: 'none' }} />

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="subjectId"
                label="วิชา"
                rules={[{ required: true, message: '' }]}
                hasFeedback
              >
                <Select
                  disabled
                  showSearch
                  filterOption={(input, option) =>
                    String(option?.label)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  notFoundContent="ไม่พบวิชา"
                  options={subjectOptionList!}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="type"
                label="รูปแบบการสอน"
                rules={[{ required: true, message: '' }]}
                hasFeedback
              >
                <Select disabled options={typeOptionList} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="section"
                label="กลุ่มเรียน"
                rules={[
                  { required: true, message: '' },
                  { pattern: /^\d+$/, message: 'ตัวเลขเท่านั้น' },
                ]}
                hasFeedback
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fieldOfStudy"
                label="อักษรย่อสาขาวิชา"
                rules={[
                  { required: true, message: '' },
                  { pattern: /^[A-Z]+$/i, message: 'อักษรอังกฤษเท่านั้น' },
                ]}
                normalize={(value) => String(value).toLocaleUpperCase()}
                hasFeedback
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="degree"
                label="ระดับการศึกษา"
                rules={[{ required: true, message: '' }]}
                hasFeedback
              >
                <Select disabled options={degreeOptionList} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="classYear"
                label="ชั้นปี"
                rules={[{ required: true, message: '' }]}
                hasFeedback
              >
                <Select disabled options={classYearOptionList} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dayOfWeek"
                label="วันที่สอน"
                rules={[{ required: true, message: '' }]}
                hasFeedback
              >
                <Select disabled options={dayOfWeekOptionList} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="roomId" label="ห้องเรียน">
                <Select
                  disabled
                  showSearch
                  filterOption={(input, option) =>
                    String(option?.label)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  notFoundContent="ไม่พบห้องเรียน"
                />
              </Form.Item>
            </Col>
          </Row>

          <Text size="small">ช่วงเวลา</Text>
          <Row gutter={16}>
            <Form.List name="timeList" initialValue={[{}]}>
              {(fields) => (
                <Col span={24}>
                  {fields.map(({ name, ...rest }) => (
                    <Row gutter={16} align="middle">
                      <Col flex={1}>
                        <Form.Item
                          {...rest}
                          name={[name]}
                          className={style.listInput}
                          rules={[{ required: true, message: '' }]}
                        >
                          <DatePicker.RangePicker
                            disabled
                            picker="time"
                            locale={localeTH}
                            className={style.timePicker}
                            format="HH:mm"
                            placeholder={['เวลาเริ่ม', 'เวลาจบ']}
                            disabledHours={() => [
                              0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23,
                            ]}
                            hideDisabledOptions
                            minuteStep={15}
                            showNow={false}
                          />
                        </Form.Item>
                      </Col>
                      {/* {fields.length > 1 && (
                        <FiTrash2
                          className={style.removeListIcon}
                          onClick={() => timeList.remove(name)}
                        />
                      )} */}
                    </Row>
                  ))}

                  {/* <AntdButton
                    block
                    type="dashed"
                    onClick={() => timeList.add()}
                  >
                    + คลิกเพื่อเพิ่มช่วงเวลา
                  </AntdButton> */}
                </Col>
              )}
            </Form.List>
          </Row>

          <br />
          <Row gutter={16}>
            <Col flex={1}>
              <Text size="small">ชื่อผู้สอน</Text>
            </Col>
            <Col span={7}>
              <Text size="small">จำนวนสัปดาห์ที่สอน</Text>
            </Col>
            <Col span={3}>
              <Text size="small">เบิกเงิน</Text>
            </Col>
          </Row>
          <Row gutter={16}>
            <Form.List name="teacherList" initialValue={[{}]}>
              {(fields) => (
                <Col span={24}>
                  {fields.map(({ name, ...rest }) => (
                    <Row gutter={16} align="middle">
                      <Col flex={1}>
                        <Form.Item
                          {...rest}
                          name={[name, 'teacherId']}
                          className={style.listInput}
                          rules={[{ required: true, message: '' }]}
                        >
                          <Select disabled options={teacherOptionList!} />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...rest}
                          name={[name, 'weekCount']}
                          className={style.listInput}
                          rules={[{ required: true, message: '' }]}
                        >
                          <Input type="number" />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        {/* <Col span={fields.length > 1 ? 2 : 3}> */}
                        <Form.Item
                          {...rest}
                          name={[name, 'isClaim']}
                          valuePropName="checked"
                          className={style.listInput}
                          rules={[{ required: true, message: '' }]}
                        >
                          <Checkbox />
                        </Form.Item>
                      </Col>

                      {/* {fields.length > 1 && (
                        <FiTrash2
                          className={style.removeListIcon}
                          onClick={() => teacherList.remove(name)}
                        />
                      )} */}
                    </Row>
                  ))}

                  {/* <AntdButton
                    block
                    type="dashed"
                    onClick={() => teacherList.add()}
                  >
                    + คลิกเพื่อเพิ่มผู้สอน
                  </AntdButton> */}
                </Col>
              )}
            </Form.List>
          </Row>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
