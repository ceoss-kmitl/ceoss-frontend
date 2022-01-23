import css from 'classnames'
import {
  Drawer as AntdDrawer,
  Button as AntdButton,
  Form,
  FormInstance,
  Row,
  Col,
  Tooltip,
} from 'antd'
import { FiX, FiPlus } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'

import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Loader } from 'components/Loader'
import { DatePicker } from 'components/DatePicker'
import { IEditAssistantListPayload } from 'apis/workload'

import style from './Drawer.module.scss'

interface IProps {
  form: FormInstance
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
  onSubmit?: (formValue: IEditAssistantListPayload) => void
}

export const Drawer: React.FC<IProps> = ({
  form,
  isOpen,
  onClose,
  isLoading = false,
  onSubmit = () => {},
}) => {
  const parseFormValue = () => {
    const formValue = form.getFieldsValue()
    return {
      assistantList: formValue.assistantList.map((a: any) => ({
        ...a,
        dayList: a.dayList.map((d: any) => d.toISOString()),
      })),
      workloadIdList: formValue.workloadIdList,
    } as IParsedFormValue
  }

  return (
    <AntdDrawer
      width={560}
      visible={isOpen}
      maskClosable={!isLoading}
      closable={false}
      onClose={() => onClose()}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading,
          })}
        >
          <FiX className={style.closeIcon} onClick={() => onClose()} />
          <Text size="sub-head" bold className={style.title}>
            แก้ไขรายชื่อ/เวลาปฏิบัติงาน
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
          requiredMark={false}
          onFinish={() => onSubmit(parseFormValue())}
        >
          <Form.List name="assistantList">
            {(fields, assistantListAction) => (
              <Col span={24}>
                {fields.map(({ name, ...rest }) => (
                  <div className={style.assistantItem}>
                    <Row align="middle">
                      <Text bold>รายชื่อที่ {name + 1}</Text>
                      <Tooltip title="ลบรายชื่อนี้">
                        <FiX
                          className={style.trashIconTitle}
                          onClick={() => assistantListAction.remove(name)}
                        />
                      </Tooltip>
                    </Row>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="รหัสนักศึกษา"
                          name={[name, 'assistantId']}
                          rules={[
                            { required: true, message: '' },
                            { pattern: /\d{8}/, message: 'กรอกตัวเลข 8 ตัว' },
                          ]}
                          {...rest}
                        >
                          <Input maxLength={8} />
                        </Form.Item>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          label="ชื่อ-สกุล"
                          name={[name, 'assistantName']}
                          rules={[{ required: true, message: '' }]}
                          {...rest}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Text size="small" className={style.header}>
                          วันที่ปฏิบัติงาน
                        </Text>
                        <Form.List name={[name, 'dayList']} initialValue={['']}>
                          {(fields2, dayListAction) => (
                            <>
                              {fields2.map(({ name, ...rest }) => (
                                <Row>
                                  <Col flex={1}>
                                    <Form.Item
                                      name={[name]}
                                      rules={[{ required: true }]}
                                      className={style.formHideMessage}
                                      {...rest}
                                    >
                                      <DatePicker
                                        className={style.datePicker}
                                        showToday={false}
                                        format="DD MMM YY"
                                        allowClear={false}
                                      />
                                    </Form.Item>
                                  </Col>

                                  {fields2.length > 1 && (
                                    <FiX
                                      className={style.trashIcon}
                                      onClick={() => dayListAction.remove(name)}
                                    />
                                  )}
                                </Row>
                              ))}
                              <AntdButton
                                type="dashed"
                                block
                                onClick={() => dayListAction.add()}
                              >
                                + คลิกเพื่อเพิ่มวัน
                              </AntdButton>
                            </>
                          )}
                        </Form.List>
                      </Col>
                    </Row>
                    <br />
                  </div>
                ))}
                <AntdButton
                  type="dashed"
                  block
                  icon={<FiPlus className={style.plusIcon} />}
                  style={{ height: 60, fontSize: 16, marginTop: '1rem' }}
                  onClick={() => assistantListAction.add()}
                >
                  คลิกเพื่อเพิ่ม TA
                </AntdButton>
              </Col>
            )}
          </Form.List>

          <Form.List name="workloadIdList">{() => null}</Form.List>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
