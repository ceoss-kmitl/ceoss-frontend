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
}

export const Drawer: React.FC<IProps> = ({ use }) => {
  const { form, formAction, isDrawerVisible, closeDrawer, subjectOptionList } =
    use

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
              <Form.Item
                name="subjectId"
                label="วิชา"
                rules={[{ required: true, message: '' }]}
                hasFeedback
              >
                <Select
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
              <Form.Item name="type" label="รูปแบบการสอน">
                <Select options={typeOptionList} />
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
                <Select options={degreeOptionList} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="classYear" label="ชั้นปี">
                <Select options={classYearOptionList} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dayOfWeek" label="วันที่สอน">
                <Select options={dayOfWeekOptionList} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="roomId" label="ห้องเรียน">
                <Select />
              </Form.Item>
            </Col>
          </Row>

          <Text size="small">ช่วงเวลา</Text>
          <div className={style.row}>
            <Form.List name="timeList" initialValue={[{}]}>
              {(fields, timeList) => (
                <div className={style.col}>
                  {fields.map(({ name, ...rest }) => (
                    <div className={style.row}>
                      <Form.Item
                        {...rest}
                        name={[name]}
                        className={style.timeInput}
                        rules={[{ required: true, message: '' }]}
                      >
                        <DatePicker.RangePicker
                          picker="time"
                          locale={localeTH}
                          className={style.timePicker}
                          format="HH:mm"
                          placeholder={['เวลาเริ่ม', 'เวลาจบ']}
                          disabledHours={() => [
                            0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23,
                          ]}
                          showNow={false}
                          hideDisabledOptions
                          minuteStep={15}
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <FiTrash2
                          className={style.removeTimeListIcon}
                          onClick={() => timeList.remove(name)}
                        />
                      )}
                    </div>
                  ))}

                  <AntdButton
                    block
                    type="dashed"
                    onClick={() => timeList.add()}
                  >
                    + คลิกเพื่อเพิ่มช่วงเวลา
                  </AntdButton>
                </div>
              )}
            </Form.List>
          </div>

          <br />
          <Row gutter={16}>
            <Col span={12}>
              <Text size="small">ชื่อผู้สอน</Text>
            </Col>
            <Col span={12}>
              <Text size="small">จำนวนสัปดาห์ที่สอน</Text>
            </Col>
          </Row>
          <div className={style.row}>
            <Form.List name="teacherList" initialValue={[{}]}>
              {(fields, timeList) => (
                <div className={style.col}>
                  {fields.map(({ name, key, ...rest }) => (
                    <div key={key} className={style.row}>
                      <Form.Item
                        {...rest}
                        name={[name, 'name']}
                        className={style.timeInput}
                        rules={[{ required: true, message: '' }]}
                      >
                        <Select />
                      </Form.Item>
                      <Form.Item
                        {...rest}
                        name={[name, 'weekCount']}
                        className={style.timeInput}
                        rules={[{ required: true, message: '' }]}
                      >
                        <Input />
                      </Form.Item>
                      {fields.length > 1 && (
                        <FiTrash2
                          className={style.removeTimeListIcon}
                          onClick={() => timeList.remove(name)}
                        />
                      )}
                    </div>
                  ))}

                  <AntdButton
                    block
                    type="dashed"
                    onClick={() => timeList.add()}
                  >
                    + คลิกเพื่อเพิ่มช่วงเวลา
                  </AntdButton>
                </div>
              )}
            </Form.List>
          </div>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
