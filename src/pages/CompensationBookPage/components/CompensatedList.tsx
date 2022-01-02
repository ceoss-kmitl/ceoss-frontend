import css from 'classnames'
import { useState } from 'react'
import {
  Drawer as AntdDrawer,
  Form,
  Row,
  Col,
  Button as AntdButton,
  Popconfirm,
} from 'antd'
import { FiX, FiTrash2 } from 'react-icons/fi'
import { BsArrowRight } from 'react-icons/bs'
import dayjs from 'dayjs'

import { Text } from 'components/Text'
import { Loader } from 'components/Loader'
import { ICompensated } from 'apis/subject'

import style from './CompensatedList.module.scss'

interface IProps {
  list: ICompensated[]
  onDelete: (id: string) => Promise<void>
}

export const CompensatedList: React.FC<IProps> = ({ list, onDelete }) => {
  const [form] = Form.useForm()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openDrawerAndSetData = (compensated: any) => {
    form.setFieldsValue({
      compensatedId: compensated.compensatedId,
      oldDate: compensated.originalDate,
      oldTimeStart: compensated.originalTimeList[0].start,
      oldTimeEnd: compensated.originalTimeList[0].end,
      compensatedDate: compensated.compensatedDate,
      compensatedTimeStart: compensated.compensatedTimeList[0].start,
      compensatedTimeEnd: compensated.compensatedTimeList[0].end,
      originalRoom: compensated.originalRoom,
      compensatedRoom: compensated.compensatedRoom,
    })
    setIsDrawerOpen(true)
  }
  const closeDrawer = () => setIsDrawerOpen(false)
  const handleOnDelete = async () => {
    setIsLoading(true)
    await onDelete(form.getFieldValue('compensatedId'))
    closeDrawer()
    setIsLoading(false)
  }

  return (
    <>
      <div className={css(style.wrapper, 'shadow')}>
        {!list.length ? (
          <Text>ไม่มีข้อมูลการสอนชดเชย</Text>
        ) : (
          list.map((li) => (
            <div className={style.sectionWrapper}>
              <Text size="sub-head" bold className={style.sectionHeader}>
                กลุ่มเรียน {li.section}
              </Text>
              {!li.compensatedList.length ? (
                <div className={css(style.item, style.itemNoData)}>
                  <Text>- ไม่มีประวัติ -</Text>
                </div>
              ) : (
                li.compensatedList.map((cp) => (
                  <div
                    className={style.item}
                    onClick={() => openDrawerAndSetData(cp)}
                  >
                    <Text>{dayjs(cp.originalDate).format('D MMMM BBBB')}</Text>
                    <BsArrowRight
                      size={18}
                      className={style.arrowDividerInline}
                    />
                    <Text>
                      {dayjs(cp.compensatedDate).format('D MMMM BBBB')}
                    </Text>
                  </div>
                ))
              )}
            </div>
          ))
        )}
      </div>

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
              รายละเอียดการสอนชดเชย
            </Text>
          </div>
        }
        footer={
          <Popconfirm
            disabled={isLoading}
            title="ต้องการลบการสอนชดเชยนี้ใช่ไหม"
            okText="ลบ"
            cancelText="ยกเลิก"
            okButtonProps={{
              type: 'primary',
              danger: true,
            }}
            cancelButtonProps={{
              type: 'text',
            }}
            onConfirm={handleOnDelete}
          >
            <AntdButton
              block
              danger
              type="text"
              icon={<FiTrash2 className={style.deleteIcon} />}
              disabled={isLoading}
            >
              ลบการสอนชดเชย
            </AntdButton>
          </Popconfirm>
        }
      >
        <Loader loading={isLoading}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={11}>
                <Row>
                  <Col span={24}>
                    <Form.Item label="วันสอนเดิม">
                      <Text>
                        {dayjs(form.getFieldValue('oldDate')).format(
                          'dddd D MMMM BBBB'
                        )}
                      </Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item>
                    <Text>{`${form.getFieldValue(
                      'oldTimeStart'
                    )} - ${form.getFieldValue('oldTimeEnd')}`}</Text>
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
                    <Form.Item label="วันสอนชดเชย">
                      <Text>
                        {dayjs(form.getFieldValue('compensatedDate')).format(
                          'dddd D MMMM BBBB'
                        )}
                      </Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item>
                    <Text>{`${form.getFieldValue(
                      'compensatedTimeStart'
                    )} - ${form.getFieldValue('compensatedTimeEnd')}`}</Text>
                  </Form.Item>
                </Row>
              </Col>
            </Row>

            <Row gutter={16} justify="space-between">
              <Col span={11}>
                <Form.Item
                  label="ห้องเดิม"
                  rules={[{ required: true, message: '' }]}
                  hasFeedback
                >
                  <Text>
                    {form.getFieldValue('originalRoom') ||
                      '- ไม่ใช้ห้องเรียน -'}
                  </Text>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="ห้องสำหรับชดเชย"
                  rules={[{ required: true, message: '' }]}
                  hasFeedback
                >
                  <Text>
                    {form.getFieldValue('compensatedRoom') ||
                      '- ไม่ใช้ห้องเรียน -'}
                  </Text>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Loader>
      </AntdDrawer>
    </>
  )
}
