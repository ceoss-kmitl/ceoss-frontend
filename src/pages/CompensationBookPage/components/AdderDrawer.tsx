import css from 'classnames'
import { useState } from 'react'
import {
  Drawer as AntdDrawer,
  Form,
  Row,
  Col,
  FormInstance,
  Radio,
  Skeleton,
} from 'antd'
import { FiX } from 'react-icons/fi'
import { BsArrowRight } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { range } from 'lodash'

import { toDayjsTime } from 'libs/datetime'
import { DayOfWeekName } from 'constants/common'
import { ISubject } from 'apis/subject'
import { Loader } from 'components/Loader'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Select } from 'components/Select'
import { DatePicker } from 'components/DatePicker'

import style from './AdderDrawer.module.scss'
import { useCompensation, useWorkload } from './AdderDrawerHelper'
import { useEffect } from 'react'

interface IProps {
  subject: ISubject
  form: FormInstance
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
  onSubmit?: (formValue: any) => void
}

export const AdderDrawer: React.FC<IProps> = ({
  subject,
  form,
  isOpen,
  onClose,
  isLoading: isApiLoading = false,
  onSubmit = () => {},
}) => {
  const {
    isLoading: isWorkloadListLoading,
    workloadList,
    selectedWorkload,
    changeSelectedWorkload,
  } = useWorkload(subject.id)

  const {
    isLoading: isRoomListLoading,
    roomList,
    availableRoomList,
    setAvailableRoomList,
    fetchAvailableRoom,
    handleDisabledDate,
  } = useCompensation(selectedWorkload)

  const [isInnerOpen, setIsInnerOpen] = useState(false)

  const isLoading = isApiLoading || isRoomListLoading || isWorkloadListLoading

  useEffect(() => {
    if (isOpen === false) {
      setIsInnerOpen(false)
      changeSelectedWorkload()
    }
  }, [isOpen])

  useEffect(() => {
    if (isInnerOpen === false) {
      setAvailableRoomList([])
      form.resetFields()
    }
  }, [isInnerOpen])

  return (
    <>
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
              ??????????????????????????????????????????????????????????????????????????????
            </Text>
          </div>
        }
      >
        {isWorkloadListLoading ? (
          range(3).map(() => (
            <>
              <Row>
                <Col span={2}>
                  <Skeleton.Avatar size="small" />
                </Col>
                <Col span={20}>
                  <Skeleton active title={false} paragraph={{ rows: 2 }} />
                </Col>
              </Row>
              <br />
            </>
          ))
        ) : (
          <Form layout="vertical">
            {!workloadList.length ? (
              <Text>- ?????????????????????????????????????????????????????????????????? -</Text>
            ) : (
              <Radio.Group
                className={style.radioGroup}
                value={selectedWorkload.workloadId}
                onChange={(e) => {
                  const workload = workloadList.find(
                    (w) => w.workloadId === e.target.value
                  )
                  changeSelectedWorkload(workload)
                }}
              >
                {workloadList.map((workload) => (
                  <div className={style.checkWrapper}>
                    <Radio
                      style={{ padding: '0.5rem' }}
                      className={style.checkbox}
                      value={workload.workloadId}
                      onClick={() => setIsInnerOpen(true)}
                    >
                      <div className={style.right}>
                        <div>
                          {`${workload.subjectCode} ${workload.subjectName} ??????????????? ${workload.section}`}
                        </div>
                        <div>
                          {`${DayOfWeekName[workload.dayOfWeek]} ???????????? ${
                            workload.startTime
                          } - ${workload.endTime}`}
                        </div>
                      </div>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            )}
          </Form>
        )}

        {/* ===== Inner-Drawer ===== */}
        <AntdDrawer
          width={560}
          visible={isInnerOpen && isOpen}
          maskClosable={!isLoading}
          closable={false}
          onClose={() => setIsInnerOpen(false)}
          title={
            <div
              className={css(style.titleWrapper, {
                [style.disabled]: isLoading,
              })}
            >
              <FiX
                className={style.closeIcon}
                onClick={() => setIsInnerOpen(false)}
              />
              <Text size="sub-head" bold className={style.title}>
                ????????????????????????????????????????????????????????????
              </Text>
              <Button
                small
                onClick={() => form.submit()}
                disabled={isApiLoading}
              >
                <AiFillEdit className={style.submitIcon} />
                ????????????????????????????????????
              </Button>
            </div>
          }
        >
          <Loader loading={isApiLoading}>
            <Form
              form={form}
              layout="vertical"
              hideRequiredMark
              onFinish={() =>
                onSubmit({
                  ...form.getFieldsValue(),
                  workloadId: selectedWorkload.workloadId,
                })
              }
            >
              <Row gutter={16}>
                <Col span={11}>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="oldDate"
                        label="??????????????????????????????"
                        rules={[{ required: true, message: '' }]}
                      >
                        <DatePicker
                          className={style.datePicker}
                          showToday={false}
                          format="DD MMM YY"
                          disabledDate={handleDisabledDate}
                          allowClear={false}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item>
                      <DatePicker.RangePicker
                        disabled
                        className={style.datePicker}
                        picker="time"
                        format="HH:mm"
                        value={[
                          toDayjsTime(selectedWorkload.startTime),
                          toDayjsTime(selectedWorkload.endTime),
                        ]}
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
                        label="?????????????????????????????????"
                        rules={[{ required: true, message: '' }]}
                      >
                        <DatePicker
                          className={style.datePicker}
                          showToday={false}
                          format="DD MMM YY"
                          onSelect={(date) => {
                            fetchAvailableRoom({
                              ...form.getFieldsValue(),
                              compensatedDate: date,
                              roomId: undefined,
                            })
                            form.setFieldsValue({ roomId: undefined })
                          }}
                          allowClear={false}
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
                        allowClear={false}
                        picker="time"
                        format="HH:mm"
                        placeholder={['???????????????????????????', '??????????????????']}
                        disabledHours={() => [
                          0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23,
                        ]}
                        hideDisabledOptions
                        minuteStep={15}
                        onOk={(value) => {
                          fetchAvailableRoom({
                            ...form.getFieldsValue(),
                            compensatedTime: value,
                          })
                          form.setFieldsValue({ roomId: undefined })
                        }}
                      />
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={16} justify="space-between">
                <Col span={11}>
                  <Form.Item label="????????????????????????">
                    <Select
                      disabled
                      options={roomList}
                      value={selectedWorkload.roomId}
                      placeholder="??????????????????????????????"
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  {isRoomListLoading ? (
                    <>
                      <Skeleton
                        active
                        title={false}
                        paragraph={{ rows: 1, width: 100 }}
                      />
                      <Skeleton.Input
                        active
                        style={{ width: 200, borderRadius: 6 }}
                      />
                    </>
                  ) : (
                    <Form.Item
                      name="roomId"
                      label="?????????????????????????????????????????????"
                      rules={[{ required: true, message: '' }]}
                    >
                      <Select
                        options={availableRoomList}
                        placeholder="???????????????????????????????????????????????????"
                      />
                    </Form.Item>
                  )}
                </Col>
              </Row>
            </Form>
          </Loader>
        </AntdDrawer>
      </AntdDrawer>
    </>
  )
}
