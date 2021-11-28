import css from 'classnames'
import localeTH from 'antd/es/date-picker/locale/th_TH'
import { Drawer as AntdDrawer, Form, Row, Col, FormInstance } from 'antd'
import { FiX } from 'react-icons/fi'
import { BsArrowRight } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

import { ICompensated } from 'apis/subject'
import { Loader } from 'components/Loader'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Select } from 'components/Select'
import { DatePicker } from 'components/DatePicker'

import style from './AdderDrawer.module.scss'
import { useAvailableRoom } from './AdderDrawerHelper'

interface IProps {
  compensatedList: ICompensated[]
  form: FormInstance
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
  onSubmit?: (formValue: any) => void
}

export const AdderDrawer: React.FC<IProps> = ({
  compensatedList,
  form,
  isOpen,
  onClose,
  isLoading: isApiLoading = false,
  onSubmit = () => {},
}) => {
  const {
    isLoading: isRoomListLoading,
    roomList,
    fetchAvailableRoom,
  } = useAvailableRoom()

  const isLoading = isApiLoading || isRoomListLoading

  const sectionOptionList = compensatedList
    .map((c) => c.section)
    .map((s) => ({
      label: s,
      value: s,
    }))

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
            เพิ่มการสอนชดเชยใหม่
          </Text>
          <Button small onClick={() => form.submit()}>
            <AiFillEdit className={style.submitIcon} />
            บันทึกข้อมูล
          </Button>
        </div>
      }
    >
      <Loader loading={isLoading}>
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={() => onSubmit(form.getFieldsValue())}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="section"
                label="กลุ่มเรียน"
                rules={[{ required: true, message: '' }]}
              >
                <Select
                  options={sectionOptionList}
                  notFoundContent="ไม่มีกลุ่มเรียน"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="oldDate"
                    label="วันสอนเดิม"
                    rules={[{ required: true, message: '' }]}
                  >
                    <DatePicker
                      className={style.datePicker}
                      locale={localeTH}
                      showToday={false}
                      format="DD MMM YY"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Form.Item
                  name="oldTime"
                  rules={[{ required: true, message: '' }]}
                >
                  <DatePicker.RangePicker
                    className={style.datePicker}
                    locale={localeTH}
                    picker="time"
                    format="HH:mm"
                    placeholder={['เวลาเริ่ม', 'เวลาจบ']}
                    disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23]}
                    hideDisabledOptions
                    minuteStep={15}
                  />
                </Form.Item>
              </Row>
            </Col>

            <Col
              span={2}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BsArrowRight size={22} className={style.arrowDivider} />
            </Col>

            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="compensatedDate"
                    label="วันสอนชดเชย"
                    rules={[{ required: true, message: '' }]}
                  >
                    <DatePicker
                      className={style.datePicker}
                      locale={localeTH}
                      showToday={false}
                      format="DD MMM YY"
                      onSelect={() => fetchAvailableRoom(form)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Form.Item
                  name="compensatedTime"
                  rules={[{ required: true, message: '' }]}
                >
                  <DatePicker.RangePicker
                    className={style.datePicker}
                    locale={localeTH}
                    picker="time"
                    format="HH:mm"
                    placeholder={['เวลาเริ่ม', 'เวลาจบ']}
                    disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23]}
                    hideDisabledOptions
                    minuteStep={15}
                    onOk={() => fetchAvailableRoom(form)}
                  />
                </Form.Item>
              </Row>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="roomId"
                label="ห้องสำหรับสอนชดเชย"
                rules={[{ required: true, message: '' }]}
              >
                <Select options={roomList} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
