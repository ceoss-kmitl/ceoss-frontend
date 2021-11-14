import { Drawer as AntdDrawer, Form, Row, Col, message } from 'antd'
import { FiX, FiPlus } from 'react-icons/fi'
import { BsArrowRight } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import css from 'classnames'
import dayjs from 'dayjs'
import localeTH from 'antd/es/date-picker/locale/th_TH'

import { Loader } from 'components/Loader'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Select } from 'components/Select'
import { DatePicker } from 'components/DatePicker'
import { useAcademicYear } from 'contexts/AcademicYearContext'

import style from './AdderDrawer.module.scss'
import { http } from 'libs/http'
import { delay } from 'libs/delay'

interface IProps {
  sectionList: number[]
  onFinish: (formData: any) => Promise<void>
}

export const AdderDrawer: React.FC<IProps> = ({ sectionList, onFinish }) => {
  const [form] = Form.useForm()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [roomList, setRoomList] = useState([{ value: 0, label: 'ไม่มี' }])
  const [isLoading, setIsLoading] = useState(false)
  const { academicYear, semester } = useAcademicYear()

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const getAvailableRoom = async () => {
    try {
      const formData = form.getFieldsValue()
      if (!formData.compensatedDate || !formData.compensatedTime) return
      setIsLoading(true)
      await delay(0.5)

      const compensatedDate = dayjs(formData.compensatedDate).toISOString()
      const [startTime, endTime] = formData.compensatedTime.map((each: any) =>
        dayjs(each).format('HH:mm')
      )

      const { data } = await http.get('/room/available/compensated', {
        params: {
          academic_year: academicYear,
          semester,
          compensatedDate,
          startTime,
          endTime,
        },
      })
      setRoomList([
        { value: null, label: 'ไม่มี' },
        ...data.map((d: any) => ({
          value: d.roomId,
          label: d.roomName,
        })),
      ])
    } catch (err) {
      message.error(err.message, 10)
    }
    setIsLoading(false)
  }

  const handleFinish = async () => {
    await onFinish(form.getFieldsValue())
    closeDrawer()
  }

  useEffect(() => {
    form.resetFields()
  }, [isDrawerOpen])

  return (
    <>
      <Button
        small
        blue
        icon={<FiPlus style={{ marginRight: '0.5rem' }} />}
        onClick={openDrawer}
      >
        เพิ่มการสอนชดเชย
      </Button>

      <AntdDrawer
        width={560}
        visible={isDrawerOpen}
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
              เพิ่มการสอนชดเชยใหม่
            </Text>
            <Button small onClick={form.submit}>
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
            onFinish={handleFinish}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="section"
                  label="กลุ่มเรียน"
                  rules={[{ required: true, message: '' }]}
                  hasFeedback
                >
                  <Select
                    options={sectionList.map((s) => ({ label: s, value: s }))}
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
                      hasFeedback
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
                    hasFeedback
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
                      hasFeedback
                    >
                      <DatePicker
                        className={style.datePicker}
                        locale={localeTH}
                        showToday={false}
                        format="DD MMM YY"
                        onSelect={getAvailableRoom}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item
                    name="compensatedTime"
                    rules={[{ required: true, message: '' }]}
                    hasFeedback
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
                      onOk={getAvailableRoom}
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
                  hasFeedback
                >
                  <Select options={roomList} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Loader>
      </AntdDrawer>
    </>
  )
}
