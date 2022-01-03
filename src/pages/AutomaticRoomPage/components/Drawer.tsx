import css from 'classnames'
import localeTH from 'antd/es/date-picker/locale/th_TH'
import {
  Button as AntdButton,
  Col,
  Drawer as AntdDrawer,
  Form,
  FormInstance,
  Popconfirm,
  Row,
} from 'antd'
import { FiX, FiTrash2 } from 'react-icons/fi'

import { Checkbox } from 'components/Checkbox'
import { Loader } from 'components/Loader'
import { Text } from 'components/Text'
import { DatePicker } from 'components/DatePicker'
import { Select } from 'components/Select'
import { Input } from 'components/Input'
import { OptionList } from 'constants/option'
import { IRawWorkloadOfTeacherWithDayjs } from 'apis/teacher'

import style from './Drawer.module.scss'
import { useOption } from './DrawerHelper'

interface IProps {
  form: FormInstance<IRawWorkloadOfTeacherWithDayjs>
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
  onDelete?: (formValue: IRawWorkloadOfTeacherWithDayjs) => void
}

export const Drawer: React.FC<IProps> = ({
  form,
  isOpen,
  onClose,
  isLoading = false,
  onDelete = () => {},
}) => {
  const {
    isLoading: isOptionLoading,
    teacherList,
    subjectList,
    roomList,
  } = useOption()

  return (
    <AntdDrawer
      width={560}
      visible={isOpen}
      onClose={() => onClose()}
      maskClosable={!isLoading}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading,
          })}
        >
          <FiX className={style.closeIcon} onClick={() => onClose()} />
          <Text size="sub-head" bold className={style.title}>
            รายละเอียดวิชาสอน
          </Text>
        </div>
      }
      footer={
        <Popconfirm
          disabled={isLoading}
          title="ต้องการนำรายวิชาออกจากห้องใช่ไหม"
          okText="นำออก"
          cancelText="ยกเลิก"
          okButtonProps={{
            type: 'primary',
            danger: true,
          }}
          cancelButtonProps={{
            type: 'text',
          }}
          onConfirm={() => onDelete(form.getFieldsValue())}
        >
          <AntdButton
            block
            danger
            type="text"
            icon={<FiTrash2 className={style.deleteIcon} />}
            disabled={isLoading}
          >
            นำออก
          </AntdButton>
        </Popconfirm>
      }
    >
      <Loader loading={isLoading || isOptionLoading}>
        <Form form={form} layout="vertical" hideRequiredMark>
          <Form.Item name="id" style={{ display: 'none' }} />

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="subjectId"
                label="วิชา"
                rules={[{ required: true, message: '' }]}
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
                  options={subjectList}
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
              >
                <Select disabled options={OptionList.workloadType} />
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
              >
                <Select disabled options={OptionList.degree} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="classYear"
                label="ชั้นปี"
                rules={[{ required: true, message: '' }]}
              >
                <Select disabled options={OptionList.classYear} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dayOfWeek"
                label="วันที่สอน"
                rules={[{ required: true, message: '' }]}
              >
                <Select disabled options={OptionList.dayOfWeek} />
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
                  options={roomList}
                />
              </Form.Item>
            </Col>
          </Row>

          <Text size="small">ช่วงเวลา</Text>
          <Row gutter={16}>
            <Form.List name="timeList" initialValue={[[]]}>
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
                    </Row>
                  ))}
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
            <Form.List
              name="teacherList"
              initialValue={[{ weekCount: 15, isClaim: true }]}
            >
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
                          <Select
                            disabled
                            showSearch
                            filterOption={(input, option) =>
                              String(option?.label)
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            notFoundContent="ไม่พบรายชื่อนี้"
                            options={teacherList}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...rest}
                          name={[name, 'weekCount']}
                          className={style.listInput}
                          rules={[{ required: true, message: '' }]}
                        >
                          <Input type="number" disabled />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                          {...rest}
                          name={[name, 'isClaim']}
                          valuePropName="checked"
                          className={style.listInput}
                        >
                          <Checkbox disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </Col>
              )}
            </Form.List>
          </Row>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
