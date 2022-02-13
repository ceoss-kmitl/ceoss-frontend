import css from 'classnames'
import dayjs from 'dayjs'
import {
  Drawer as AntdDrawer,
  Button as AntdButton,
  Form,
  FormInstance,
  Row,
  Col,
  Divider,
} from 'antd'
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'

import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { DatePicker } from 'components/DatePicker'
import { Loader } from 'components/Loader'
import { Calendar } from 'components/DatePicker'
import { IEditAssistantListPayload } from 'apis/workload'

import style from './Drawer.module.scss'
import { useCalendarForm } from './DrawerHelper'

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
  const {
    dayList,
    currentDayList,
    isDaySelected,
    handleOnSelected,
    month,
    setMonth,
    resetCalendar,
  } = useCalendarForm(isOpen, form)

  const parseFormValue = () => {
    const formValue = form.getFieldsValue()
    const parsedFormValue: IEditAssistantListPayload = {
      ...formValue,
      dayList: dayList.map((d) => d.toISOString()),
    }
    return parsedFormValue
  }

  return (
    <AntdDrawer
      width={560}
      visible={isOpen}
      maskClosable={!isLoading}
      closable={false}
      onClose={() => {
        onClose()
        resetCalendar()
      }}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading,
          })}
        >
          <FiX
            className={style.closeIcon}
            onClick={() => {
              onClose()
              resetCalendar()
            }}
          />
          <Text size="sub-head" bold className={style.title}>
            แก้ไขรายชื่อ/วันปฏิบัติงาน
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
          scrollToFirstError
        >
          <Text bold className={style.header}>
            วันปฏิบัติงาน
          </Text>
          <DatePicker
            picker="month"
            format="MMMM BBBB"
            value={month}
            onSelect={(value) => setMonth(value)}
            className={style.datePicker}
            dropdownClassName={style.datePickerWrapper}
            allowClear={false}
          />
          <Calendar
            className={style.calendar}
            fullscreen={false}
            dateCellRender={(day) =>
              isDaySelected(day) && <div className={style.daySelected} />
            }
            onSelect={handleOnSelected}
            value={dayjs(month).startOf('month')}
            validRange={[
              dayjs(month).startOf('month'),
              dayjs(month).endOf('month'),
            ]}
          />

          <Divider
            plain
          >{`( ปฏิบัติงาน ${currentDayList.length} วัน )`}</Divider>

          <Text bold className={style.header}>
            รายชื่อ TA
          </Text>
          <Form.List name="assistantList">
            {(fields, assistantListAction) => (
              <Col span={24}>
                {fields.length > 0 && (
                  <Row gutter={16} align="middle">
                    <Col span={8}>
                      <Text size="small">รหัสนักศึกษา</Text>
                    </Col>
                    <Col span={16}>
                      <Text size="small">ชื่อ-สกุล</Text>
                    </Col>
                  </Row>
                )}
                {fields.map(({ name, ...rest }) => (
                  <div className={style.assistantItem}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          name={[name, 'assistantId']}
                          rules={[
                            { required: true, message: '' },
                            { pattern: /\d{8}/, message: 'กรอกตัวเลข 8 ตัว' },
                          ]}
                          {...rest}
                        >
                          <Input maxLength={8} placeholder="รหัสนักศึกษา" />
                        </Form.Item>
                      </Col>
                      <Col span={15}>
                        <Form.Item
                          name={[name, 'assistantName']}
                          rules={[{ required: true, message: '' }]}
                          {...rest}
                        >
                          <Input placeholder="ชื่อ-สกุล" />
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <FiTrash2
                          className={style.trashIcon}
                          onClick={() => assistantListAction.remove(name)}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
                <AntdButton
                  type="dashed"
                  block
                  icon={<FiPlus className={style.plusIcon} />}
                  style={{ height: 40, fontSize: 16 }}
                  onClick={() => assistantListAction.add()}
                >
                  คลิกเพื่อเพิ่ม TA
                </AntdButton>
              </Col>
            )}
          </Form.List>

          <Form.List name="workloadIdList">{() => null}</Form.List>
          <Form.List name="dayList">{() => null}</Form.List>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
